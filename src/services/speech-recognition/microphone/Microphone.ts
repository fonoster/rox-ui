import bufferFrom from 'buffer-from'
import { Readable } from 'readable-stream'

import {
  speechPauseEvent,
  speechResumeEvent,
  speechStartEvent,
  speechStopEvent,
} from '../../event-bus'
import { BrowserMedia } from './BrowserMedia'
import { ErrorAlreadyStarted, ErrorNotStarted } from './MicrophoneErrors'
import { MediaStreamConstraints, SpeechPermission } from './types'

/**
 * Microphone
 *
 * @description It is an abstraction and a polyfill of the microphone, at the same time
 * configuring an audio _processor to convert from MediaStream to ReadableStream
 * and adding friendly methods to interact with the audio processor.
 *
 * @author Fonoster
 */
export class Microphone {
  private static _instance: Microphone

  private readonly meta = {
    /**
     * Stream constraints
     *
     * @description is used when calling getUserMedia() to specify what kinds of tracks
     * should be included in the returned MediaStream.
     */
    constraints: {
      audio: true,
      video: false,
    } as MediaStreamConstraints,

    /**
     * Object Mode
     *
     * @description Puts the stream into ObjectMode where it emits AudioBuffers instead of Buffers.
     */
    objectMode: false,

    /**
     * Input Channels - Device Microphones
     *
     * @description Specifies the number of audio inputs to be used from the current device.
     */
    inputChannels: 1,

    /**
     * Output Channels
     *
     * @description We shouldn't need any output channels (going back to the browser),
     * but chrome is buggy and won't give us any audio without one.
     */
    outputChannels: 1,
  }

  private isStreaming: boolean
  private isStarted: boolean

  private _stream?: MediaStream
  private _readableStream?: Readable
  private _context: AudioContext
  private _processor?: ScriptProcessorNode
  private _audioInput: MediaStreamAudioSourceNode
  private _browserMedia: BrowserMedia

  /**
   * Speech Permission
   *
   * @description The Permissions provides a consistent programmatic way to
   * get the status of Speech permissions on the current context.
   */
  private _speechPermission: SpeechPermission

  constructor() {
    this._readableStream = this.getReadable()

    this._browserMedia = new BrowserMedia(this.meta.constraints)
  }

  /**
   * Start receiving audio
   *
   * @description It prepares the microphone _context to receive audio fragments,
   * its implementation will try to obtain the consent of the user to use
   * the microphone and initialize the audio _processor.
   */
  public async start(): Promise<void> {
    if (this.isStarted) throw new ErrorAlreadyStarted()

    try {
      this.isStarted = true

      this._context = this._browserMedia.getAudioContext()

      this._readableStream = this.getReadable()

      this.setProcessor()

      this.setPermission(SpeechPermission.PROMPT)

      const stream = await this._browserMedia.getStream()
      this.setStream(stream)

      this.emitFormat()

      this.setPermission(SpeechPermission.GRANTED)

      speechStartEvent.dispatch({
        speechPermission: this._speechPermission,
        audioContext: this._context,
      })
    } catch (err) {
      this.setPermission(SpeechPermission.DENIED)
    }
  }

  /**
   * Listen available audio
   *
   * @description Emits either a Buffer with raw 32-bit Floating point audio data,
   * or if objectMode is set, an AudioBuffer containing the data and metadata.
   */
  public listen(cb: (audio: Buffer) => void): void {
    this.useStarted(() => this._readableStream?.on('data', cb))
  }

  /**
   * Stop receiving audio
   *
   * @description It destroys the current audio session so you should keep in mind
   * that it should not be used to pause the microphone or something.
   *
   * Use it only when you are sure you want to stop receiving audio.
   */
  public async stop(): Promise<void> {
    this.useStarted(async () => {
      try {
        if (this._context?.state === 'closed') return

        this.pause(false)

        this._processor?.disconnect()

        this._audioInput?.disconnect()

        this._stream?.getTracks().forEach(t => t.stop())

        await this._context?.close()

        this._readableStream?.push(null)
        this._readableStream?.emit('close')

        this.unset()

        speechStopEvent.dispatch({
          audioContext: this._context,
        })
      } catch (err) {
        console.error(err)
      }
    })
  }

  /**
   * Pause streaming audio
   *
   * @description Stop emitting audio temporarily. Audio data received from the
   * microphone after this will not be sent to the listening method.
   *
   * @param {boolean} dispatchEvent Dispatch event when listening audio is paused.
   */
  public pause(dispatchEvent = true): void {
    this.isStreaming = false

    if (dispatchEvent)
      speechPauseEvent.dispatch({
        isStreaming: this.isStreaming,
      })
  }

  /**
   * Resume streaming audio
   *
   * @description Resume emitting audio after pause() was called.
   *
   * @param {boolean} dispatchEvent Dispatch event when listening audio is resume.
   */
  public resume(dispatchEvent = true): void {
    this.isStreaming = true

    if (dispatchEvent)
      speechResumeEvent.dispatch({
        isStreaming: this.isStreaming,
      })
  }

  /**
   * Unset Infrastructure
   *
   * @description Unset the infrastructure of the current audio session.
   */
  private unset(): void {
    this.isStarted = false
    this._stream = undefined
    this._processor = undefined
    this._readableStream = undefined
  }

  /**
   * Readable instance
   *
   * @description Get a new instance of Readable, this because the "stop()" method
   * will destroy everything related to the current audio session and will need a
   * new instance when "start()" is launched again.
   */
  private getReadable() {
    return new Readable({ objectMode: this.meta.objectMode, read() {} })
  }

  /**
   * Speech Permission
   *
   * @description Change permission state of the current _context.
   */
  private setPermission(state: SpeechPermission): void {
    this._speechPermission = state
  }

  /**
   * Audio Processor
   *
   * @description It allows the generation, processing, and analysis of audio.
   *
   * @todo ScriptProcessorNode was replaced by AudioWorklet, I have to do
   * the _processor implementation with AudioWorklet.
   */
  private setProcessor(): void {
    this.useStarted(() => {
      this._processor = this._context.createScriptProcessor(
        Microphone.bufferSize,
        this.meta.inputChannels,
        this.meta.outputChannels
      )

      this._processor.connect(this._context.destination)

      this._processor.onaudioprocess = e => {
        if (!this.isStreaming) return

        const buffer: Buffer | AudioBuffer = this.meta.objectMode
          ? e.inputBuffer
          : bufferFrom(e.inputBuffer.getChannelData(0).buffer)

        this._readableStream?.push(buffer)
      }
    })
  }

  /**
   * Stream
   *
   * @description This method is called by "start()" when it gets the user's consent to
   * use the microphone, sets the tracks, and starts streaming audio.
   */
  private setStream(stream: MediaStream): void {
    if (!this._processor) return

    this._stream = stream
    this._audioInput = this._context.createMediaStreamSource(stream)
    this._audioInput.connect(this._processor)

    this.resume(false)
  }

  /**
   * The instance started
   *
   * @description A kind of middleware for actions that should be executed
   * only when the instance has been started.
   */
  private useStarted(next: Function): void {
    if (!this.isStarted) throw new ErrorNotStarted()

    next()
  }

  /**
   * Audio format
   *
   * @description One-time event with details of the audio format.
   */
  private emitFormat(): void {
    setTimeout(() => {
      this._readableStream?.emit('format', {
        channels: 1,
        bitDepth: 32,
        sampleRate: this._context.sampleRate,
        signed: true,
        float: true,
      })
    }, 0)
  }

  /**
   * Buffer size
   *
   * @description If the browser is webkit, it requires that you set the buffer size.
   */
  private static get bufferSize() {
    return window.webkitAudioContext ? 4096 : undefined
  }

  /**
   * Singleton instance
   *
   * @description Get a single instance of the microphone to avoid audio _processor conflicts.
   */
  public static get instance(): Microphone {
    return this._instance ?? (this._instance = new Microphone())
  }

  /**
   * Getters
   *
   * @description Expose the current infrastructure
   */

  get context() {
    return this._context
  }

  get speechPermission() {
    return this._speechPermission
  }

  get readableStream() {
    return this._readableStream
  }

  get audioInput() {
    return this._audioInput
  }

  get browserMedia() {
    return this._browserMedia
  }
}

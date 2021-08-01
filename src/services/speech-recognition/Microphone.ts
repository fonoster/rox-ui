import bufferFrom from 'buffer-from'
import { Readable } from 'readable-stream'

import { BrowserMedia } from './BrowserMedia'
import { ErrorAlreadyStarted, ErrorNotStarted } from './MicrophoneErrors'
import { MediaStreamConstraints, SpeechPermission } from './types'

/**
 * Microphone
 *
 * @description It is an abstraction and a polyfill of the microphone, at the same time
 * configuring an audio processor to convert from MediaStream to ReadableStream
 * and adding friendly methods to interact with the audio processor.
 *
 * @author Fonoster
 */
export class Microphone extends Readable {
  private static _instance: Microphone

  private static readonly meta = {
    objectMode: false,
    inputChannels: 1,
    outputChannels: 1,
  }

  private isStreaming: boolean
  private recorder?: ScriptProcessorNode
  private audioInput: MediaStreamAudioSourceNode
  private browserMedia: BrowserMedia
  private stream?: MediaStream

  public context: AudioContext
  public isStarted: boolean

  /**
   * Speech Permission
   *
   * @description The Permissions provides a consistent programmatic way to
   * get the status of Speech permissions on the current context.
   */
  public speechPermission: SpeechPermission

  constructor() {
    super({ objectMode: Microphone.meta.objectMode })

    this.browserMedia = new BrowserMedia(this.constraints)
  }

  /**
   * Start receiving audio
   *
   * @description It prepares the microphone context to receive audio fragments,
   * its implementation will try to obtain the consent of the user to use
   * the microphone and initialize the audio processor.
   */
  public async start(): Promise<void> {
    if (this.isStarted) throw new ErrorAlreadyStarted()

    try {
      this.isStarted = true

      this.context = this.getAudioContext()

      this.setRecorder()

      this.setPermission(SpeechPermission.PROMPT)

      const stream = await this.browserMedia.getStream()
      this.setStream(stream)

      this.emitFormat()

      this.setPermission(SpeechPermission.GRANTED)
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
    this.useStarted(() => this.on('data', cb))
  }

  /**
   * Stop receiving audio
   *
   * @description It destroys the current audio session so you should keep in mind
   * that it should not be used to mute the microphone or something.
   *
   * Use it only when you are sure you want to stop receiving audio.
   */
  public async stop(): Promise<void> {
    this.useStarted(async () => {
      try {
        if (this.context?.state === 'closed') return

        this.mute()

        this.recorder?.disconnect()

        this.audioInput?.disconnect()

        this.stream?.getTracks().forEach(t => t.stop())

        await this.context?.close()

        this.isStarted = false
        this.stream = undefined
        this.recorder = undefined

        this.emit('close')
      } catch (err) {
        console.error(err)
      }
    })
  }

  /**
   * Mute streaming audio
   *
   * @description Stop emitting audio temporarily. Audio data received from the
   * microphone after this will not be sent to the listening method.
   */
  public mute(): void {
    this.isStreaming = false
  }

  /**
   * Resume streaming audio
   *
   * @description Resume emitting audio after mute() was called.
   */
  public unmute(): void {
    this.isStreaming = true
  }

  /**
   * Speech Permission
   *
   * @description Change permission state of the current context.
   */
  private setPermission(state: SpeechPermission): void {
    this.speechPermission = state
  }

  /**
   * Audio Processor
   *
   * @description It allows the generation, processing, and analysis of audio.
   *
   * @todo ScriptProcessorNode was replaced by AudioWorklet, I have to do
   * the recorder implementation with AudioWorklet.
   */
  private setRecorder(): void {
    this.useStarted(() => {
      this.recorder = this.context.createScriptProcessor(
        Microphone.bufferSize,
        Microphone.meta.inputChannels,
        Microphone.meta.outputChannels
      )

      this.recorder.connect(this.context.destination)

      this.recorder.onaudioprocess = e => {
        if (!this.isStreaming) return

        const buffer: Buffer | AudioBuffer = Microphone.meta.objectMode
          ? e.inputBuffer
          : bufferFrom(e.inputBuffer.getChannelData(0).buffer)

        this.push(buffer)
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
    if (!this.recorder) return

    this.stream = stream
    this.audioInput = this.context.createMediaStreamSource(stream)
    this.audioInput.connect(this.recorder)

    this.unmute()
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
      this.emit('format', {
        channels: 1,
        bitDepth: 32,
        sampleRate: this.context.sampleRate,
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
   * Stream constraints
   *
   * @description is used when calling getUserMedia() to specify what kinds of tracks
   * should be included in the returned MediaStream.
   */
  private get constraints(): MediaStreamConstraints {
    return Object.freeze({
      audio: true,
      video: false,
    })
  }

  /**
   * Audio Context
   *
   * @description An audio-processing graph built from audio modules linked together,
   * each represented by an AudioNode.
   */
  private getAudioContext(): AudioContext {
    return new (window.AudioContext || window.webkitAudioContext)()
  }

  /**
   * _read Inherit
   *
   * @throws This method is inherited but not implemented as
   * flow control doesn't work on streaming audio.
   */
  public _read(): void {}

  /**
   * Singleton instance
   *
   * @description Get a single instance of the microphone to avoid audio processor conflicts.
   */
  public static get instance(): Microphone {
    return this._instance ?? (this._instance = new Microphone())
  }
}

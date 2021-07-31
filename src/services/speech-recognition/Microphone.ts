import bufferFrom from 'buffer-from'
import { Readable } from 'readable-stream'

import { BrowserMedia } from './BrowserMedia'
import {
  ErrorAlreadyInitialized,
  ErrorMicroNotInitialized,
} from './MicrophoneErrors'
import type { MediaStreamConstraints } from './types'

/**
 * Microphone
 *
 * @description Turns a MediaStream object (from getUserMedia) into a NodeJS
 * Readable stream and optionally converts the audio to Buffers.
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

  private isRecording: boolean = true
  private recorder: ScriptProcessorNode
  private audioInput: MediaStreamAudioSourceNode
  private browserMedia: BrowserMedia

  public context: AudioContext
  public isInitialized: boolean
  public hasPermissions: boolean | null = null

  /**
   * Stream
   *
   * @description Represents a stream of media content. A stream consists
   * of several tracks such as audio tracks.
   */
  private stream: MediaStream

  constructor() {
    super({ objectMode: Microphone.meta.objectMode })

    this.browserMedia = new BrowserMedia(this.constraints)
  }

  /**
   * Initializes the microphone.
   *
   * @description This should prepare the microphone infrastructure for receiving audio chunks.
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) throw new ErrorAlreadyInitialized()

    try {
      this.isInitialized = true

      this.context = this.getAudioContext()

      this.recorder = this.context.createScriptProcessor(
        Microphone.bufferSize,
        Microphone.meta.inputChannels,
        Microphone.meta.outputChannels
      )

      this.recorder.connect(this.context.destination)

      const stream = await this.browserMedia.getStream()
      this.setStream(stream)

      this.hasPermissions = Boolean(stream)

      this.emitFormat()
    } catch (err) {
      this.hasPermissions = false
      console.error(err)
    }
  }

  /**
   * Subscribe to data event
   *
   * @description Emits either a Buffer with raw 32-bit Floating point audio data,
   * or if objectMode is set, an AudioBuffer containing the data and metadata.
   */
  public subscribe(cb: (chunk: Buffer) => void) {
    this.useInitialized(() => this.on('data', cb))
  }

  /**
   * Stops the recording
   */
  public async stop() {
    this.useInitialized(async () => {
      try {
        if (this.context.state === 'closed') return

        this.mute()

        this.isInitialized = false

        this.recorder?.disconnect()

        this.audioInput?.disconnect()

        this.stream.getTracks().forEach(t => t.stop())

        await this.context?.close()

        this.push(null)
        this.emit('close')
      } catch (err) {
        console.error(err)
      }
    })
  }

  /**
   * Mute Recording
   *
   * @description Temporarily stop emitting new data. Audio data received
   * from the microphone after this will be dropped.
   */
  public mute(): void {
    this.isRecording = false
  }

  /**
   * Unmute Recording
   *
   * @description Resume emitting new audio data after mute() was called.
   */
  public unmute(): void {
    this.isRecording = true
  }

  private setStream(stream: MediaStream): void {
    this.stream = stream
    this.audioInput = this.context.createMediaStreamSource(stream)
    this.audioInput.connect(this.recorder)

    this.recorder.onaudioprocess = e => {
      if (this.isRecording) {
        this.push(
          Microphone.meta.objectMode
            ? e.inputBuffer
            : bufferFrom(e.inputBuffer.getChannelData(0).buffer)
        )
      }
    }
  }

  private useInitialized(next: Function) {
    if (!this.isInitialized) throw new ErrorMicroNotInitialized()

    next()
  }

  private emitFormat() {
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

  private static get bufferSize() {
    return typeof window.AudioContext === 'undefined' ? 4096 : undefined
  }

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
  private getAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)()
  }

  public static get instance(): Microphone {
    return this._instance ?? (this._instance = new Microphone())
  }

  /**
   * This method is not implemented.
   *
   * @throws (flow-control doesn't really work on live audio).
   */
  public _read(): void {}
}

import { speechIntentsEvent } from '../event-bus/events'
import { speechAPI } from '../fonos'
import { Microphone } from './microphone'
import type { OnIntentsCallback, OnWaitingCallback } from './types'

class SpeechRecognition {
  private static _instance: SpeechRecognition
  private readonly microphone: Microphone

  constructor() {
    this.microphone = Microphone.instance
  }

  /**
   * Start Recognition
   *
   * @description Starts the speech recognition service listening to incoming audio
   * with intent to recognize grammars associated with the current SpeechRecognition.
   */
  public async start(): Promise<void> {
    const isConnected = await speechAPI.connect('1234')

    if (!isConnected) throw new Error('...')

    this.microphone.start()

    this.microphone.listen(speechAPI.recognizer)
  }

  /**
   * Adds a listener for intent responses from the API.
   */
  public onIntents(cb: OnIntentsCallback): void {
    speechAPI.onIntents((intents, error) => {
      /**
       * @todo Consult with Pedro Sanders if exposing the results of the API
       * in an event generates business conflicts for Fonoster.
       */
      speechIntentsEvent.dispatch({
        intents,
        error,
      })

      cb(intents, error)
    })
  }

  /**
   * Adds a listener for waiting event from the API.
   */
  public onWaiting(cb: OnWaitingCallback): void {
    speechAPI.onWaiting(cb)
  }

  /**
   * Stop recognition
   *
   * @description Stops the speech recognition service from listening to incoming audio.
   */
  public async stop(): Promise<void> {
    await this.microphone.stop()

    await speechAPI.closeConnection()
  }

  /**
   * Pause recognition
   *
   * @description Pause audio received temporarily from the microphone.
   */
  public pause(): void {
    this.microphone.pause()
  }

  /**
   * Resume
   *
   * @description Resume recognition audio after mute() was called.
   */
  public resume(): void {
    this.microphone.resume()
  }

  public static get instance(): SpeechRecognition {
    return this._instance ?? (this._instance = new SpeechRecognition())
  }
}

export const speechRecognition = SpeechRecognition.instance

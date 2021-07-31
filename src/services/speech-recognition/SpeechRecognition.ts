import { SpeechRecognitionAPI } from '../../api'
import { Microphone } from './Microphone'
import { Intent } from './types'

/**
 * @todo Use the eventBus to fire DOM events.
 *
 * @todo Move setVisibility to a context and stop streaming audio when the widget is closed.
 */
class SpeechRecognition {
  private static _instance: SpeechRecognition
  private readonly microphone: Microphone

  constructor() {
    this.microphone = Microphone.instance
  }

  /**
   * Initialize Speech recognition
   *
   * @description Initializes the client, by initializing the microphone
   * and establishing connection to the API.
   */
  public async start(): Promise<void> {
    const isConnected = SpeechRecognitionAPI.connect('1234')

    if (!isConnected) throw new Error('...')

    this.microphone.initialize()

    this.microphone.subscribe(SpeechRecognitionAPI.streamingRecognize)
  }

  /**
   * Adds a listener for intent responses from the API.
   */
  public onIntent(cb: (intent: Intent) => void): void {
    SpeechRecognitionAPI.onIntent(cb)
  }

  /**
   * Adds a listener for waiting event from the API.
   */
  public onWaiting(cb: (isWaiting: boolean) => void): void {
    SpeechRecognitionAPI.onWaiting(cb)
  }

  /**
   * Stop the client by closing the API connection and disabling the microphone.
   */
  public async stop(): Promise<void> {
    await this.microphone.stop()

    await SpeechRecognitionAPI.closeConnection()
  }

  public static get instance(): SpeechRecognition {
    return this._instance ?? (this._instance = new SpeechRecognition())
  }
}

export const speechRecognition = SpeechRecognition.instance

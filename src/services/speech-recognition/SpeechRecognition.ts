import { speechAPI } from '../fonos'
import { Microphone } from './Microphone'
import { Intent } from './types'

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
    const isConnected = await speechAPI.connect('1234')

    if (!isConnected) throw new Error('...')

    this.microphone.start()

    this.microphone.listen(speechAPI.recognizer)
  }

  /**
   * Adds a listener for intent responses from the API.
   */
  public onIntent(cb: (intent: Intent) => void): void {
    speechAPI.onIntent(cb)
  }

  /**
   * Adds a listener for waiting event from the API.
   */
  public onWaiting(cb: (isWaiting: boolean) => void): void {
    speechAPI.onWaiting(cb)
  }

  /**
   * Stop the client by closing the API connection and disabling the microphone.
   */
  public async stop(): Promise<void> {
    await this.microphone.stop()

    await speechAPI.closeConnection()
  }

  public static get instance(): SpeechRecognition {
    return this._instance ?? (this._instance = new SpeechRecognition())
  }
}

export const speechRecognition = SpeechRecognition.instance

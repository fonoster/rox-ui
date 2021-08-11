import type {
  Intent,
  OnIntentsCallback,
  OnWaitingCallback,
  SpeechError,
} from '../speech-recognition'

class SpeechAPI {
  private static _instance: SpeechAPI

  public async connect(accessKey: string) {
    // ...

    const isConnected = true

    return {
      isConnected,
      accessKey,
    }
  }

  public async closeConnection() {
    // ...

    const isConnected = false

    return isConnected
  }

  public onIntents(cb: OnIntentsCallback): void {
    const intents: Intent[] = [
      {
        id: 'rox.intent.add',
        icon: 'https://fonoster.com/statics/icon.png',
        title: 'Test',
        description: 'Description...',
        transcript: 'Text...',
      },
    ]

    const error: SpeechError | undefined = {
      statusCode: 404,
      message: 'Oops!, I haven’t found anything',
    }

    // ...

    cb(intents, error)
  }

  public onWaiting(cb: OnWaitingCallback): void {
    // ...

    const isWait = true

    cb(isWait)
  }

  public recognizer(audio: Buffer): void {
    // ...

    console.log(audio)
  }

  public static get instance(): SpeechAPI {
    return this._instance ?? (this._instance = new SpeechAPI())
  }
}

export const speechAPI = SpeechAPI.instance

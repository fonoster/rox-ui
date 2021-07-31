import { Intent } from '../speech-recognition'

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

  public onIntent(cb: (intent: Intent) => void): void {
    const intent: Intent = {
      id: 'pf.intent.add',
      icon: 'https://fonoster.com/statics/icon.png',
      title: 'Test',
      description: 'Description...',
      transcript: 'Text...',
    }

    // ...

    cb(intent)
  }

  public onWaiting(cb: (isWaiting: boolean) => void): void {
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

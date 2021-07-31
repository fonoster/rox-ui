import { Intent } from '../providers/speech'

export class SpeechRecognitionAPI {
  public static connect(accessKey: string) {
    // ...

    const isConnected = true

    return {
      isConnected,
      accessKey,
    }
  }

  public static closeConnection() {
    // ...

    const isConnected = false

    return isConnected
  }

  static onIntent(cb: (intent: Intent) => void): void {
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

  static onWaiting(cb: (isWaiting: boolean) => void): void {
    // ...

    const isWait = true

    cb(isWait)
  }

  static streamingRecognize(stream: Buffer): void {
    // ...

    console.log(stream)
  }
}

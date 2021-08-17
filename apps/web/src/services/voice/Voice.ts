import { RoxanneAgent } from '@rox/agent'

import type { OnIntentsCallback, OnWaitingCallback } from './types'

export class Voice {
  private agent: RoxanneAgent

  constructor(instrumentationKey: string, audioElementId: string) {
    this.agent = new RoxanneAgent({
      instrumentationKey,
      audioElementId,
    })
  }

  /**
   * Start Recognition
   *
   * @description Starts the speech recognition service listening to incoming audio
   * with intent to recognize grammars associated with the current SpeechRecognition.
   */
  public async start(): Promise<void> {
    try {
      await this.agent.connect()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Adds a listener for intent responses from the API.
   */
  public onIntents(cb: OnIntentsCallback): void {
    this.agent.onMessage(data => {
      //   speechIntentsEvent.dispatch({
      //     intents,
      //     error,
      //   })

      cb(data)
    })
  }

  /**
   * Adds a listener for waiting event from the API.
   */
  public onWaiting(cb: OnWaitingCallback): void {
    console.log(cb)
    // speechAPI.onWaiting(cb)
  }

  /**
   * Stop recognition
   *
   * @description Stops the speech recognition service from listening to incoming audio.
   */
  public async stop(): Promise<void> {
    await this.agent.disconnect()
    // await speechAPI.closeConnection()
  }
}

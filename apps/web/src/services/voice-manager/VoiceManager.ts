import { RoxanneAgent } from '@rox/agent'

import { getAccessKey } from '../../helpers'
import type { OnIntentsCallback, OnWaitingCallback } from './types'

export class VoiceManager {
  private agent: RoxanneAgent

  constructor(audioElementId: string) {
    this.agent = new RoxanneAgent({
      instrumentationKey: getAccessKey(),
      audioElementId,
    })
  }

  /**
   * Start Recognition
   *
   * @description Starts the voice recognition service listening to incoming audio
   * with intent to recognize grammars associated with the current VoiceRecognition.
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
      //   voiceIntentsEvent.dispatch({
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
    // voiceAPI.onWaiting(cb)
  }

  /**
   * Stop recognition
   *
   * @description Stops the voice recognition service from listening to incoming audio.
   */
  public async stop(): Promise<void> {
    await this.agent.disconnect()
    // await voiceAPI.closeConnection()
  }
}

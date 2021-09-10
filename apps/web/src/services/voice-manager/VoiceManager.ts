import WPhone from 'wphone'

import { getAccessKey } from '../../helpers'
import { createWPhoneConfig } from '../../helpers/phoneConfig'
import { getInstrumentation } from '../../instrumentation/client'
import EventsClient from './EventsClient'
import type { OnWaitingCallback } from './types'

export class VoiceManager {
  private agent: WPhone
  audioElementId: string
  eventsClient: EventsClient

  constructor(audioElementId: string) {
    this.audioElementId = audioElementId
  }

  /**
   * Start Recognition
   *
   * @description Starts the voice recognition service listening to incoming audio
   * with intent to recognize grammars associated with the current VoiceRecognition.
   */
  public async start(): Promise<void> {
    try {
      const instrumentation = await getInstrumentation(getAccessKey())
      console.log('instrumentation = ' + JSON.stringify(instrumentation))
      console.log('audioElementId = ' + this.audioElementId)

      const config = createWPhoneConfig(instrumentation, this.audioElementId)
      this.agent = new WPhone(config)

      this.agent.on('error', e => {
        console.log('yyyyyyy -> ' + e)
      })

      this.eventsClient = new EventsClient(
        instrumentation.eventsServer,
        instrumentation.clientUsername
      )
      await this.eventsClient.connect()
      await this.agent.connect()

      console.log('XXXXXXX isConnect=' + this.agent.isConnected())

      await this.agent.call({
        targetAOR: instrumentation.targetAOR,
        extraHeaders: [`X-DID-Info: ${instrumentation.didInfo}`],
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Adds a listener for intent responses from the API.
   */
  public onIntents(cb: Function): void {
    if (this.eventsClient) {
      this.eventsClient.onEvent((data: any) => {
        //   voiceIntentsEvent.dispatch({
        //     intents,
        //     error,
        //   })

        cb(data)
      })
    }
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
    /*try {
      if (this.agent.isConnected()) {
        this.agent.disconnect()
      }
      this.eventsClient.disconnect()
    } catch (e) {
      console.log(e)
    }*/
  }
}

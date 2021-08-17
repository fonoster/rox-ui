import {
  getInstrumentationData,
  InstrumentationData,
} from '@rox/instrumentation'
import EventEmitter from 'events'
import Socket from 'simple-websocket'
import { UserAgent, UserAgentDelegate } from 'sip.js'

import { Config } from './types.js'
import { createInviter, getAudio, getUserAgentOptions } from './utils'

export class RoxanneAgent {
  private userAgent: UserAgent
  private instrumentation: InstrumentationData
  private audioElement: HTMLAudioElement
  private wsClient: Socket
  private eventEmitter: EventEmitter

  constructor(config: Config) {
    // Obtain everything Rox needs to connect to the backend
    this.instrumentation = getInstrumentationData(config.instrumentationKey)
    // It should throw a friendly error if the audio element does not exist
    this.audioElement = getAudio(config.audioElementId)

    // WARNING: This seem useless
    const delegate: UserAgentDelegate = {
      onConnect: (): void => {
        console.log('Call created')
      },
      onDisconnect: (): void => {
        console.log('Call hangup')
      },
    }

    // Sets up the user agent options
    const userAgentOptions = getUserAgentOptions(this.instrumentation, delegate)

    // Creates SIP client that will connect to VoIP backend
    this.userAgent = new UserAgent(userAgentOptions)

    // We need to use an middle object to stream events from the backend
    this.eventEmitter = new EventEmitter()
  }

  async connect() {
    try {
      const { didInfo, targetAOR } = this.instrumentation

      // Sending invite to VoIP backend
      await this.userAgent.start()

      const inviter = createInviter({
        userAgent: this.userAgent,
        audioElement: this.audioElement,
        didInfo,
        targetAOR,
      })

      inviter.invite()

      // Events server connection
      this.wsClient = new Socket(this.instrumentation.eventsServer)
      this.wsClient.on('connect', () => {
        // Once we successfully connect we send the clientId
        // which will be use to track the session and send events
        this.wsClient.send(
          JSON.stringify({
            clientId: this.instrumentation.clientUsername,
          })
        )
      })

      this.wsClient.on('data', (data: string) => {
        this.eventEmitter.emit('event', data)
      })
    } catch (error) {
      console.error(error)

      throw error
    }
  }

  // TODO: We need to also destroy the websocket connection
  async disconnect() {
    await this.userAgent.stop()
  }

  onMessage(callback: Function) {
    this.eventEmitter.on('event', (data: string) => {
      callback(JSON.parse(data))
    })
  }

  isConnected(): boolean {
    return this.userAgent.isConnected()
  }
}

import Events from 'events'
import Socket from 'simple-websocket'

export default class EventsClient {
  ws: Socket
  server: string
  username: string
  events: Events
  constructor(server: string, username: string) {
    this.server = server
    this.username = username
    this.events = new Events()
  }

  async connect() {
    console.log('connecting to events server')
    const promise = Promise
    this.ws = new Socket(this.server)
    this.ws.on('connect', () => {
      // Once we successfully connect we send the clientId
      // which will be use to track the session and send events
      this.ws.send(
        JSON.stringify({
          clientId: this.username,
        })
      )
      promise.resolve()
    })
    this.ws.on('data', (data: string) => {
      this.events.emit('event', data)
    })

    this.ws.on('error', (data: string) => {
      promise.reject(data)
    })

    return promise
  }

  disconnect() {
    this.ws.destroy()
  }

  onEvent(callback: Function) {
    this.events.on('event', (data: string) => {
      callback(JSON.parse(data))
    })
  }
}

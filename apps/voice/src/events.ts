import logger from '@fonos/logger'
import WebSocket from 'ws'

export enum Events {
  ANSWERED = 'ANSWERED',
  HANGUP = 'HANGUP',
  INTENT = 'INTENT',
  RECOGNIZING = 'RECOGNIZING',
  RECOGNIZING_FINISHED = 'RECOGNIZING_FINISHED',
}

// Events server
export class EventsServer {
  clientConnections: Map<string, WebSocket>
  wss: WebSocket.Server
  port: number

  constructor(clientConnections: Map<string, WebSocket>, port = 3001) {
    this.port = port
    this.wss = new WebSocket.Server({ port })
    this.clientConnections = clientConnections
  }

  start() {
    this.wss.on('connection', ws => {
      logger.verbose('incoming client connection')
      ws.on('message', data => {
        // Once we receive the first and only message from client we
        // save the client in the clientConnections map
        const clientId = JSON.parse(data.toString()).clientId
        this.clientConnections.set(clientId, ws)
        logger.verbose(`added clientId: ${clientId} to the list of connections`)
      })

      ws.send(
        JSON.stringify({
          name: 'CONNECTED',
          payload: {},
        })
      )
    })

    logger.info(`started events server on port ${this.port}`)
  }

  getConnection(clientId: string): WebSocket | undefined {
    return this.clientConnections.get(clientId)
  }

  removeConnection(clientId: string): void {
    this.clientConnections.delete(clientId)
  }
}

export class EventEmitter {
  ws: WebSocket
  constructor(ws: WebSocket) {
    this.ws = ws
  }

  send(event: Events, payload = {}) {
    this.ws.send(
      JSON.stringify({
        eventName: event,
        payload,
      })
    )
  }
}

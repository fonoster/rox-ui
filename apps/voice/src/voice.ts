import GoogleTTS from '@fonos/googletts'
import logger from '@fonos/logger'
import { VoiceServer } from '@fonos/voice'

import { EventEmitter, Events, EventsServer } from './events'

const voiceServer = new VoiceServer({ base: '/voiceapp' })
const clientConnections = new Map()
const events = new EventsServer(clientConnections)

events.start()

// Setup the default TTS integration to Google Text to Speech
voiceServer.use(
  new GoogleTTS({
    keyFilename: './google_credentials.json',
  })
)

// Only needed for testing
function delay(ms = 4000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Inside this method with have all the media controlling logic
voiceServer.listen(async (req, res) => {
  console.log(res)
  logger.verbose(JSON.stringify(req, null, ' '))

  const ws = events.getConnection(req.callerNumber)

  if (!ws) throw new Error('Socket connection not found')

  const eventEmitter = new EventEmitter(ws)

  eventEmitter.send(Events.ANSWERED)

  // await res.say('Hi. I am using the google text to speech voice')

  // Adding delay to simulate real conversation
  await delay()
  eventEmitter.send(Events.RECOGNIZING)

  // Adding delay to simulate real conversation
  await delay()
  eventEmitter.send(Events.RECOGNIZING_FINISHED)

  // Adding delay to simulate for event to return
  await delay()
  eventEmitter.send(Events.INTENT, {
    type: 'INTENT_1',
    data: 'Anything you want',
  })

  // Adding delay to simulate for event to return
  await delay()
  eventEmitter.send(Events.INTENT, {
    type: 'INTENT_2',
    data: 'Anything you want',
  })

  // await res.say('Good bye!')

  // Final event must sent before hangup
  eventEmitter.send(Events.HANGUP)

  // Cleaning up must happing before hangup
  events.removeConnection(req.callerNumber)

  // await res.hangup()
})

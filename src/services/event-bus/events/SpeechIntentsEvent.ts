import { Intent, SpeechError } from '../../speech-recognition'
import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  intents: Intent[]
  error?: SpeechError
}

/**
 * Speech Intents Event
 *
 * @description Fired when the speech service returns a result,
 * a word or phrase has been positively recognized and this
 * has been communicated back to the app.
 *
 * @author Fonoster
 */
class SpeechIntentsEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.SPEECH_INTENTS)
  }
}

export const speechIntentsEvent = new SpeechIntentsEvent()

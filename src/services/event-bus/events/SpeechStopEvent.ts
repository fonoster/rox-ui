import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  audioContext: AudioContext
}

/**
 * Speech Stop Event
 *
 * @description Fired when the speech recognition service has disconnected.
 *
 * @author Fonoster
 */
class SpeechStopEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.SPEECH_STOP)
  }
}

export const speechStopEvent = new SpeechStopEvent()

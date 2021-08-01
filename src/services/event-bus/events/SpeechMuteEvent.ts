import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  isStreaming: boolean
}

/**
 * Speech Mute Event
 *
 * @description Fired when speech recognized by the speech recognition
 * service is temporarily has stopped being detected.
 *
 * @author Fonoster
 */
class SpeechMuteEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.SPEECH_MUTE)
  }
}

export const speechMuteEvent = new SpeechMuteEvent()

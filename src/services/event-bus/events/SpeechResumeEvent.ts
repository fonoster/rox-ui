import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  isStreaming: boolean
}

/**
 * Speech Resume Event
 *
 * @description Fired when speech recognized by the speech
 * recognition service is detected again.
 *
 * @author Fonoster
 */
class SpeechResumeEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.SPEECH_RESUME)
  }
}

export const speechResumeEvent = new SpeechResumeEvent()

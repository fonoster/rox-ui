import type { SpeechPermission } from '../../speech-recognition'
import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  speechPermission: SpeechPermission
  audioContext: AudioContext
}

/**
 * Speech Start Event
 *
 * @description Fired when the speech recognition service has begun
 * listening to incoming audio with intent to recognize grammars
 * associated with the current context.
 *
 * @author Fonoster
 */
class SpeechStartEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.SPEECH_START)
  }
}

export const speechStartEvent = new SpeechStartEvent()

import type {
  Intent,
  SpeechError,
  // SpeechPermission,
} from '../../voice'
import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

/**
 * Speech Start Event
 *
 * @description Fired when the speech recognition service has begun
 * listening to incoming audio with intent to recognize grammars
 * associated with the current context.
 *
 * @author Fonoster
 */
export const speechStartEvent = new AssistantEvent<{
  speechPermission: any // SpeechPermission
  audioContext: AudioContext
}>(EventName.SPEECH_START)

/**
 * Speech Stop Event
 *
 * @description Fired when the speech recognition service has disconnected.
 *
 * @author Fonoster
 */
export const speechStopEvent = new AssistantEvent<{
  audioContext: AudioContext
}>(EventName.SPEECH_STOP)

/**
 * Speech Pause Event
 *
 * @description Fired when speech recognized by the speech recognition
 * service is temporarily has stopped being detected.
 *
 * @author Fonoster
 */
export const speechPauseEvent = new AssistantEvent<{ isStreaming: boolean }>(
  EventName.SPEECH_PAUSE
)

/**
 * Speech Resume Event
 *
 * @description Fired when speech recognized by the speech
 * recognition service is detected again.
 *
 * @author Fonoster
 */
export const speechResumeEvent = new AssistantEvent<{ isStreaming: boolean }>(
  EventName.SPEECH_RESUME
)

/**
 * Speech Intents Event
 *
 * @description Fired when the speech service returns a result,
 * a word or phrase has been positively recognized and this
 * has been communicated back to the app.
 *
 * @author Fonoster
 */
export const speechIntentsEvent = new AssistantEvent<{
  intents: Intent[]
  error?: SpeechError
}>(EventName.SPEECH_INTENTS)

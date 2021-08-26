import type { Intent, VoiceError } from '../../voice-manager'
import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

/**
 * Voice Start Event
 *
 * @description Fired when the voice recognition service has begun
 * listening to incoming audio with intent to recognize grammars
 * associated with the current context.
 *
 * @author Fonoster
 */
export const voiceStartEvent = new AssistantEvent<{
  voicePermission: any // VoicePermission
  audioContext: AudioContext
}>(EventName.VOICE_START)

/**
 * Voice Stop Event
 *
 * @description Fired when the voice recognition service has disconnected.
 *
 * @author Fonoster
 */
export const voiceStopEvent = new AssistantEvent<{
  audioContext: AudioContext
}>(EventName.VOICE_STOP)

/**
 * Voice Pause Event
 *
 * @description Fired when voice recognized by the voice recognition
 * service is temporarily has stopped being detected.
 *
 * @author Fonoster
 */
export const voicePauseEvent = new AssistantEvent<{ isStreaming: boolean }>(
  EventName.VOICE_PAUSE
)

/**
 * Voice Resume Event
 *
 * @description Fired when voice recognized by the voice
 * recognition service is detected again.
 *
 * @author Fonoster
 */
export const voiceResumeEvent = new AssistantEvent<{ isStreaming: boolean }>(
  EventName.VOICE_RESUME
)

/**
 * Voice Intents Event
 *
 * @description Fired when the voice service returns a result,
 * a word or phrase has been positively recognized and this
 * has been communicated back to the app.
 *
 * @author Fonoster
 */
export const voiceIntentsEvent = new AssistantEvent<{
  intents: Intent[]
  error?: VoiceError
}>(EventName.VOICE_INTENTS)

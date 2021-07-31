import type { EventName } from '../../services/event-bus'
import type { TGetUserMedia } from '../../services/speech-recognition'

declare global {
  interface Window {
    __PF_ASSISTANT_LOADED__?: boolean
    webkitAudioContext: typeof AudioContext
  }

  interface Navigator {
    webkitGetUserMedia?: TGetUserMedia
    mozGetUserMedia?: TGetUserMedia
  }

  interface HTMLElementEventMap extends Record<EventName, CustomEvent> {}
}

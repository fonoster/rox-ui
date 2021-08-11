import type { EventName } from '../../services/event-bus'

declare global {
  interface Window {
    __PF_ASSISTANT_LOADED__?: boolean
    webkitAudioContext: typeof AudioContext
  }

  interface HTMLElementEventMap extends Record<EventName, CustomEvent> {}
}

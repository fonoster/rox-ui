import type { EventName } from '../../services/event-bus'

declare global {
  interface Window {
    __PF_ASSISTANT_LOADED__?: boolean
  }

  interface HTMLElementEventMap extends Record<EventName, CustomEvent> {}
}

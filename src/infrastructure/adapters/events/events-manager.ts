import { MESSAGES } from '../../data/messages'
import { Events } from './events'

/**
 * Events Manager
 *
 * @description Abstraction to manage all DOM events related to the assistant.
 *
 * @author Fonoster
 */
export class EventsManager {
  private assistant: HTMLDivElement
  private static instance: EventsManager

  public notify(event: Events, data?: { [k: string]: unknown }) {
    this.assistant?.dispatchEvent(new CustomEvent(event, data))
  }

  public subscribe(event: Events, cb: (e: Event) => void) {
    this.assistant?.addEventListener(event, cb)
  }

  public unsubscribe(event: Events, cb: (e: Event) => void) {
    this.assistant?.removeEventListener(event, cb)
  }

  public set setAssistant(assistant: HTMLDivElement) {
    if (!assistant) throw new Error(MESSAGES.WIDGET_NO_LOADED)

    window.__PF_FONOSTER_ASSISTANT_LOADED__ = true
    this.assistant = assistant
  }

  public static get getInstance(): EventsManager {
    return this.instance ?? (this.instance = new EventsManager())
  }
}

export const eventsManager = EventsManager.getInstance

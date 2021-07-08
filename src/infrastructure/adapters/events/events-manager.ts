import { MESSAGES } from '../../data/messages'
import { Events } from './events'

/**
 * Events Manager
 *
 * @description Abstraction to manage all DOM events related to the assistant.
 */
class EventsManager {
  private widget: HTMLDivElement
  private static eventManager: EventsManager

  public notify(event: Events, data?: { [k: string]: unknown }) {
    this.widget?.dispatchEvent(new CustomEvent(event, data))
  }

  public subscribe(event: Events, cb: (e: Event) => void) {
    this.widget?.addEventListener(event, cb)
  }

  public unsubscribe(event: Events, cb: (e: Event) => void) {
    this.widget?.removeEventListener(event, cb)
  }

  public set setWidget(widget: HTMLDivElement) {
    if (!widget) throw new Error(MESSAGES.WIDGET_NO_LOADED)

    window.__PF_FONOSTER_ASSISTANT_LOADED__ = true
    this.widget = widget
  }

  static get getManager(): EventsManager {
    return this.eventManager ?? (this.eventManager = new EventsManager())
  }
}

export const eventsManager = EventsManager.getManager

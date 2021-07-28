import { ERROR_MESSAGES } from '../../data'
import type { EventName } from './EventName'

export class EventBus {
  private assistant: HTMLDivElement
  private static _instance: EventBus

  public dispatch(event: EventName, detail?: Record<string, unknown>) {
    this.assistant?.dispatchEvent(new CustomEvent(event, { detail }))
  }

  public subscribe(event: EventName, cb: (e: CustomEvent) => void) {
    this.assistant?.addEventListener(event, cb)
  }

  public unsubscribe(event: EventName, cb: (e: CustomEvent) => void) {
    this.assistant?.removeEventListener(event, cb)
  }

  public set setAssistant(assistant: HTMLDivElement) {
    if (!assistant) throw new Error(ERROR_MESSAGES.WIDGET_NO_LOADED)

    this.assistant = assistant

    window.__PF_ASSISTANT_LOADED__ = true
  }

  public static get instance(): EventBus {
    return this._instance ?? (this._instance = new EventBus())
  }
}

export const eventBus = EventBus.instance

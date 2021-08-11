import { ERROR_MESSAGES } from '../../data'
import type { EventName } from './EventName'
import type { EventCallback } from './types'

export class EventBus {
  private manager: HTMLDivElement
  private static _instance: EventBus

  public dispatch<P>(event: EventName, detail?: P) {
    this.manager?.dispatchEvent(new CustomEvent(event, { detail }))
  }

  public subscribe<P>(event: EventName, cb: EventCallback<P>) {
    this.manager?.addEventListener(event, cb)
  }

  public unsubscribe<P>(event: EventName, cb: EventCallback<P>) {
    this.manager?.removeEventListener(event, cb)
  }

  public set setAssistant(manager: HTMLDivElement) {
    if (!manager) throw new Error(ERROR_MESSAGES.WIDGET_NO_LOADED)

    this.manager = manager

    window.__PF_ASSISTANT_LOADED__ = true
  }

  public static get instance(): EventBus {
    return this._instance ?? (this._instance = new EventBus())
  }
}

export const eventBus = EventBus.instance

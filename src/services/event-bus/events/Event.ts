import { eventBus } from '../EventBus'
import type { EventName } from '../EventName'
import type { EventCallback } from '../types'

/**
 * Assistant Event
 *
 * @description An abstraction for dispatch events from the assistant to DOM.
 *
 * @author Fonoster
 */
export abstract class AssistantEvent<P> {
  constructor(private readonly event: EventName) {}

  /**
   * Dispatch event
   *
   * @description Trigger the event using the event bus from the current
   * context and accept a payload of the inherited type.
   */
  dispatch(payload: P) {
    eventBus.dispatch<P>(this.event, payload)
  }

  /**
   * Subscribe method
   *
   * @returns {Function} A function that removes the event listener in target's event
   * listener list with the same type, callback, and options.
   */
  subscribe(cb: EventCallback<P>): Function {
    eventBus.subscribe<P>(this.event, cb)

    return () => eventBus.unsubscribe<P>(this.event, cb)
  }
}

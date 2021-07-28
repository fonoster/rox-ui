import { eventBus } from '../EventBus'
import { EventName } from '../EventName'

export type VisibilityPayload = {
  isOpen: boolean
  selector?: string
}

export class VisibilityEvent {
  private static event = EventName.VISIBILITY

  static dispatch(data: VisibilityPayload) {
    eventBus.dispatch(this.event, data)
  }

  /**
   * Subscribe method
   *
   * @returns {Function} A function that removes the event listener in target's event
   * listener list with the same type, callback, and options.
   */
  static subscribe(cb: (e: CustomEvent<VisibilityPayload>) => void): Function {
    eventBus.subscribe(this.event, cb)

    return () => eventBus.unsubscribe(this.event, cb)
  }
}

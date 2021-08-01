import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

type Payload = {
  isOpen: boolean
  selector?: string
}

/**
 * Visibility Event
 *
 * @description Fired when the visibility of assistant changes state.
 *
 * @author Fonoster
 */
class VisibilityEvent extends AssistantEvent<Payload> {
  constructor() {
    super(EventName.VISIBILITY)
  }
}

export const visibilityEvent = new VisibilityEvent()

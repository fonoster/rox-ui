import { EventName } from '../EventName'
import { AssistantEvent } from './Event'

/**
 * Visibility Event
 *
 * @description Fired when the visibility of assistant changes state.
 *
 * @author Fonoster
 */
export const visibilityEvent = new AssistantEvent<{
  isOpen: boolean
  selector?: string
}>(EventName.VISIBILITY)

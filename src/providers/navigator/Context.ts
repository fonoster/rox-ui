import { createContext } from 'preact'

import { ERROR_MESSAGES } from '../../data'
import type { TNavigatorContext } from './types'

/**
 * Navigator Context
 *
 * @description text
 *
 * @author Fonoster
 */
export const NavigatorContext = createContext<TNavigatorContext>({
  currentScreen: undefined,
  navigate() {
    throw new Error(ERROR_MESSAGES.NAVIGATE_NOT_IMPLEMENTED)
  },
})

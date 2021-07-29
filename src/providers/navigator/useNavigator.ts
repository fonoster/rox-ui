import { useContext } from 'preact/hooks'

import { ERROR_MESSAGES } from '../../data'
import { NavigatorContext } from './Context'

/**
 * use Navigator
 *
 * @description text
 *
 * @author Fonoster
 */
export const useNavigator = () => {
  const context = useContext(NavigatorContext)

  if (!context) throw new Error(ERROR_MESSAGES.OUTSIDE_NAVIGATOR)

  return context
}

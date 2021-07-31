import { useContext } from 'preact/hooks'

import { ERROR_MESSAGES } from '../data'
import { NavigatorContext } from '../providers/navigation/NavigatorContext'

export const useNavigator = () => {
  const navigation = useContext(NavigatorContext)

  if (!navigation) throw new Error(ERROR_MESSAGES.OUTSIDE_OF_PROVIDER)

  return navigation
}

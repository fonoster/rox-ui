import { h } from 'preact'
import { useMemo, useRef, useState } from 'preact/hooks'

import { ERROR_MESSAGES } from '../../data'
import { NavigatorContext } from './NavigatorContext'
import { navigatorWarnings } from './navigatorWarnings'
import type { SCREEN_NAMES } from './ScreenNames'
import type { INavigatorProps } from './types'

/**
 * Navigator Provider
 *
 * @description Provides a way for your app to transition between screens with
 * a simple implementation because it doesn't seem necessary to
 * install a larger library to manage screens.
 *
 * @author Fonoster
 */
export const Navigator = ({
  initialScreen,
  children,
  ...props
}: INavigatorProps) => {
  navigatorWarnings(children) // @patch-line

  const initialScreenRef = useRef(initialScreen).current
  const [currentScreen, navigate] = useState<SCREEN_NAMES>(initialScreenRef)

  const context = useMemo(
    () => ({
      currentScreen,
      navigate,
    }),
    [currentScreen]
  )

  const screen = useMemo(
    () =>
      Array.isArray(children)
        ? children.find(({ props }) => props?.name === currentScreen)
        : children,
    [children]
  )

  if (!screen) throw new Error(ERROR_MESSAGES.NAVIGATOR_NO_CHILDREN)

  return (
    <NavigatorContext.Provider
      {...{ ...props, children: screen }}
      value={context}
    />
  )
}

import React from 'preact/compat'

import { __DEV__ } from '../../config'
import { ERROR_MESSAGES } from '../../data'
import { Screen } from './Screen'
import type { TNavigatorChildren } from './types'

/**
 * Navigator Warnings in Development
 *
 * @description Show all the necessary errors in the <Navigator /> development
 * to maintain a healthy implementation. Mainly it validates that the
 * navigator's children are <Screen /> components.
 *
 * @author Fonoster
 */
export const navigatorWarnings = (children: TNavigatorChildren) => {
  if (!__DEV__) return

  /**
   * Validate Children
   *
   * @throws Don't allow the use of this component if your
   * children are not a screen component.
   */
  const validateChildren = child => {
    if (child?.type !== Screen)
      throw new Error(ERROR_MESSAGES.NAVIGATOR_CHILDREN)

    if (!child.props?.name) throw new Error(ERROR_MESSAGES.SCREEN_NAME_REQUIRE)
  }

  React.Children.toArray(children).forEach(validateChildren)
}

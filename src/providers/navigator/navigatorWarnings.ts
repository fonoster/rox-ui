import React from 'preact/compat'

import { __DEV__ } from '../../config'
import { ERROR_MESSAGES } from '../../data'
import { Screen } from './Screen'
import type { TNavigatorChildren } from './types'

/**
 * Navigator Warnings in Development
 *
 * @description text
 *
 * @private
 * @author Fonoster
 */
export const navigatorWarnings = (children: TNavigatorChildren) => {
  if (!__DEV__) return

  /**
   * @throws Don't allow the use of this component if your
   * children are not a screen component.
   */
  const isValidChildren = child => {
    if (child?.type !== Screen)
      throw new Error(ERROR_MESSAGES.NAVIGATOR_CHILDREN)

    if (!child.props?.name) throw new Error(ERROR_MESSAGES.SCREEN_NAME_REQUIRE)
  }

  React.Children.toArray(children).forEach(isValidChildren)
}

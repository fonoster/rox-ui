import { Fragment, FunctionalComponent, h } from 'preact'

import type { TScreenProps } from './types'

/**
 * Navigator Screen
 *
 * @description text
 *
 * @author Fonoster
 */
export const Screen: FunctionalComponent<TScreenProps> = ({
  component: Component,
  ...props
}: TScreenProps) => (
  <Fragment {...props}>
    <Component />
  </Fragment>
)

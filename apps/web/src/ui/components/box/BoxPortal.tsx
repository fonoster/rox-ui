import { h } from 'preact'

import { IVisibilityProps } from '../../../@types/shared'
import * as styles from '../../styles/portals/assistant.module.scss'
import { Portal } from '../portal'
import { BoxFooter } from './BoxFooter'
import { BoxHeader } from './BoxHeader'

export const BoxPortal = ({
  isOpen,
  setVisibility,
  ...props
}: IVisibilityProps) => (
  <div
    className={`${styles['rox-assistant']} ${
      isOpen ? styles['rox-assistant--open'] : ''
    }`}
  >
    <Portal id={styles['rox-assistant']}>
      <div className="rox-assistant">
        <BoxHeader {...{ setVisibility }} />
        <div className="rox-assistant-content" {...props} />
        <BoxFooter />
      </div>
    </Portal>
  </div>
)

import { h } from 'preact'

import { IVisibilityProps } from '../../../interfaces'
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
    className={`${styles['pf-assistant']} ${
      isOpen ? styles['pf-assistant--open'] : ''
    }`}
  >
    <Portal id={styles['pf-assistant']}>
      <div className="pf-assistant">
        <BoxHeader {...{ setVisibility }} />
        <div className="pf-assistant-content" {...props} />
        <BoxFooter />
      </div>
    </Portal>
  </div>
)

import { h } from 'preact'

import { IVisibilityProps } from '../../../../../@types/shared'
// import * as styles from '../../styles/portals/assistant.module.scss'
import { Portal } from '../portal'
import { BoxFooter } from './BoxFooter'
import { BoxHeader } from './BoxHeader'

export const BoxPortal = ({
  isOpen,
  setVisibility,
  ...props
}: IVisibilityProps) => (
  <div className={`${'rox-assistant'} ${isOpen ? 'rox-assistant--open' : ''}`}>
    <Portal id={'rox-assistant'}>
      <div className="rox-assistant">
        <BoxHeader {...{ setVisibility }} />
        <div className="rox-assistant-content" {...props} />
        <BoxFooter />
      </div>
    </Portal>
  </div>
)

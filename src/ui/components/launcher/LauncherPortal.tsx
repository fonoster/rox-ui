import { h } from 'preact'

import { MESSAGES } from '../../../data'
import { IVisibilityProps } from '../../../interfaces'
import * as styles from '../../styles/portals/launcher.module.scss'
import { FloatingButton } from '../floating-button'
import { Portal } from '../portal'
import { FonosterLogo } from '../svg'

export const LauncherPortal = ({ isOpen, setVisibility }: IVisibilityProps) => (
  <div className={styles['pf-launcher']}>
    <Portal id={styles['pf-launcher']} title={MESSAGES.LAUNCHER_TITLE}>
      <div className="button__container">
        <FloatingButton onClick={setVisibility} disabled={isOpen}>
          <FonosterLogo />
        </FloatingButton>
      </div>
    </Portal>
  </div>
)

import { h } from 'preact'

import { MESSAGES } from '../../../data'
import { TSetVisibilityProps } from '../../../interfaces'
import { CloseIcon, FonosterLogo } from '../svg'

export const BoxHeader = ({ setVisibility }: TSetVisibilityProps) => (
  <div className="pf-assistant-header">
    <h1>
      <FonosterLogo bgColor="#4746D4" color="#fff" />
      <span>{MESSAGES.ASSISTANT_TITLE}</span>
    </h1>
    <div className="pf-assistant-actions">
      <button className="close" onClick={setVisibility}>
        <CloseIcon />
      </button>
    </div>
  </div>
)

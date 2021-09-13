import { h } from 'preact'

import { TSetVisibilityProps } from '../../../../../@types/shared'
import { MESSAGES } from '../../../data'
import { CloseIcon, FonosterLogo } from '../svg'

export const BoxHeader = ({ setVisibility }: TSetVisibilityProps) => (
  <div className="rox-assistant-header">
    <h1>
      <FonosterLogo bgColor="#4746D4" color="#fff" />
      <span>{MESSAGES.ASSISTANT_TITLE}</span>
    </h1>
    <div className="rox-assistant-actions">
      <button className="close" onClick={setVisibility}>
        <CloseIcon />
      </button>
    </div>
  </div>
)

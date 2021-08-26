import { h, JSX } from 'preact'

import { Intent } from '../../../services/voice-manager'

export interface IntentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  intent: Omit<Intent, 'id'>
}

export const IntentCard = ({ intent, ...props }: IntentProps) => (
  <div className="intent" {...props}>
    <div
      className="intent__icon"
      style={{ backgroundImage: `url(${intent.icon})` }}
    />
    <div className="intent__content">
      <h5 className="intent__title">{intent.title}</h5>
      <p className="intent__desc">{intent.description}</p>
    </div>
  </div>
)

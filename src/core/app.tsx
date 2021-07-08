import { h } from 'preact'
import { EventsManager } from '../infrastructure/adapters/events'
import '../infrastructure/styles/styles.scss'

interface IProps {
  privateKey: string
  eventManager: EventsManager
}

export const App = ({ privateKey }: IProps) => {
  return <h1>Hello Roxanne, your key: {privateKey}</h1>
}

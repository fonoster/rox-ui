import { getAccessKey } from '../helpers'
import { eventBus } from '../services/event-bus'
import { Roxanne } from './Roxanne'

const accessKey = getAccessKey()

const assistant = new Roxanne({
  accessKey,
  eventBus,
})

document.addEventListener('DOMContentLoaded', () => assistant.mount())

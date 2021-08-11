import { eventBus } from '../services/event-bus'
import { PFAuthManager } from '../services/fonos'
import { Roxanne } from './Roxanne'

const accessKey = PFAuthManager.getKeyFromScript()

const assistant = new Roxanne({
  accessKey,
  eventBus,
})

document.addEventListener('DOMContentLoaded', () => assistant.mount())

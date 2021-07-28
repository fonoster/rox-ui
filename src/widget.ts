import { PFAssistant } from './Assistant'
import { eventBus } from './services/event-bus'
import { PFAuthManager } from './services/PFAuthManager'

const accessKey = PFAuthManager.getKeyFromScript()

const assistant = new PFAssistant({
  accessKey,
  eventBus,
})

document.addEventListener('DOMContentLoaded', () => assistant.mount())

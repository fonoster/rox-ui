import { eventsManager } from './infrastructure/adapters/events'
import { CONSTANT_CONFIG } from './infrastructure/config'
import { Assistant } from './core/assistant'
import { getFonosterKey } from './infrastructure/utilities'

/**
 * Debugging in development
 *
 * @throws If you don't use CI to build a production widget,
 * make sure you don't include this package.
 */
if (CONSTANT_CONFIG.IS_DEV) import('preact/debug')

const privateKey = getFonosterKey()

const assistant = Assistant.getInstance({
  eventsManager,
  privateKey,
})

document.addEventListener('DOMContentLoaded', () => assistant.init())

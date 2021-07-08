import { h, render } from 'preact'
import { App } from './app'
import { Events, eventsManager } from '../infrastructure/adapters/events'
import { CONSTANT_CONFIG } from '../infrastructure/config'
import { MESSAGES } from '../infrastructure/data/messages'
import { widgetIsLoaded, getFonosterKey } from '../infrastructure/utilities'

/**
 * Debugging in development
 *
 * @throws If you don't use CI to build a production widget,
 * make sure you don't include this package.
 */
if (CONSTANT_CONFIG.IS_DEV) import('preact/debug')

/**
 * Create DOM Element - Assistant instance
 *
 * @description Create a new element in the DOM to load the instance.
 */
export const createInstance = () => {
  const instance = document.createElement('div')
  instance.id = CONSTANT_CONFIG.WIDGET_SELECTOR

  if (widgetIsLoaded(instance.id)) throw new Error(MESSAGES.WIDGET_IS_LOADED)

  document.body.appendChild(instance)

  return instance
}

export const dispatchLoaded = (widget: HTMLDivElement) => {
  eventsManager.setWidget = widget

  eventsManager.notify(Events.LOADED, { widget })
}

/**
 * Initialize Widget
 *
 * @description Get the DOM instance and render the new app.
 */
const initializeWidget = () => {
  /**
   * @todo Use this within the app to add the client key to the context.
   */
  getFonosterKey()

  const widget = createInstance()

  render(<App />, widget!)

  dispatchLoaded(widget)
}

document.addEventListener('DOMContentLoaded', initializeWidget)

import { h, render } from 'preact'
import { App } from './app'
import { Events, EventsManager } from '../infrastructure/adapters/events'
import { CONSTANT_CONFIG } from '../infrastructure/config'
import { MESSAGES } from '../infrastructure/data/messages'

type Dependencies = {
  eventsManager: EventsManager
  privateKey: string
}

/**
 * Assistant
 *
 * @description The main class of the assistant with the responsibility of
 * centralizing the creation of the elements in DOM, adding styles, and
 * rendering a new app for the current client.
 *
 * @author Fonoster
 */
export class Assistant {
  private static instance: Assistant

  constructor(private deps: Dependencies) {}

  /**
   * Initialize Assistant
   *
   * @description Render a new app and dispatch DOM events
   */
  public init() {
    const assistant = this.render(this.deps.privateKey)

    this.dispatchLoaded(assistant)
  }

  /**
   * Render App
   *
   * @param privateKey The key provided by the Fonoster API.
   */
  private render(privateKey: string) {
    const assistant = this.createElement()

    const appProps = {
      privateKey,
      eventManager: this.deps.eventsManager,
    }

    render(<App {...appProps} />, assistant!)

    return assistant
  }

  /**
   * Create DOM Element
   *
   * @description Create a new element in the DOM to load the instance.
   */
  private createElement() {
    const element = document.createElement('div')
    element.id = CONSTANT_CONFIG.WIDGET_SELECTOR

    if (this.isLoaded(element.id)) throw new Error(MESSAGES.WIDGET_IS_LOADED)

    document.body.appendChild(element)

    return element
  }

  /**
   * Is Loaded
   *
   * @description Verify that no previous instance of the assistant was created
   * or that there is an element in the DOM with the same ID.
   */
  public isLoaded = (id: string) => {
    const assistant = document.getElementById(id)
    const isAssistant = Boolean(
      assistant && window.__PF_FONOSTER_ASSISTANT_LOADED__
    )

    return isAssistant
  }

  /**
   * Dispatch Loaded
   *
   * @description Assign the new assistant to the events manager and
   * dispatch the loaded event for the entire DOM.
   *
   * @param assistant Current instance
   */
  private dispatchLoaded = (assistant: HTMLDivElement) => {
    this.deps.eventsManager.setAssistant = assistant

    this.deps.eventsManager.notify(Events.LOADED, { assistant })
  }

  /**
   * Get Instance
   *
   * @description This static method applies the singleton pattern to
   * this class and ensures that I always interact with the same assistant.
   */
  public static getInstance(dependencies: Dependencies): Assistant {
    return this.instance ?? (this.instance = new Assistant(dependencies))
  }
}

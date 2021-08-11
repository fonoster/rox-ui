import { h, render } from 'preact'
import { lazy, Suspense } from 'preact/compat'

import { __DEV__, APP_CONFIG } from '../config'
import { ERROR_MESSAGES } from '../data'
import type { EventBus } from '../services/event-bus'

const App = lazy(() => import('./App'))

/**
 * Debugging in development
 *
 * @throws If you don't use CI to build a production assistant,
 * make sure you don't include this package.
 */
if (__DEV__) import('preact/debug') // @patch-line

type Dependencies = {
  accessKey: string
  eventBus: EventBus
}

/**
 * Roxanne Assistant
 *
 * @description The main class of the assistant with the responsibility of
 * centralizing the creation of the elements in DOM, adding styles, and
 * rendering a new app for the current client.
 *
 * @author Fonoster
 */
export class Roxanne {
  constructor(private deps: Dependencies) {}

  /**
   * Initialize Assistant
   *
   * @description Render a new app and set events manager
   */
  public mount() {
    const assistant = this.renderAssistant()

    this.deps.eventBus.setAssistant = assistant
  }

  private get app() {
    const appProps = {
      accessKey: this.deps.accessKey,
    }

    return (
      <Suspense fallback={<div />}>
        <App {...appProps} />
      </Suspense>
    )
  }

  /**
   * Render Assistant App
   *
   * @description Create a new element in the DOM to load the instance.
   */
  private renderAssistant(id = APP_CONFIG.ASSISTANT_ID) {
    const assistant = document.createElement('div')
    assistant.id = id

    if (this.assistantIsLoaded(assistant.id))
      throw new Error(ERROR_MESSAGES.ASSISTANT_IS_LOADED)

    document.body.appendChild(assistant)

    render(this.app, assistant!)

    return assistant
  }

  /**
   * Assistant is loaded
   *
   * @description Verify that no previous instance of the assistant was created
   * or that there is an element in the DOM with the same ID.
   */
  public assistantIsLoaded = (id: string) => {
    const assistant = document.getElementById(id)
    const isAssistant = Boolean(assistant ?? window.__PF_ASSISTANT_LOADED__)

    return isAssistant
  }
}

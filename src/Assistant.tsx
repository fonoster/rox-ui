import { h, render } from 'preact'
import { lazy, Suspense } from 'preact/compat'

import { __DEV__, APP_CONFIG } from './config'
import { ERROR_MESSAGES } from './data'
import type { EventBus } from './services/event-bus'

const App = lazy(() => import('./App'))

/**
 * Debugging in development
 *
 * @throws If you don't use CI to build a production widget,
 * make sure you don't include this package.
 */
if (__DEV__) import('preact/debug') // @patch-line

type Dependencies = {
  accessKey: string
  eventBus: EventBus
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
export class PFAssistant {
  constructor(private deps: Dependencies) {}

  /**
   * Initialize Assistant
   *
   * @description Render a new app and set events manager
   */
  public mount() {
    const widget = this.renderWidget()

    this.deps.eventBus.setAssistant = widget
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
   * Create DOM Element
   *
   * @description Create a new element in the DOM to load the instance.
   */
  private renderWidget(id = APP_CONFIG.WIDGET_ID) {
    const widget = document.createElement('div')
    widget.id = id

    if (this.widgetIsLoaded(widget.id))
      throw new Error(ERROR_MESSAGES.WIDGET_IS_LOADED)

    document.body.appendChild(widget)

    render(this.app, widget!)

    return widget
  }

  /**
   * Is Loaded
   *
   * @description Verify that no previous instance of the widget was created
   * or that there is an element in the DOM with the same ID.
   */
  public widgetIsLoaded = (id: string) => {
    const widget = document.getElementById(id)
    const isWidget = Boolean(widget ?? window.__PF_ASSISTANT_LOADED__)

    return isWidget
  }
}

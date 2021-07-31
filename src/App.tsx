import { Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

import { VisibilityEvent } from './services/event-bus'
import { BoxPortal } from './ui/components/box'
import { LauncherPortal } from './ui/components/launcher'
import { Router } from './ui/router'

type AppProps = {
  accessKey: string
}

export const App: FunctionalComponent<AppProps> = () => {
  const [isOpen, setOpen] = useState(false)

  const setVisibility = () => {
    setOpen(prevOpen => {
      VisibilityEvent.dispatch({ isOpen: !prevOpen })

      return !prevOpen
    })
  }

  const params = {
    isOpen,
    setVisibility,
  }

  return (
    <Fragment>
      <BoxPortal {...params}>
        <Router />
      </BoxPortal>
      <LauncherPortal {...params} />
    </Fragment>
  )
}
export default App

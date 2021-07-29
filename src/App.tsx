import { Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

import { Navigator, Screen, SCREEN_NAMES } from './providers/navigation'
import { VisibilityEvent } from './services/event-bus'
import { BoxPortal } from './ui/components/box'
import { LauncherPortal } from './ui/components/launcher'

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
        <Navigator initialScreen={SCREEN_NAMES.LISTENING}>
          <Screen
            name={SCREEN_NAMES.LISTENING}
            component={() => <p>Hello</p>}
          />
        </Navigator>
      </BoxPortal>
      <LauncherPortal {...params} />
    </Fragment>
  )
}
export default App

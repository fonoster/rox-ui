import { h, JSX, VNode } from 'preact'
import { createPortal } from 'preact/compat'
import { useState } from 'preact/hooks'

import { useStylesheet } from '../../../hooks'

export interface IPortalProps extends JSX.HTMLAttributes<HTMLIFrameElement> {
  children: VNode<{}>
}

export const Portal = ({ children, ...props }: IPortalProps) => {
  const [ref, setRef] = useState<HTMLIFrameElement | null>(null)
  const doc = ref?.contentDocument

  useStylesheet(doc)

  return (
    <iframe tabIndex={0} {...props} ref={setRef}>
      {doc && createPortal(children, doc?.body)}
    </iframe>
  )
}

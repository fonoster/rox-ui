import { h, JSX } from 'preact'

export const Title = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="rox-assistant__title" {...props} />
)

export const SubTitle = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="rox-assistant__subtitle" {...props} />
)

export const Text = (props: JSX.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="rox-assistant__text" {...props} />
)

import { h, JSX } from 'preact'

export const Title = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="pf-assistant__title" {...props} />
)

export const SubTitle = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="pf-assistant__subtitle" {...props} />
)

export const Text = (props: JSX.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="pf-assistant__text" {...props} />
)

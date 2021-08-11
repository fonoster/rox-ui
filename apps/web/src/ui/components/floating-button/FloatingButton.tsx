import { h, JSX } from 'preact'

export const FloatingButton = (
  props: JSX.HTMLAttributes<HTMLButtonElement>
) => <button className="button" type="button" {...props} />

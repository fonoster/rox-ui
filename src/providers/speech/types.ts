export type TGetUserMedia = typeof navigator.getUserMedia

export type MediaStreamConstraints = Parameters<TGetUserMedia>[0]

export interface Intent {
  id: string
  title: string
  icon: string
  description: string
  transcript?: string
}

export type TGetUserMedia = typeof navigator.getUserMedia

export type MediaStreamConstraints = Parameters<TGetUserMedia>[0]

export enum SpeechPermission {
  DENIED = 'denied',
  GRANTED = 'granted',
  PROMPT = 'prompt',
}

export interface Intent {
  id: string
  title: string
  icon: string
  description: string
  transcript?: string
}

export type SpeechError = {
  statusCode: number
  message: string
}

export type OnIntentsCallback = (intents: Intent[], error?: SpeechError) => void

export type OnWaitingCallback = (isWaiting: boolean) => void

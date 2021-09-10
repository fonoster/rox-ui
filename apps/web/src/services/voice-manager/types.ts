export interface Intent {
  id: string
  title: string
  icon: string
  description: string
  transcript?: string
  // actions?: {
  //   link: {
  //     url: string
  //     target?: string
  //   }
  // }
}

export type VoiceError = {
  statusCode: number
  message: string
}

export type OnIntentsCallback = (intents: Intent[], error?: VoiceError) => void

export type OnWaitingCallback = (isWaiting: boolean) => void

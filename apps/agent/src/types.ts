import type { UserAgent } from 'sip.js'

export interface Config {
  audioElementId: string
  instrumentationKey: string
}

export interface InviterConfig {
  userAgent: UserAgent
  didInfo: string
  targetAOR: string
  audioElement: HTMLAudioElement
}

export interface Event {
  name: string
  type: string
  description: string
  payload: any
}

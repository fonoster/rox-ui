import { createContext } from 'preact'
import type React from 'preact/compat'

import { Intent, VoiceManager } from '../../services/voice-manager'

export interface IVoiceState {
  /**
   * Last final intent received from the API.
   */
  intent?: Intent

  /**
   * History of all the intentions returned by the API.
   */
  history?: Intent[]
}

export interface IVoiceContext {
  voice: VoiceManager
  data: IVoiceState
  setData: React.StateUpdater<IVoiceState>
}

export const VoiceContext = createContext<IVoiceContext | null>(null)

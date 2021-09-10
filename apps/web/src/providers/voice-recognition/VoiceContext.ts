import { createContext } from 'preact'
import type React from 'preact/compat'

import { Intent } from '../../services/voice-manager'

export interface IVoiceState {
  /**
   * Last final intent received from the API.
   */
  intent?: Intent

  /**
   * History of all the intentions returned by the API.
   */
  history?: []
}

export interface IVoiceContext {
  data: IVoiceState
  setData: React.StateUpdater<IVoiceState>
}

export const VoiceContext = createContext<IVoiceContext | null>(null)

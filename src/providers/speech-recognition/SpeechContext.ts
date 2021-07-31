import { createContext } from 'preact'
import type React from 'preact/compat'

import { ErrorNotImplemented, Intent } from '../../services/speech-recognition'

export interface ISpeechState {
  /**
   * Last final intent received from the API.
   */
  intent?: Intent

  /**
   * History of all the intentions returned by the API.
   */
  history?: Intent[]
}

export interface ISpeechContext {
  data: ISpeechState
  setData: React.StateUpdater<ISpeechState>

  /**
   * Initialize speech recognition
   *
   * @description A function that initializes speech recognition, including the API connection.
   */
  initialize: () => void
}

export const SpeechContext = createContext<ISpeechContext>({
  data: {
    intent: undefined,
    history: [],
  },
  setData() {
    throw new ErrorNotImplemented()
  },
  initialize() {
    throw new ErrorNotImplemented()
  },
})

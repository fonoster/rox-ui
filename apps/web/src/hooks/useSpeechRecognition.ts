import { useContext } from 'preact/hooks'

import { ERROR_MESSAGES } from '../data'
import { SpeechContext } from '../providers/speech-recognition'

/**
 * use Speech Recognition
 *
 * @description React hook that exposes SpeechContext.
 *
 * @author Fonoster
 */
export const useSpeechRecognition = () => {
  const speech = useContext(SpeechContext)

  if (!speech) throw new Error(ERROR_MESSAGES.OUTSIDE_OF_PROVIDER)

  return speech
}

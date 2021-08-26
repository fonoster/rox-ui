import { useContext } from 'preact/hooks'

import { ERROR_MESSAGES } from '../data'
import { VoiceContext } from '../providers/voice-recognition'

/**
 * use Voice Recognition
 *
 * @description React hook that exposes VoiceContext.
 *
 * @author Fonoster
 */
export const useVoiceRecognition = () => {
  const voice = useContext(VoiceContext)

  if (!voice) throw new Error(ERROR_MESSAGES.OUTSIDE_OF_PROVIDER)

  return voice
}

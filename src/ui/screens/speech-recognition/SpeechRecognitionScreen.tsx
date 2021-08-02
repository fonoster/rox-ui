import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { speechRecognition } from '../../../services/speech-recognition'

export const SpeechRecognitionScreen = () => {
  useEffect(() => {
    speechRecognition.start()

    return () => {
      speechRecognition?.stop()
    }
  }, [])

  return <p>Hello Speech</p>
}

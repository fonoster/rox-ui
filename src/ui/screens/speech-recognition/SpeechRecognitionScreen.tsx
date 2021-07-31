import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { VisibilityEvent } from '../../../services/event-bus'
import { speechRecognition } from '../../../services/speech-recognition'

export const SpeechRecognitionScreen = () => {
  useEffect(() => {
    VisibilityEvent.subscribe(({ detail: { isOpen } }) => {
      if (isOpen) {
        speechRecognition.start()

        speechRecognition.onWaiting(console.log)
        speechRecognition.onIntent(console.log)
      }
    })

    return () => {
      speechRecognition?.stop()
    }
  }, [])

  return <p>Hello Speech</p>
}

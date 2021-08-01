import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { visibilityEvent } from '../../../services/event-bus'
import { speechRecognition } from '../../../services/speech-recognition'

export const SpeechRecognitionScreen = () => {
  useEffect(() => {
    visibilityEvent.subscribe(({ detail: { isOpen } }) => {
      if (isOpen) {
        speechRecognition.start()

        speechRecognition.onWaiting(console.log)
        speechRecognition.onIntents(console.log)
      }
    })

    return () => {
      speechRecognition?.stop()
    }
  }, [])

  return <p>Hello Speech</p>
}

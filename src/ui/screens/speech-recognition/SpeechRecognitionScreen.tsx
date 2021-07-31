import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { speechRecognition } from '../../../providers/speech'
import { VisibilityEvent } from '../../../services/event-bus'

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

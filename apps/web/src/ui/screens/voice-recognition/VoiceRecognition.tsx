import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { APP_CONFIG } from '../../../config'
import { VoiceManager } from '../../../services/voice-manager'

export const VoiceRecognition = () => {
  useEffect(() => {
    const voice = new VoiceManager(APP_CONFIG.AUDIO_ID)
    voice.start()

    voice.onIntents(console.log)

    return () => {
      voice?.stop()
    }
  }, [])

  return <p>Hello Voice</p>
}

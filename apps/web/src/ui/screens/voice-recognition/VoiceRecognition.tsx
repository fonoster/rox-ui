import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { APP_CONFIG } from '../../../config'
import { getAccessKey } from '../../../helpers/getAccessKey'
import { Voice } from '../../../services/voice'

export const VoiceRecognition = () => {
  useEffect(() => {
    const voice = new Voice(getAccessKey(), APP_CONFIG.AUDIO_ID)
    voice.start()

    return () => {
      voice?.stop()
    }
  }, [])

  return <p>Hello Speech</p>
}

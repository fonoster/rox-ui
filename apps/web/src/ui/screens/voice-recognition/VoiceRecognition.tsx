import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { APP_CONFIG } from '../../../config'
import { useVoiceRecognition } from '../../../hooks/useVoiceRecognition'
import { VoiceManager } from '../../../services/voice-manager'
// import { IntentCard } from '../../components/intent'
import { Listening } from '../../components/svg'
import { Title } from '../../components/text'

export const VoiceRecognition = () => {
  const { setData } = useVoiceRecognition()
  const [isListening, setListening] = useState(false)

  useEffect(() => {
    const connect = async () => {
      const voice = new VoiceManager(APP_CONFIG.AUDIO_ID)
      await voice.start()

      voice.onIntents(data => {
        if (data.eventName === 'RECOGNIZING' || data.eventName === 'ANSWERED') {
          setListening(true)
        }

        if (data.eventName === 'RECOGNIZING_FINISHED') {
          setListening(false)
        }

        if (data.eventName === 'INTENT') {
          setData(prev => ({
            ...prev,
            intent: data,
            history: [data, ...Array.from(prev?.history ?? [])] as any,
          }))
        }

        if (data.eventName === 'HANGUP') {
          // voice?.stop()
          // @TODO Close widget
        }
      })

      return () => {
        voice?.stop()
      }
    }
    connect()
  }, [])

  if (isListening) {
    return (
      <div className="assistant-listening-wrapper">
        <Title>You can talk now, I’m listening…</Title>
        <div>
          <Listening />
        </div>
      </div>
    )
  }

  // if (data.history?.length || data.intent) {
  //   return data?.history?.map(() => (
  //     <IntentCard
  //       key={Date.now()}
  //       intent={{
  //         title: 'A reminder of company events',
  //         icon: '',
  //         description: 'Add a reminder to your Google calendar and send email.',
  //         transcript: 'You said: “Add reminders”',
  //       }}
  //     />
  //   ))
  // }

  return <p>Permissions</p>
}

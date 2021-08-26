import { ComponentChildren, h } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import { APP_CONFIG } from '../../config'
import { VoiceManager } from '../../services/voice-manager'
import { IVoiceState, VoiceContext } from './VoiceContext'

export interface VoiceProviderProps {
  children: ComponentChildren
}

/**
 * The provider for Voice
 *
 * @description Make sure you have only one VoiceProvider in your application,
 * because otherwise the audio will be mixed up and unusable.
 *
 * It is possible to switch the props on the fly, which will make provider stop current client if it's running
 * and start a new one.
 *
 * @author Fonoster
 */
export const VoiceProvider = (props: VoiceProviderProps) => {
  const [data, setData] = useState<IVoiceState>({
    intent: undefined,
    history: [],
  })

  const context = useMemo(
    () => ({
      data,
      setData,
      voice: new VoiceManager(APP_CONFIG.AUDIO_ID),
    }),
    [data]
  )

  return <VoiceContext.Provider {...props} value={context} />
}

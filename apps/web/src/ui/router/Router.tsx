import { h } from 'preact'

import { Navigator, Screen, SCREEN_NAMES } from '../../providers/navigation'
import { VoiceRecognition } from '../screens/voice-recognition'

export const Router = () => (
  <Navigator initialScreen={SCREEN_NAMES.VOICE}>
    <Screen name={SCREEN_NAMES.VOICE} component={VoiceRecognition} />
  </Navigator>
)

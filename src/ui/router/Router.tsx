import { h } from 'preact'

import { Navigator, Screen, SCREEN_NAMES } from '../../providers/navigation'
import { SpeechRecognitionScreen } from '../screens/speech-recognition'

export const Router = () => (
  <Navigator initialScreen={SCREEN_NAMES.SPEECH}>
    <Screen name={SCREEN_NAMES.SPEECH} component={SpeechRecognitionScreen} />
  </Navigator>
)

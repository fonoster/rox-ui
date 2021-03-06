import { APP_CONFIG } from '../config'

export const ERROR_MESSAGES = {
  ID_MISSING: 'ID is missing from widget script',
  KEY_MISSING: 'Key is missing from widget',
  ASSISTANT_IS_LOADED: 'Oops! It seems that the assistant has loaded',
  WIDGET_NO_LOADED: 'The assistant was not found',
  SCREEN_NAME_REQUIRE: 'The "name" prop is required for each screen',
  NAVIGATE_NOT_IMPLEMENTED: 'Oops!, navigation has not been implemented',
  NAVIGATOR_CHILDREN:
    'A <Navigator /> can only contain "<Screen />" as its direct children',
  NAVIGATOR_NO_CHILDREN:
    'It seems that <Navigator /> has no children. You must add at least one child',
  OUTSIDE_OF_PROVIDER:
    "Couldn't find a context. Is your component outside a <Screen />?",
  AUDIO_LOADED: `You cannot have an audio with the id, use a different id for ${APP_CONFIG.AUDIO_ID}`,
}

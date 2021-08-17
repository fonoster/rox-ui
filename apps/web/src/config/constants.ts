import appConfig from '../../app.config.json'

export const APP_CONFIG = {
  ASSISTANT_ID: '__rox_assistant__',
  AUDIO_ID: '__rox_assistant_audio__',
  SCRIPT_ID: 'rox-script',
  PUBLIC_URL: appConfig.public_url,
}

export const PF_ACCESS_KEY = appConfig.access_key
export const __DEV__ = process.env.NODE_ENV === 'development'

/**
 * Stylesheet
 *
 * @description This is a reference to the stylesheet that are
 * in the root of the styles folder but the compiled version.
 *
 * @throws If any name of your files is changed you must update this const.
 *
 * @author Fonoster
 */
export const STYLESHEET = `${APP_CONFIG.PUBLIC_URL}/styles.css`

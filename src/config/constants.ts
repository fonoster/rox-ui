import appConfig from '../../app.config.json'

export const APP_CONFIG = {
  WIDGET_ID: '__pf_assistant_widget__',
  SCRIPT_ID: 'pf-widget',
  PUBLIC_URL: appConfig.public_url,
}

export const PF_ACCESS_KEY = appConfig.access_key
export const __DEV__ = process.env.NODE_ENV === 'development'

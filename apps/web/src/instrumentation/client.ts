import axios from 'axios'
import { decode } from 'js-base64'

import { Instrumentation } from './types'

// TODO: Complete error handling
export async function getInstrumentation(
  instrumentationKey: string
): Promise<Instrumentation> {
  // Decodes the base64 string and parse to obtain a json object
  const d = JSON.parse(decode(instrumentationKey))
  // We thern call the instrumentation service wich expects a call like this:
  //  https://api.fononoster.io/instrumentation/ewogICJwcm9q...
  const result = await axios.get(
    `${d.instrumentationURL}/${instrumentationKey}`
  )
  return result.data
}

import { MESSAGES } from '../data/messages'
import { CONSTANT_CONFIG } from '../config'

/**
 * Fonoster Private Key
 *
 * @description Verify that the client script has the corresponding
 * Fonoster identifier and private key.
 */
export const getFonosterKey = () => {
  const script = document.querySelector(`script#${CONSTANT_CONFIG.SCRIPT_ID}`)
  if (!script) throw new Error(MESSAGES.ID_MISSING)

  const url = CONSTANT_CONFIG.IS_DEV
    ? CONSTANT_CONFIG.URL
    : script.getAttribute('src')

  const key = new URL(url as string).searchParams.get('key')

  if (!key) throw new Error(MESSAGES.KEY_MISSING)

  return key
}

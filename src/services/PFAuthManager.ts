import { __DEV__, APP_CONFIG, PF_ACCESS_KEY } from '../config'
import { ERROR_MESSAGES } from '../data'

/**
 * PF Authentication Manager
 *
 * @description Verify that the client script has the corresponding
 * Fonoster identifier and access key.
 *
 * @author Fonoster
 */
export class PFAuthManager {
  public static getKeyFromScript(scriptId = `script#${APP_CONFIG.SCRIPT_ID}`) {
    /**
     * Access key for development
     *
     * @throws If you don't use CI to build a production widget,
     * make sure you don't include this line.
     */
    if (__DEV__) return PF_ACCESS_KEY // @patch-line

    const script = document.querySelector(scriptId)
    if (!script) throw new Error(ERROR_MESSAGES.ID_MISSING)

    const key = new URL(script.getAttribute('src') as string).searchParams.get(
      'key'
    )
    if (!key) throw new Error(ERROR_MESSAGES.KEY_MISSING)

    return key
  }

  public isAuthorized() {
    throw new Error('This method has not been implemented')
  }
}

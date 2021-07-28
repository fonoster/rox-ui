import { useLayoutEffect } from 'preact/hooks'

import { APP_CONFIG } from '../config'

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
const STYLESHEET = 'styles.css'

/**
 * use Stylesheet
 *
 * @description When you use iframes, these interpose between the website and
 * your app, which causes the resource references of the main website to be lost.
 *
 * @author Fonoster
 */
export const useStylesheet = (doc?: Document | null) =>
  useLayoutEffect(() => {
    if (doc) {
      const href = `${APP_CONFIG.PUBLIC_URL}/${STYLESHEET}`

      const sheet = doc.createElement('link')
      sheet.rel = 'stylesheet'
      sheet.href = href

      doc?.head?.appendChild(sheet)
    }
  }, [doc])

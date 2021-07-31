import { ErrorNotSupported } from './MicrophoneErrors'
import type { MediaStreamConstraints } from './types'

/**
 * Browser Media
 *
 * @description It is an abstraction and a polyfill at the same time to interact with
 * the media objects of the current device, its functions allow to validate
 * the support of the APIs and obtain new instances of streams.
 *
 * @author Fonoster
 */
export class BrowserMedia {
  constructor(private constraints: MediaStreamConstraints) {}

  /**
   * Media Devices
   *
   * @throws Some browsers partially implement mediaDevices.
   * Here, we will just add the getUserMedia property if it's missing.
   */
  public async getStream(): Promise<MediaStream> {
    if (!navigator?.mediaDevices?.getUserMedia) {
      navigator['mediaDevices']['getUserMedia'] = this.getUserMedia
    }

    return navigator.mediaDevices.getUserMedia(this.constraints)
  }

  /**
   * Get User Media
   *
   * @description This method prompts the user for permission to use a media input.
   * For browser compatibility, the Navigator.getUserMedia method must be wrapped in a promise.
   */
  public async getUserMedia(): Promise<MediaStream> {
    if (!BrowserMedia.isSupported)
      return Promise.reject(new ErrorNotSupported())

    return new Promise((successCallback, errorCallback) =>
      BrowserMedia.media.call(
        navigator,
        this.constraints,
        successCallback,
        errorCallback
      )
    )
  }

  /**
   * Get media
   *
   * @description Try to find the getUserMedia method available in the current browser
   * based on its type and if it is supported.
   */
  public static get media() {
    return (
      navigator.getUserMedia ??
      navigator.webkitGetUserMedia ??
      navigator.mozGetUserMedia
    )
  }

  /**
   * Speech API browser support
   *
   * @description Get a boolean regarding the current browser's compatibility with the
   * APIs needed to implement the voice assistant.
   */
  public static get isSupported() {
    const isMediaSupported = typeof this.media === 'function'
    const isAudioSupported = Boolean(
      window.AudioContext || window.webkitAudioContext
    )

    return isMediaSupported && isAudioSupported
  }
}

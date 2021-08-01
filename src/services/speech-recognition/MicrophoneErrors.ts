/**
 * Microphone errors (Not started)
 *
 * @description Error to be thrown when the microphone was accessed before it was started.
 *
 * @author Fonoster
 */
export class ErrorNotStarted extends Error {
  constructor() {
    super(
      'The microphone is not receiving audio, call "start()" method to start receiving'
    )
  }
}

/**
 * Microphone errors (Not Supported)
 *
 * @description Error to be thrown when the device doesn't support the
 * Microphone instance's target audio APIs.
 *
 * @author Fonoster
 */
export class ErrorNotSupported extends Error {
  constructor() {
    super("This device doesn't support speech API")
  }
}

export class ErrorNotImplemented extends Error {
  constructor() {
    super("This method hasn't been implemented")
  }
}

/**
 * Microphone errors (Already started)
 *
 * @description Error to be thrown when the "start()" method of a
 * Microphone instance is called more than once.
 *
 * @author Fonoster
 */
export class ErrorAlreadyStarted extends Error {
  constructor() {
    super(
      'The microphone is already started, call "stop()" method before starting the microphone again.'
    )
  }
}

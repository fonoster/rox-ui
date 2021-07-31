/**
 * Microphone errors (Not initialized)
 *
 * @description Error to be thrown when the microphone was accessed before it was initialized.
 *
 * @author Fonoster
 */
export class ErrorMicroNotInitialized extends Error {
  constructor() {
    super('The microphone is not initialized')
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
 * Microphone errors (Already initialized)
 *
 * @description Error to be thrown when the initialize method of a
 * Microphone instance is called more than once.
 *
 * @author Fonoster
 */
export class ErrorAlreadyInitialized extends Error {
  constructor() {
    super(
      'The microphone is already initialized, call the "stop()" method before starting the microphone again.'
    )
  }
}

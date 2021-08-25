import { InstrumentationData } from './types'

/**
 * Instrumentation key is a JWT with in its payload has everything need to connect to the
 * instrumentation server, including the endpoint.
 *
 * @param instrumentationKey
 *
 * TODO: We need to determine how the instrumentation server will trust that client connection
 * comes from the correct domain.
 */
export function getInstrumentationData(
  instrumentationKey: string
): InstrumentationData {
  console.info(instrumentationKey)

  /**
   * This method obtains needs to obtain the domain from the browser.
   *
   * 1- Decodes the instrumentation key
   * 2- Sends the domain name to the instrumentation server defined in the instrumentation key
   * 3- Waits for the instrumentation data
   * 4- Fake instrumentation data
   */
  return {
    clientDisplayName: 'Pretty Roxanne',
    clientUsername: '1001',
    clientSecret: '1234',
    clientAOR: 'sip:1001@cola.fonoster.io',
    signalServer: 'ws://sip.fonoster.io:5062',
    eventsServer: 'ws://localhost:3001',
    targetAOR: 'sip:ast@node1',
    didInfo: '9842753568',
  }
}

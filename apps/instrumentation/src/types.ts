/**
 * Interface with all the information roxanne needs to operate
 */
export interface InstrumentationData {
  signalServer: string
  eventsServer: string
  targetAOR: string
  didInfo: string
  clientDisplayName: string
  clientUsername: string
  clientSecret: string
  clientAOR: string
}

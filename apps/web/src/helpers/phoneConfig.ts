import { WPhoneConfig } from 'wphone'

import { Instrumentation } from '../instrumentation/types'

export function createWPhoneConfig(
  instrumentation: Instrumentation,
  audioElementId: string
): WPhoneConfig {
  return {
    displayName: instrumentation.clientDisplayName,
    domain: instrumentation.sipDomain,
    username: instrumentation.clientUsername,
    secret: instrumentation.clientSecret,
    audioElementId: audioElementId,
    server: instrumentation.signalServer,
  }
}

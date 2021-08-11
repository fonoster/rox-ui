import { InstrumentationData } from '@rox/instrumentation'
import {
  Inviter,
  SessionState,
  URI,
  UserAgent,
  UserAgentDelegate,
  UserAgentOptions,
  Web,
} from 'sip.js'

import { InviterConfig } from './types'

export function getAudio(id: string): HTMLAudioElement {
  const el = document.getElementById(id)

  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`)
  }

  return el
}

export function createInviter(inviterParam: InviterConfig): Inviter {
  const target = UserAgent.makeURI(inviterParam.targetAOR) as URI
  const inviter = new Inviter(inviterParam.userAgent, target, {
    extraHeaders: [`X-DID-Info: ${inviterParam.didInfo}`],
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false,
      },
    },
  })

  inviter.stateChange.addListener((state: SessionState) => {
    console.log(`Session state changed to ${state}`)
    switch (state) {
      case SessionState.Initial:
        break
      case SessionState.Establishing:
        break
      case SessionState.Established: {
        const sessionDescriptionHandler =
          inviter.sessionDescriptionHandler as Web.SessionDescriptionHandler
        assignStream(
          sessionDescriptionHandler.remoteMediaStream,
          inviterParam.audioElement
        )
        sessionDescriptionHandler.peerConnectionDelegate = {
          // NOTE:: SB - Allowing to get onTrack events to know when a new track added to the peer connection.
          // When we get a new track event, we'll assign the last new remote media stream to HTML audio element source.
          // Mostly will occur when RE-INVITEs will happen.
          ontrack(/* event: Event */) {
            assignStream(
              sessionDescriptionHandler.remoteMediaStream,
              inviterParam.audioElement
            )
          },
        }
        break
      }
      case SessionState.Terminating:
      // fall through
      case SessionState.Terminated:
        // cleanupMedia();
        console.log('')
        break
      default:
        throw new Error('Unknown session state.')
    }
  })

  return inviter
}

export function getUserAgentOptions(
  inst: InstrumentationData,
  delegate: UserAgentDelegate
): UserAgentOptions {
  return {
    uri: UserAgent.makeURI(inst.clientAOR),
    delegate,
    displayName: inst.clientDisplayName,
    authorizationUsername: inst.clientUsername,
    authorizationPassword: inst.clientSecret,
    transportOptions: {
      server: inst.signalServer,
    },
  }
}

// Assign a MediaStream to an HTMLMediaElement and update if tracks change.
export function assignStream(
  stream: MediaStream,
  element: HTMLMediaElement
): void {
  // Set element source.
  element.autoplay = true // Safari does not allow calling .play() from a non user action
  element.srcObject = stream

  // Load and start playback of media.
  element.play().catch((error: Error) => {
    console.error('Failed to play media')
    console.error(error)
  })

  // If a track is added, load and restart playback of media.
  stream.onaddtrack = (): void => {
    element.load() // Safari does not work otheriwse
    element.play().catch((error: Error) => {
      console.error('Failed to play remote media on add track')
      console.error(error)
    })
  }

  // If a track is removed, load and restart playback of media.
  stream.onremovetrack = (): void => {
    element.load() // Safari does not work otheriwse
    element.play().catch((error: Error) => {
      console.error('Failed to play remote media on remove track')
      console.error(error)
    })
  }
}

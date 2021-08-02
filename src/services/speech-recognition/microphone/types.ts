export type TGetUserMedia = typeof navigator.getUserMedia

export type MediaStreamConstraints = Parameters<TGetUserMedia>[0]

export enum SpeechPermission {
  DENIED = 'denied',
  GRANTED = 'granted',
  PROMPT = 'prompt',
}

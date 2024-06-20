export enum ESendSign {
  FIRST_STEP = 1,
  SECOND_STEP = 2,
  THIRD_STEP = 3,
  FOURTH_STEP = 4
}

export interface ISendSignSecondStep {
  id?: string | number
  status?: number
  name: string
  email: string
  type: string
}

export interface Email {
  email: string
  expired_date: string
  content: string
}

export interface Receiver {
  email: string
  name: string
  type: number
  status?: number
}

export interface Position {
  width: number
  height: number
  top: number
  left: number
}

export interface SignatureData {
  id: number
  path: string
  name: string
}

export interface RequiredSignature {
  receiver_email: string
}

export interface Signature {
  id?: number
  position: Position
  data?: SignatureData | RequiredSignature | String | any
  type: number
  page: number
  scale: number
  can_resize: boolean
  receiver?: Receiver
  receiverId?: number
}

// export interface SendForSignature extends Signature {
//   receiver: Receiver
//   receiverId: number
// }

export interface Canvas {
  height: number
  width: number
}
export interface SignOwn {
  signatures: Array<Signature>
  canvas: Canvas
}

export enum SIGNATURE_TYPE {
  IMAGE = 1,
  DATE = 2,
  TEXT = 3,
  CHECKBOX = 4,
  RADIO = 5,
  SIGNATURE = 6,
  REQUIRED = 7
}

export interface BackgroundColors {
  0: string
  1: string
  2: string
  3: string
  4: string
}

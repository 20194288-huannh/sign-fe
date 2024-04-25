export enum ESendSign {
  FIRST_STEP = 1,
  SECOND_STEP = 2,
  THIRD_STEP = 3,
  FOURTH_STEP = 4
}

export interface ISendSignSecondStep {
  id: string | number
  name: string
  email: string
  type: string
}

export interface Receiver {
  email: string
  expired_date: string
  content: string
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

export interface Signature {
  position: Position
  data: SignatureData
  type: number
  page: number
  scale: number
}

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
}

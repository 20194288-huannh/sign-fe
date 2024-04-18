export interface Document {
    id: string
    sha256: string
    status: number
    user_id: number
    receiver: number
    parent_id: number
    file: FileInfo
    requested_on: string
}

export interface FileInfo {
    id: number
    name: string
    path: string
    size: number
    type: string
}

export enum Status {
    NEEDS_REVIEW = 0,
    DRAFT = 1,
    SENT = 2,
    COMPLETED = 3,
    IN_PROGRESS = 4,
    EXPIRED = 5,
    VOID = 6
}
  
  
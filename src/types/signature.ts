export interface SignatureImage {
  id?: string | number
  user: string
  sha256_original_file: string
  priority: string
  type: string
  file?: SignatureImageFile
}

export interface SignatureImageFile {
  id?: string | number
  name: string
  path: string
  size: string
  type: string
}

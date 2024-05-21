import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

export const useFileStore = defineStore('file', () => {
  function readFileAsArrayBuffer(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsArrayBuffer(file)
    })
  }

  function arrayBufferToBytes(arrayBuffer: Array<number>) {
    const uint8Array = new Uint8Array(arrayBuffer)
    return Array.from(uint8Array)
  }

  function bytesToArrayBuffer(bytes: any): BufferSource {
    const uint8Array = new Uint8Array(bytes)
    return uint8Array.buffer
  }

  function convertBytesStringToBufferSource(bytesString: string) {
    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(bytesString)
    return uint8Array.buffer // ArrayBuffer, which is a BufferSource
  }

  
function arrayBufferToWordArray(arrayBuffer) {
  var i8a = new Uint8Array(arrayBuffer)
  var a = []
  for (var i = 0; i < i8a.length; i += 4) {
    a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}

  return {
    readFileAsArrayBuffer,
    arrayBufferToBytes,
    bytesToArrayBuffer,
    convertBytesStringToBufferSource,
    arrayBufferToWordArray
  }
})

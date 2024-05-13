import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  return { readFileAsArrayBuffer, arrayBufferToBytes, bytesToArrayBuffer }
})

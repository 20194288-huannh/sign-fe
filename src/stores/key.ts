import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKeyStore = defineStore('key', () => {
  const key = ref('')

  function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  async function importPrivateKey(pem: string): Promise<CryptoKey> {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length - 1,
    );
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    return await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["decrypt"],
    );
  }

  async function importSignKey(pem: string): Promise<CryptoKey> {
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pem);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    return await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      { name: 'ECDSA', namedCurve: 'P-384' },
      true,
      ["sign"],
    );
  }

  async function importPublicKey(pem: string): Promise<CryptoKey> {
    // fetch the part of the PEM string between header and footer
    // const pemHeader = "-----BEGIN PUBLIC KEY-----";
    // const pemFooter = "-----END PUBLIC KEY-----";
    // const pemContents = pem.substring(
    //   pemHeader.length,
    //   pem.length - pemFooter.length - 1,
    // );
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pem);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
    return window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"],
    );
  }

  async function importVerifyKey(pem: string): Promise<CryptoKey> {
    // fetch the part of the PEM string between header and footer
    // const pemHeader = "-----BEGIN PUBLIC KEY-----";
    // const pemFooter = "-----END PUBLIC KEY-----";
    // const pemContents = pem.substring(
    //   pemHeader.length,
    //   pem.length - pemFooter.length - 1,
    // );
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pem);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
    return window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      { name: 'ECDSA', namedCurve: 'P-384' },
      true,
      ["verify"],
    );
  }

  function compareArrayBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
    // Check if the byte lengths are different
    if (buffer1.byteLength !== buffer2.byteLength) {
      return false;
    }

    // Create typed arrays from the buffers
    const view1 = new Uint8Array(buffer1);
    const view2 = new Uint8Array(buffer2);

    // Iterate over each byte and compare
    for (let i = 0; i < view1.length; i++) {
      if (view1[i] !== view2[i]) {
        return false;
      }
    }

    // If all bytes are the same, return true
    return true;
  }

  return { key, importPrivateKey, importPublicKey, compareArrayBuffers, importSignKey, importVerifyKey }
})

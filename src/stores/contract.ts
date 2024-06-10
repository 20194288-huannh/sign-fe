import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ethers, type Contract } from 'ethers'
import SignSystemAbi from '@/contracts/artifacts/contracts/SignSystem.sol/SignSystem.json'

export const useContractStore = defineStore('contract', () => {
  const signSystemContractAddress = import.meta.env.VITE_SIGN_SYSTEM_CONTRACT || ''
  const signer = ref()
  const contract = ref<Contract>()
  const contractWithSigner = ref<Contract>()

  const initContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const tempContract = new ethers.Contract(signSystemContractAddress, SignSystemAbi.abi, provider)
    // Contract reference
    contract.value = tempContract
    contractWithSigner.value = tempContract.connect(signer)
    // documentRegistryContract.value.on(
    //   'DocumentUploaded',
    //   async (uploader, originalHash, hashByPrivateKey, timestamp) => {
    //     // Handle the event data here
    //     console.log('New document uploaded:')
    //     console.log('Uploader:', uploader)
    //     console.log('Original Hash:', originalHash)
    //     console.log('Hash by Private Key:', hashByPrivateKey)
    //     console.log('Timestamp:', timestamp)
    //     // Add the document to your documents array or perform other actions
    //     documents.push({
    //       uploader,
    //       originalHash,
    //       hashByPrivateKey,
    //       timestamp
    //     });
    //   }
    // )
  }

  return { contract, contractWithSigner, initContract }
})

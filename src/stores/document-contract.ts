import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ethers, type Contract } from 'ethers'
import DocumentRegistryAbi from '@/contracts/artifacts/contracts/DocumentRegistry.sol/DocumentRegistry.json'

export const useDocumentContractStore = defineStore('document-contract', () => {
  const documentRegistryContractAddress = import.meta.env.VITE_DOCUMENT_REGISTRY_CONTRACT || ''
  const signer = ref()
  const documentRegistryContract = ref<Contract>()
  const documentRegistryContractWithSigner = ref<Contract>()

  const initContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      documentRegistryContractAddress,
      DocumentRegistryAbi.abi,
      provider
    )
    // Contract reference
    documentRegistryContract.value = contract
    documentRegistryContractWithSigner.value = contract.connect(signer)
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

  return { documentRegistryContractWithSigner, documentRegistryContract, initContract }
})

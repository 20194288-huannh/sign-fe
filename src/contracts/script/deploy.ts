const hre = require('hardhat')
const main = async () => {
  // name of the contract should match with the file name!!
  const documentRegistryContractFactory = await hre.ethers.getContractFactory('DocumentRegistry')
  const documentRegistryContract = await documentRegistryContractFactory.deploy({})

  await documentRegistryContract.deployed()

  console.log('documentRegistryContract address: ', documentRegistryContract.address)

  // name of the contract should match with the file name!!
  const userRegistryContractFactory = await hre.ethers.getContractFactory('UserRegistry')
  const userRegistryContract = await userRegistryContractFactory.deploy({})

  await userRegistryContract.deployed()

  console.log('documentRegistryContract address: ', userRegistryContract.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()

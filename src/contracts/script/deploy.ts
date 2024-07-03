const hre = require('hardhat')
const main = async () => {
  // name of the contract should match with the file name!!
  const contractFactory = await hre.ethers.getContractFactory('SignSystem')
  const contract = await contractFactory.deploy({})

  console.log('documentRegistryContract address: ', contract.address)
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

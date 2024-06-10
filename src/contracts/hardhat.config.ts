import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const ALCHEMY_API_KEY = 'VBUGPeXqHvfInYnIPxyfmyYRcETHmpXC'
const SEPOLIA_PRIVATE_KEY = 'e4744f62fe22d8223e14be9a0a36055177782396b1ec7f43804b92dac7e313f6'
const config: HardhatUserConfig = {
  solidity: '0.8.24',

  paths: {
    sources: './contracts',
    artifacts: './artifacts'
  },
  networks: {
    // hardhat: {
    //   chainId: 1337
    // }
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/VBUGPeXqHvfInYnIPxyfmyYRcETHmpXC`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
}

export default config

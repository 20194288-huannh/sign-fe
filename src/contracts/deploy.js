const main = async () => {
  // name of the contract should match with the file name!!
  const msgContractFactory = await hre.ethers.getContractFactory(
    'MessagePortal'
  );
  const msgContract = await msgContractFactory.deploy({});
  await msgContract.deployed();
  console.log('msgPortal address: ', msgContract.address);

  const blockSigContractFactory = await hre.ethers.getContractFactory('BlockSig');
  const blockSigContract = await blockSigContractFactory.deploy({});
  await blockSigContract.deployed();
  console.log('BlockSig address: ', blockSigContract.address);

  // Deploy Ownable contract
  const ownableContractFactory = await hre.ethers.getContractFactory('Ownable');
  const ownableContract = await ownableContractFactory.deploy({});
  await ownableContract.deployed();
  console.log('Ownable address: ', ownableContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
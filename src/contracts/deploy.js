const main = async () => {
    // name of the contract should match with the file name!!
    const msgContractFactory = await hre.ethers.getContractFactory(
      'MessagePortal'
    );
    const msgContract = await msgContractFactory.deploy({});
  
    await msgContract.deployed();
  
    console.log('msgPortal address: ', msgContract.address);
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
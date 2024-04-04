import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BlockSigModule = buildModule("BlockSigModule", (m) => {
    const blockSig = m.contract("BlockSig", []);
    
    return { blockSig };
});

export default BlockSigModule;
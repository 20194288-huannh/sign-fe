import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OwnableModule = buildModule("OwnableModule", (m) => {
    const ownable = m.contract("Ownable", []);
    
    return { ownable };
});

export default OwnableModule;
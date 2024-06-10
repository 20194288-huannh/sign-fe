import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SignSystemModule = buildModule("SignSystemModule", (m) => {
    const signSystem = m.contract("SignSystem", []);
    
    return { signSystem };
});

export default SignSystemModule;
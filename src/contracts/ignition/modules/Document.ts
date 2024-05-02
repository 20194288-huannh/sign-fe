import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DocumentModule = buildModule("DocumentModule", (m) => {
    const document = m.contract("Document", []);
    
    return { document };
});

export default DocumentModule;
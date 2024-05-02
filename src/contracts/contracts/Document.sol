/*
 * Signature Smart Contract.
 * Copyright BlockVigil, Inc..
 * Code released under the MIT license.
*/

pragma solidity ^0.8.17;

contract Document {
    enum currentState {pending, signed, notarized, canceled}

    struct Doc {
        uint256 createdAt;
        uint256 completedTime;
        currentState status;
        string createdBy;
        bytes32 prevHash;
    }

    mapping (bytes32 => Doc) documents;

    event Created(bytes32 hash);

    function createDoc(bytes32 hash, string memory email, bytes32 prevHash) public {
        if (prevHash != bytes32(0)){
            documents[hash].prevHash = prevHash;
        }
        documents[hash].createdAt = block.timestamp;
        documents[hash].completedTime = block.timestamp;
        documents[hash].status = currentState.signed;
        documents[hash].createdBy = email;
        emit Created(hash);
    }

    function getDoc(bytes32 hash) public view returns (
        uint256 createdAt,
        uint256 completedTime,
        currentState status,
        string memory createdBy,
        bytes32 prevHash
    ) {
        createdAt = documents[hash].createdAt;
        completedTime = documents[hash].completedTime;
        status = documents[hash].status;
        createdBy = documents[hash].createdBy;
        prevHash = documents[hash].prevHash;
    }
}
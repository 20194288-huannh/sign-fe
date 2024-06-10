// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SignSystem {
  struct User {
    bytes verifyKey;
    bytes encryptKey;
    string email;
  }

  struct Document {
    address uploader;
    bytes originalHash;
    bytes hashByPrivateKey;
    uint256 timestamp;
  }

  mapping(address => User) private userList;
  mapping(bytes32 => Document) private documentList;

  function createUser(
    bytes calldata _verifyKey,
    bytes calldata _encryptKey,
    string calldata _email
  ) public payable returns (bool) {
    require(userList[msg.sender].verifyKey.length == 0, 'User already exists');

    userList[msg.sender].verifyKey = _verifyKey;
    userList[msg.sender].encryptKey = _encryptKey;
    userList[msg.sender].email = _email;

    return true;
  }

  function getUser(
    address _userAddress
  ) public view returns (bytes memory verifyKey, bytes memory encryptKey, string memory email) {
    return (
      userList[_userAddress].verifyKey,
      userList[_userAddress].encryptKey,
      userList[_userAddress].email
    );
  }

  function uploadDocument(
    bytes calldata _originalHash,
    bytes calldata _hashByPrivateKey
  ) public payable returns (bool) {
    bytes32 originalHashKey = keccak256(_originalHash);
    require(documentList[originalHashKey].uploader == address(0), 'Document already exists');

    Document memory newDocument = Document(
      msg.sender,
      _originalHash,
      _hashByPrivateKey,
      block.timestamp
    );
    documentList[originalHashKey] = newDocument;

    return true;
  }

  function getDocument(
    bytes calldata _originalHash
  ) public view returns (address, bytes memory, bytes memory, uint256) {
    bytes32 originalHashKey = keccak256(_originalHash);
    require(documentList[originalHashKey].uploader != address(0), 'Document does not exist');

    Document memory doc = documentList[originalHashKey];
    return (doc.uploader, doc.originalHash, doc.hashByPrivateKey, doc.timestamp);
  }
}

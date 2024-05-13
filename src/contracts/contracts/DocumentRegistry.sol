/*
 * Signature Smart Contract.
 * Copyright BlockVigil, Inc..
 * Code released under the MIT license.
 */
pragma solidity ^0.8.0;

contract DocumentRegistry {
  struct Document {
    address uploader;
    bytes32 originalHash;
    bytes32 hashByPrivateKey;
    uint256 timestamp;
  }

  mapping(bytes32 => Document) public documents;

  event DocumentUploaded(
    address indexed uploader,
    bytes32 originalHash,
    bytes32 hashByPrivateKey,
    uint256 timestamp
  );

  function uploadDocument(bytes32 _originalHash, bytes32 _hashByPrivateKey) public {
    require(documents[_originalHash].uploader == address(0), 'Document already exists');

    Document memory newDocument = Document(
      msg.sender,
      _originalHash,
      _hashByPrivateKey,
      block.timestamp
    );
    documents[_originalHash] = newDocument;

    emit DocumentUploaded(msg.sender, _originalHash, _hashByPrivateKey, block.timestamp);
  }

  function getDocument(
    bytes32 _originalHash
  ) public view returns (address, bytes32, bytes32, uint256) {
    require(documents[_originalHash].uploader != address(0), 'Document does not exist');

    Document memory doc = documents[_originalHash];
    return (doc.uploader, doc.originalHash, doc.hashByPrivateKey, doc.timestamp);
  }
}

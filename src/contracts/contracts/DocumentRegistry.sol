/*
 * Signature Smart Contract.
 * Copyright BlockVigil, Inc..
 * Code released under the MIT license.
 */
pragma solidity ^0.8.0;

contract DocumentRegistry {
  struct Document {
    address uploader;
    string fileName;
    string hash;
    uint256 timestamp;
  }

  mapping(string => Document) private documents;

  event DocumentUploaded(address indexed uploader, string fileName, string hash, uint256 timestamp);

  function uploadDocument(string memory _fileName, string memory _hash) public {
    require(bytes(documents[_hash].hash).length == 0, 'Document already exists');

    Document memory newDocument = Document(msg.sender, _fileName, _hash, block.timestamp);
    documents[_hash] = newDocument;

    emit DocumentUploaded(msg.sender, _fileName, _hash, block.timestamp);
  }

  function verifyDocument(
    string memory _hash
  ) public view returns (address, string memory, uint256) {
    require(bytes(documents[_hash].hash).length != 0, 'Document does not exist');

    Document memory document = documents[_hash];
    return (document.uploader, document.fileName, document.timestamp);
  }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
  struct Document {
    address uploader;
    bytes originalHash;
    bytes hashByPrivateKey;
    uint256 timestamp;
  }

  // Chúng ta vẫn dùng bytes32 làm key để tránh vấn đề về kích thước dữ liệu và chi phí lưu trữ
  mapping(bytes32 => Document) public documents;

  event DocumentUploaded(
    address indexed uploader,
    bytes originalHash,
    bytes hashByPrivateKey,
    uint256 timestamp
  );

  function uploadDocument(bytes calldata _originalHash, bytes calldata _hashByPrivateKey) public {
    bytes32 originalHashKey = keccak256(_originalHash);
    require(documents[originalHashKey].uploader == address(0), 'Document already exists');

    Document memory newDocument = Document(
      msg.sender,
      _originalHash,
      _hashByPrivateKey,
      block.timestamp
    );
    documents[originalHashKey] = newDocument;

    emit DocumentUploaded(msg.sender, _originalHash, _hashByPrivateKey, block.timestamp);
  }

  function getDocument(
    bytes calldata _originalHash
  ) public view returns (address, bytes memory, bytes memory, uint256) {
    bytes32 originalHashKey = keccak256(_originalHash);
    require(documents[originalHashKey].uploader != address(0), 'Document does not exist');

    Document memory doc = documents[originalHashKey];
    return (doc.uploader, doc.originalHash, doc.hashByPrivateKey, doc.timestamp);
  }
}

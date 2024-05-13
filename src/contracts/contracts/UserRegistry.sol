// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract UserRegistry {
  struct UserInfo {
    bytes verifyKey;
    bytes encryptKey;
    string email;
  }

  mapping(address => UserInfo) public users;

  // Event để thông báo khi một user mới được thêm vào hoặc thông tin của user được cập nhật
  event UserUpdated(address indexed user, bytes verifyKey, bytes encryptKey, string email);

  // Hàm để tạo mới hoặc cập nhật thông tin của một user
  function createUser(
    bytes calldata _verifyKey,
    bytes calldata _encryptKey,
    string calldata _email
  ) public {
    require(users[msg.sender].verifyKey.length == 0, 'User already exists');

    users[msg.sender].verifyKey = _verifyKey;
    users[msg.sender].encryptKey = _encryptKey;
    users[msg.sender].email = _email;
    emit UserUpdated(msg.sender, _verifyKey, _encryptKey, _email);
  }

  // Hàm để lấy thông tin của một user
  function getUser(
    address _user
  ) public view returns (bytes memory verifyKey, bytes memory encryptKey, string memory email) {
    return (users[_user].verifyKey, users[_user].encryptKey, users[_user].email);
  }
}

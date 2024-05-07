pragma solidity ^0.8.0;

contract UserRegistry {
    struct UserInfo {
        bytes publicKey;
        string email;
    }

    mapping(address => UserInfo) public users;

    // Event để thông báo khi một user mới được thêm vào hoặc thông tin của user được cập nhật
    event UserUpdated(address indexed user, bytes publicKey, string email);

    // Hàm để cập nhật thông tin của một user
    function updateUser(bytes calldata _publicKey, string calldata _email) public {
        users[msg.sender].publicKey = _publicKey;
        users[msg.sender].email = _email;
        emit UserUpdated(msg.sender, _publicKey, _email);
    }

    // Hàm để lấy thông tin của một user
    function getUser(address _user) public view returns (bytes memory publicKey, string memory email) {
        return (users[_user].publicKey, users[_user].email);
    }
}
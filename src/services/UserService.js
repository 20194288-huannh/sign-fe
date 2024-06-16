import ApiService from './ApiService';
const UserService  = {
    getDocumentById(data) {
        return ApiService.post('users/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    verifyPrivateKey (data) {
        return ApiService.post('users/key', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    getUserByEmail (data) {
        return ApiService.get('users/email', data)
    }
}
export default UserService
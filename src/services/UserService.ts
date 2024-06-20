import ApiService from './ApiService'
const UserService = {
  getDocumentById(data: any) {
    return ApiService.post('users/save', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  save(data: any) {
    return ApiService.post('documents/save', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  verifyPrivateKey(data: any) {
    return ApiService.post('users/key', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getUserByEmail(data: any) {
    return ApiService.get('users/email', data)
  }
}
export default UserService

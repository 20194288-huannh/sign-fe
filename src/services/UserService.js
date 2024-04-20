import ApiService from './ApiService';
const UserService  = {
    getDocumentById(data) {
        return ApiService.post('users/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
}
export default DocumentService
import ApiService from './ApiService';
const DocumentService  = {
    create(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    getByUserId(id) {
        return ApiService.get(`users/${id}/documents`)
    },
    signOwn(id, data) {
        return ApiService.post(`documents/${id}/sign-own`, data)
    },
    sendSign(id, data) {
        return ApiService.post(`documents/${id}/send-sign`, data)
    }
}
export default DocumentService
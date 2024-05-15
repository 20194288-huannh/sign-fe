import ApiService from './ApiService';
const DocumentService  = {
    create(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    getByUserId(id, data) {
        return ApiService.get(`users/${id}/documents`, data)
    },
    signOwn(id, data) {
        return ApiService.post(`documents/${id}/sign-own`, data, { responseType: 'blob' })
    },
    getStatistics() {
        return ApiService.get(`documents/statistics`)
    },
    sendSign(id, data) {
        return ApiService.post(`documents/${id}/send-sign`, data)
    },
    sign(id, data) {
        return ApiService.post(`documents/${id}/sign`, data)
    },
    saveSignOwn(data) {
        return ApiService.post(`documents/sign-own`, data, {headers : { 'Content-Type': 'multipart/form-data'}})
    }
}
export default DocumentService
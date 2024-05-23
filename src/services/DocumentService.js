import ApiService from './ApiService';
const DocumentService  = {
    create(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    find(id) {
        return ApiService.get(`documents/${id}`)
    },
    getByUserId(data) {
        return ApiService.get(`users/documents`, data)
    },
    signOwn(id, data) {
        return ApiService.post(`documents/${id}/view-own`, data, { responseType: 'blob' })
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
    saveSignOwn(id, data) {
        return ApiService.post(`documents/${id}/sign-own`, data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    fetchHistory(sha) {
        return ApiService.post(`documents/${sha}/history`)
    },
    getActionsOfDocument(sha) {
        return ApiService.get(`documents/${sha}/actions`)
    }
}
export default DocumentService
import ApiService from './ApiService';
const DocumentService  = {
    create(data: any) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    save(data: any) {
        return ApiService.post('documents/save', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    find(id: number) {
        return ApiService.get(`documents/${id}`)
    },
    getByUserId(data: any) {
        return ApiService.get(`users/documents`, data)
    },
    signOwn(id: number, data: any) {
        return ApiService.post(`documents/${id}/view-own`, data, { responseType: 'blob' })
    },
    getStatistics() {
        return ApiService.get(`documents/statistics`)
    },
    sendSign(id: number, data: any) {
        return ApiService.post(`documents/${id}/send-sign`, data)
    },
    sign(id: number, data: any) {
        return ApiService.post(`documents/${id}/sign`, data)
    },
    saveSignOwn(id: number, data: any) {
        return ApiService.post(`documents/${id}/sign-own`, data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    fetchHistory(sha: string) {
        return ApiService.post(`documents/${sha}/history`, {})
    },
    getActionsOfDocument(id: number) {
        return ApiService.get(`documents/${id}/actions`)
    }
}
export default DocumentService
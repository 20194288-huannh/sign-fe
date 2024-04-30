import ApiService from './ApiService';
const RequestService  = {
    get(id) {
        return ApiService.get(`requests/${id}`)
    }
}
export default RequestService
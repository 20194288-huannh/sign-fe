import ApiService from './ApiService';
const RequestService  = {
    get(token) {
        return ApiService.get(`requests`, {token: token})
    }
}
export default RequestService
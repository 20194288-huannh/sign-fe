import ApiService from './ApiService';
const RequestService  = {
    get(token: string) {
        return ApiService.get(`requests`, {token: token})
    }
}
export default RequestService
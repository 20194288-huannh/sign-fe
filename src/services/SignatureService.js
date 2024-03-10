import ApiService from './ApiService';
const SignatureService  = {
    create(data) {
        return ApiService.post('signatures', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
}
export default SignatureService
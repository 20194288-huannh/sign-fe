import ApiService from './ApiService';
const SignatureService  = {
    create(data: any) {
        return ApiService.post('signatures', data, {headers : { 'Content-Type': 'multipart/form-data'}})
    },
    listByUser() {
        return ApiService.get('signatures')
    },
    delete(id: number) {
        return ApiService.delete(`signatures/${id}`)
    }
}
export default SignatureService
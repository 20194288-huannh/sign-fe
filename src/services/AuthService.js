import ApiService from './ApiService';
const AuthService  = {
    signIn(data) {
        return ApiService.post('auth/login', data)
    },
}
export default AuthService
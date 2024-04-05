import ApiService from './ApiService';
const AuthService  = {
    signIn(data) {
        return ApiService.post('auth/login', data)
    },

    signUp(data) {
        return ApiService.post('auth/register', data)
    }
}
export default AuthService
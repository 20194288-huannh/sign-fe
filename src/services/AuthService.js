import ApiService from './ApiService';
const AuthService  = {
    signIn(data) {
        return ApiService.post('auth/login', data)
    },

    signUp(data) {
        return ApiService.post('auth/sign-up', data)
    }
}
export default AuthService
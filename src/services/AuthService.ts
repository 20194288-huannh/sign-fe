import ApiService from './ApiService';
const AuthService  = {
    signIn(data: any) {
        return ApiService.post('auth/login', data)
    },

    verify(data: any) {
        return ApiService.post('auth/verify', data)
    },

    signUp(data: any) {
        return ApiService.post('auth/register', data)
    }
}
export default AuthService
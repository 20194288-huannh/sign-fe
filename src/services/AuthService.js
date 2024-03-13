import ApiService from './ApiService';
const AuthService  = {
    signIn(data) {
        return ApiService.post('auth/sign-in', data)
    },
}
export default AuthService
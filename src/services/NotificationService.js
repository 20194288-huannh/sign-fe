import ApiService from './ApiService';
const NotificationService  = {
    getAll(id) {
        return ApiService.get(`notifications`)
    }
}
export default NotificationService
import ApiService from './ApiService';
const NotificationService  = {
    getAll(id) {
        return ApiService.get(`notifications`)
    },
    delete(id) {
        return ApiService.delete(`notifications/${id}`)
    },
}
export default NotificationService
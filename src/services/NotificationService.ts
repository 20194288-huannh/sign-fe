import ApiService from './ApiService';
const NotificationService = {
  getAll(id: number) {
    return ApiService.get(`notifications`)
  },
  delete(id: number) {
    return ApiService.delete(`notifications/${id}`)
  }
}
export default NotificationService

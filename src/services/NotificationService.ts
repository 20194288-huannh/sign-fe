import ApiService from './ApiService'
const NotificationService = {
  getAll() {
    return ApiService.get(`notifications`)
  },
  delete(id: number) {
    return ApiService.delete(`notifications/${id}`)
  }
}
export default NotificationService

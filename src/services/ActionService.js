import ApiService from './ApiService';
const ActionService  = {
    get() {
        return ApiService.get('actions')
    }
}
export default ActionService
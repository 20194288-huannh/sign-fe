import ApiService from './ApiService';
const FileService  = {
    download(id) {
        return ApiService.get(`files/${id}`)
    }
}
export default FileService
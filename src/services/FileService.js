import ApiService from './ApiService';
const FileService  = {
    download(id) {
        return ApiService.get(`files/${id}`, [], { responseType: 'blob' })
    }
}
export default FileService
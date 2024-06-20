import ApiService from './ApiService';
const FileService  = {
    download(id: number) {
        return ApiService.get(`files/${id}`, [], { responseType: 'blob' })
    }
}
export default FileService
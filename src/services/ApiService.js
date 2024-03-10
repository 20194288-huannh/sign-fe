import axios from 'axios'
let activeRequests = 0;
const ApiService = {
    init() {
        axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
        // intercept every request
        axios.interceptors.request.use(
            (request) => {
                if (activeRequests === 0) {
                    // userStore().setLoading();
                }
                activeRequests++;
                const accessToken = localStorage.getItem('__TOKEN');
                if (accessToken) {
                    request.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return request
            },
            (error) => {
                activeRequests--;
                const { response } = error;
                // Do something with request error
                if (activeRequests === 0) {
                    // userStore().finishLoading();
                }
                return Promise.reject(response)
            }
        )
        axios.interceptors.response.use(
            (response) => {
                activeRequests--;
                // const {config} = response;
                if (activeRequests === 0) {
                    // userStore().finishLoading();
                }
                return response
            },
            (error) => {
                const { response, config } = error;
                // check if config errorHandler is on
                if (config?.globalErrorHandler?.on) {
                    // service.handleError(response, config.globalErrorHandler.exclude)
                }
                // userStore().finishLoading()
                return Promise.reject(response)
            }
        )
    },
    get(resource, params = {}, config = {}) {
        return axios.get(resource, {
            ...config,
            params: params,
        });
    },
    post(resource, params, config = {}) {
        return axios.post(`${resource}`, params, config)
    },
    update(resource, params, config = {}) {
        return axios.put(resource, params, config)
    },
    updateBulk(resource, params, config = {}) {
        return axios.put(resource, params, config)
    },
    delete(resource, config = {}) {
        return axios.delete(resource, config)
    },
    setHeader: function () {
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.globalErrorHandler = {
            on: true,
            exclude: [],
        };
    }
}

export default ApiService
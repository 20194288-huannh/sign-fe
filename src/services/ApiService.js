import axios from 'axios'
let activeRequests = 0;
const baseDomain = import.meta.env.VITE_API_URL;

const baseURL = `${baseDomain}`;
const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json"
    }
});
const ApiService = {
    init() {
        instance.interceptors.request.use(
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
        instance.interceptors.response.use(
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
        return instance.get(resource, {
            ...config,
            params: params,
        });
    },
    post(resource, params, config = {}) {
        return instance.post(`${resource}`, params, config)
    },
    update(resource, params, config = {}) {
        return instance.put(resource, params, config)
    },
    updateBulk(resource, params, config = {}) {
        return instance.put(resource, params, config)
    },
    delete(resource, config = {}) {
        return instance.delete(resource, config)
    },
    setHeader: function () {
        instance.defaults.withCredentials = false;
        instance.defaults.headers.common['Content-Type'] = 'application/json';
        instance.defaults.headers.common['Accept'] = 'application/json';
        instance.defaults.globalErrorHandler = {
            on: true,
            exclude: [],
        };
    }
}

export default ApiService
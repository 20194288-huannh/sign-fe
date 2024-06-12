import axios from 'axios'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router';
import { storeToRefs } from 'pinia'

let activeRequests = 0;
const baseDomain = import.meta.env.VITE_APP_BASE_URL;
const userStore = useUserStore() 
const { user, token } = storeToRefs(userStore)

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
instance.interceptors.request.use(
    (request) => {
        if (token) {
            console.log(token.value)
            request.headers['Authorization'] = `Bearer ${token.value}`;
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
        if (error.response.status === 404) {
            router.push({name: 'NotFound'})
        }
        console.log(error.response)
        const { response, config } = error;
        // check if config errorHandler is on
        if (config?.globalErrorHandler?.on) {
            // service.handleError(response, config.globalErrorHandler.exclude)
        }
        // userStore().finishLoading()
        return Promise.reject(response)
    }
)
const ApiService = {
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
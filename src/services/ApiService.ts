import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'

let activeRequests = 0
const baseDomain = import.meta.env.VITE_APP_BASE_URL
const userStore = useUserStore()
const { user, token } = storeToRefs(userStore)

const baseURL = `${baseDomain}`
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  }
})
instance.interceptors.request.use(
  (request) => {
    if (token) {
      console.log(token.value)
      request.headers['Authorization'] = `Bearer ${token.value}`
    }
    return request
  },
  (error) => {
    activeRequests--
    const { response } = error
    // Do something with request error
    if (activeRequests === 0) {
      // userStore().finishLoading();
    }
    return Promise.reject(response)
  }
)
instance.interceptors.response.use(
  (response) => {
    activeRequests--
    // const {config} = response;
    if (activeRequests === 0) {
      // userStore().finishLoading();
    }
    return response
  },
  (error) => {
    if (error.response.status == 404) {
      router.push({ name: 'NotFound' })
    }
    if (error.response.status == 401 && router.currentRoute.value.name !== 'ViewSignedDocument') {
      ElNotification({
        type: ENotificationType.ERROR,
        title: 'Error',
        message: error.response.data.errors
      })
      localStorage.removeItem('token')
      router.push({ name: 'signIn' })
    } else {
      ElNotification({
        type: ENotificationType.ERROR,
        title: 'Error',
        message: error.response.data.errors
      })
    }
    const { response, config } = error
    // userStore().finishLoading()
    return Promise.reject(response)
  }
)
const ApiService = {
  get(resource: any, params = {}, config = {}) {
    return instance.get(resource, {
      ...config,
      params: params
    })
  },
  post(resource: any, params: any, config = {}) {
    return instance.post(`${resource}`, params, config)
  },
  update(resource: any, params: any, config = {}) {
    return instance.put(resource, params, config)
  },
  updateBulk(resource: any, params: any, config = {}) {
    return instance.put(resource, params, config)
  },
  delete(resource: any, config = {}) {
    return instance.delete(resource, config)
  },
  setHeader: function () {
    instance.defaults.withCredentials = false
    instance.defaults.headers.common['Content-Type'] = 'application/json'
    instance.defaults.headers.common['Accept'] = 'application/json'
  }
}

export default ApiService

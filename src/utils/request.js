import theAxios from 'axios'
import { getToken } from '@/utils/token'
import router from '@/router'

const axios = theAxios.create({
  // 设置基地址
  baseURL: 'https://toutiao.itheima.net',
  // 设置超时时间超过20s无响应判定超时
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  // console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // console.log(response)
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.log(`这是响应拦截器${error}`)
  // console.log(error)
  // console.log(getToken)
  if (error.response.status === 401) {
    // console.log(getToken)
    localStorage.removeItem('geek-itheima')
    router.push({ name: 'login' })
    return
  }
  return Promise.reject(error)
})

// export default axios
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}

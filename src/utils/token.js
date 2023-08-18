// 封装操作token的方法

const key = 'geek-itheima'

// 设置tonken方法
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取token方法
export const getToken = localStorage.getItem(key)

// 删除token方法
export const removeToken = () => {
  localStorage.removeItem(key)
}

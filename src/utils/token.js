// 封装localStorage 存取token
// 3个方法：存  取  删

const key = 'pc-admin-sys-key'

// 存
const setToken = (token) => {
    return window.localStorage.setItem(key, token) // 返回token是否设置成功
}

// 取
const getToken = () => {
    return window.localStorage.getItem(key)
}

// 删
const removeToken = () => {
    return window.localStorage.removeItem(key) // 返回token是否删干净
}

export {
    setToken,
    getToken,
    removeToken
}
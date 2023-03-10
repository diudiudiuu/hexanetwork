// 缓存登录认证
const token = 'HEXA_access_token_';


const getToken = () => {
    return window.localStorage.getItem(token);
}

const setToken = tok => {
    return window.localStorage.setItem(token, tok);
}

const removeToken = () => {
    return window.localStorage.removeItem(token);
}

const sessionStore = {
    get: getToken,
    set: setToken,
    remove: removeToken
}

export default sessionStore


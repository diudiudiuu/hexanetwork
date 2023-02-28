import request from '@/utils/request';

// 登录模块
const auth = {
    user(param) {
        return request({
            url: '/auth/user',
            method: 'get',
            data: param
        })
    },


    login(param) {
        return request({
            url: '/auth/login',
            method: 'post',
            data: param
        })
    },

    logout(param) {
        return request({
            url: '',
            method: 'get',
            data: param
        })
    }
}


export default auth;
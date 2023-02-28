import request from '@/utils/request';

// 支持模块
const profile = {
    info(param) {
        return request({
            url: '/profile',
            method: 'get',
            data: param
        })
    },
    update(param) {
        return request({
            url: '/profile',
            method: 'put',
            data: param
        })
    },

    auth_mail(param) {
        return request({
            url: '/auth_mail',
            method: 'post',
            data: param
        })
    },


}


export default profile;
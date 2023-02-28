import request from '@/utils/request';

// 支持模块
const wallet = {
  list(param) {
    return request({
      url: '/wallet',
      method: 'get',
      data: param
    })
  },
  new_claim(param) {
    return request({
      url: '/wallet/new_claim',
      method: 'post',
      data: param
    })
  },

}


export default wallet;
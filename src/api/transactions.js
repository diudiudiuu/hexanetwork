import request from '@/utils/request';

// 支持模块
const transactions = {
  mining(param) {
    return request({
      url: '/transactions',
      method: 'post',
      data: param
    })
  },
  boost(param) {
    return request({
      url: '/boost',
      method: 'post',
      data: param
    })
  }
}


export default transactions;
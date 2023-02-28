import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入

import { useVariableStore } from '@/pinia/variable'

let variable = null

import sessionStore from '@/utils/sessionStore'
import tools from "@/utils/tools"
const service = axios.create({
  baseURL: "https://service.hexanetwork.co/v1/",
  timeout: 60000
});

service.interceptors.request.use(config => {
  variable = useVariableStore()
  NProgress.start()
  const token = sessionStore.get()
  config.headers = {
    Authorization: `Bearer ${token}`,
    nonce: tools.enctryNonce()
  }

  return config;
},
  error => {
    NProgress.done()
    return Promise.reject();
  }
);

service.interceptors.response.use(response => {
  NProgress.done()
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }

}, error => {
  NProgress.done()
  const {
    response
  } = error
  if (response) {
    if (response.status === 400) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  } else {
    //取消请求
  }

})

export default service;
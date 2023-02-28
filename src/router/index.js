import { createRouter, createWebHashHistory } from "vue-router";
import sessionStore from "@/utils/sessionStore";
import tools from "@/utils/tools";
import api from "@/api";

import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'

const routes = [
  {
    path: "/",
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ "@/views/layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          auth: true
        },
        component: () => import(/* webpackChunkName: "home" */ "@/views/home.vue")
      },
      {
        path: "/wallet",
        name: "wallet",
        meta: {
          auth: true
        },
        component: () => import(/* webpackChunkName: "wallet" */ "@/views/wallet.vue")
      },
      {
        path: "/account",
        name: "account",
        meta: {
          auth: true
        },
        component: () => import(/* webpackChunkName: "account" */ "@/views/account.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      auth: false
    },
    component: () => import(/* webpackChunkName: "login" */ "@/views/login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {

  }
});


router.beforeEach(async (to, from, next) => {
  const token = sessionStore.get()
  const timestamp = new Date().getTime()
  const constant = useConstantStore()
  const variable = useVariableStore()

  const times = timestamp - variable.timestamp

  if (to.meta.auth) {
    if (token) {
      // 时间超过重新获取最新信息
      if (times > constant.session_time) {
        await api.auth.user().then((res) => {
          if (res.status == constant.status_code.success) {
            variable.user = res.user
            sessionStore.set(res.access_token)
            variable.timestamp = new Date().getTime()
            next()
          } else {
            next('/login')
          }
        }).catch(() => {
          next()
        })
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router;
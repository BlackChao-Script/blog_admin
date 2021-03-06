import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () => import('../view/login.vue'),
  },
  {
    path: '/home',
    component: () => import('../view/home.vue'),
    redirect: '/home/systemIntroduction',
    children: [
      {
        path: 'systemIntroduction',
        component: () => import('../view/Dashboard/systemIntroduction.vue'),
      },
      {
        path: 'blogadmin',
        component: () => import('../view/blog/blogadmin.vue'),
      },
      {
        path: 'addblog',
        component: () => import('../view/blog/addblog.vue'),
      },
      {
        path: 'blogadmindet',
        component: () => import('../view/blog/blogadmindet.vue'),
      },
      {
        path: 'addblogdet',
        component: () => import('../view/blog/addblogDet.vue'),
      },
      {
        path: 'carouseladdmin',
        component: () => import('../view/Homepage/carouseladdmin.vue'),
      },
      {
        path: 'introductionaddmin',
        component: () => import('../view/Homepage/introductionaddmin.vue'),
      },
      {
        path: 'iconaddmin',
        component: () => import('../view/Homepage/iconaddmin.vue'),
      },
      {
        path: 'sortaddmin',
        component: () => import('../view/sort/sortaddmin.vue'),
      },
      {
        path: 'modifyaboutme',
        component: () => import('../view/aboutme/modifyaboutme.vue'),
      },
      {
        path: 'leavewordaddmin',
        component: () => import('../view/leaveword/leavewordaddmin.vue'),
      },
    ],
  },
]

//! 工厂函数创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})
//! 路由导航守卫
router.beforeEach((to, from, next) => {
  //* 判断有没有登录
  const islogin = window.sessionStorage.getItem('token') ? true : false
  //* 如果当前访问的是登录页面或者注册页面可以让它进入
  if (to.path == '/login') {
    next()
  } else {
    //* 如果isLogin为true表示已经登录了;就让它正常进入就可以 ,如果没登录就让他进入登录页面
    islogin ? next() : next('/')
  }
})

export default router

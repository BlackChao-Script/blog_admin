import { createApp } from 'vue'
import App from './App.vue'
//! 引入公共样式
import './assets/scss/base.scss'
//! 引入路由
import router from './router/index'
//! 引入vuex状态管理组件
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

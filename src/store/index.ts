import { createStore } from 'vuex'

export default createStore({
  state: {
    //! 资源公共路径
    ImgBaseUrl: 'http://localhost:8080/uploads/',
    //! 是否展开侧边菜单栏
    showAsideMenu: false,
    //! 用户名
    userName: '',
  },
  mutations: {},
  actions: {},
  modules: {},
})

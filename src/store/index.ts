import { createStore } from 'vuex'

export default createStore({
  state: {
    //! 资源公共路径
    ImgBaseUrl: 'http://localhost:8080/uploads/',
    //! 是否展开侧边菜单栏
    showAsideMenu: false,
    //! 用户名
    userName: '',
    //! 菜单栏默认选中的值
    DefaultActive: '/home/systemIntroduction',
    //! 当前要修改的博文数据
    CurrentMdData: {},
    //! 博文数量
    blogLength: '',
    //! 分类数量
    sortLength: '',
    //! 评论数量
    leavewordLength: '',
  },
  mutations: {},
  actions: {},
  modules: {},
})

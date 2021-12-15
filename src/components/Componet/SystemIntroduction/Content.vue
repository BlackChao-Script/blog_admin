<template>
  <div class="content_box">
    <el-card>
      <div class="box_title">系统介绍</div>
      <div class="box_text">blog_admin 是一个管理个人博客的管理系统,基于 Node.js、Vue3 相关技术栈开发,主要供学习用。</div>
    </el-card>
    <el-card>
      <div class="box_title">技术选型</div>
      <ul>
        <li class="box_technical" v-for="(item,index) in data.technicalList" :key="index">{{ item }}</li>
      </ul>
    </el-card>

    <el-card>
      <div class="box_title">联系作者</div>
      <ul>
        <li>邮箱: c199188177@163.com</li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue-demi';

//! 约束接口
interface IDataType {
  technicalList: Array<any>
}

//! 数据
const data = reactive<IDataType>({
  technicalList: ['Vue 3.x', 'Vue-router', 'Vuex', 'Vite 2.x', 'Element-Plus', 'Ts', "Axios"]
})
</script>

<style scoped lang="scss">
.content_box {
  .box_title {
    margin-top: 30px;
    color: #342235;
    font-size: 16px;
    font-weight: 600;
  }
  .box_text {
    margin-top: 20px;
  }
}
</style>

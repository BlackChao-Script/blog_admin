<template>
  <!-- 容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <Aside></Aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header></Header>
      </el-header>
      <!-- 主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import Aside from '../components/Common/Aside.vue'
import Header from '../components/Common/Header.vue'

</script>

<style scoped lang="scss">
</style>

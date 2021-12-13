<template>
  <!-- 容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <Aside></Aside>
    <el-container>
      <!-- 头部 -->
      <el-header>Header</el-header>
      <!-- 主题 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import Aside from '../components/Aside.vue'

</script>

<style scoped lang="scss">
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}



.el-main {
  height: 100vh;
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>

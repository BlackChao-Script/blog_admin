<template>
  <el-card>
    <!-- 面包屑 -->
    <Breadcrumb>
      <template v-slot:title>评论管理</template>
    </Breadcrumb>
    <!-- 内容 -->
    <Content></Content>
  </el-card>
</template>

<script setup lang='ts'>
import Breadcrumb from '../../components/Common/Breadcrumb.vue'
import Content from '../../components/Componet/LeaveWorcAddmin/Content.vue'
</script>

<style scoped lang="scss">
</style>

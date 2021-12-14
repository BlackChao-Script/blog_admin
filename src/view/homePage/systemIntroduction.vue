<template>
  <el-card>
    <!-- 面包屑 -->
    <Breadcrumb>
      <template v-slot:title>系统介绍</template>
    </Breadcrumb>
    <!-- 内容 -->
    <Content></Content>
  </el-card>
</template>

<script setup lang='ts'>
import Breadcrumb from '../../components/Common/Breadcrumb.vue'
import Content from '../../components/Componet/SystemIntroduction/Content.vue'
</script>

<style scoped lang="scss">
</style>

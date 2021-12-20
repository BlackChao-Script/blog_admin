<template>
  <el-card>
    <Breadcrumb>
      <template v-slot:title>个人地址图标管理</template>
    </Breadcrumb>
    <!-- 内容 -->
    <Content></Content>
  </el-card>
</template>

<script setup lang='ts'>
import Breadcrumb from '../../components/Common/Breadcrumb.vue'
import Content from '../../components/Componet/IconAddmin/Content.vue'
</script>

<style scoped lang="scss">
</style>

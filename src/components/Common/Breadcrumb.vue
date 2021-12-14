<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="title"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.Breadcrumb{
  margin-bottom: 20px;
}
</style>

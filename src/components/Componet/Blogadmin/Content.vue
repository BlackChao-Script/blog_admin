<template>
  <el-button :icon="Plus" type="warning" color="#342235">添加博文</el-button>
  <el-table :data="data.mdData" stripe style="width: 100%">
    <el-table-column align="center" prop="id" label="博文编号" />
    <el-table-column align="center" prop="markdown_name" label="博文名称" />
    <el-table-column align="center" prop="markdown_title" label="博文介绍">
      <template #default="scope">
        <div class="title">{{ scope.row.markdown_title }}</div>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="markdown_img" label="博文照片">
      <template #default="scope">
        <div class="image">
          <el-image :src="scope.row.markdown_img"></el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="sort_class" label="博文分类" />
    <el-table-column align="center" prop="article_user" label="博文作者" />
    <el-table-column align="center" label="操作">
      <template #default="scope">
        <el-button type="warning" :icon="Edit" circle color="#342235"></el-button>
        <el-button type="danger" :icon="Delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang='ts'>
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue-demi';
import { useStore } from 'vuex'
import { getMdData } from '../../../api/md.ts'

//! 约束接口
interface IDataType {
  mdData: Array<any>
}

//! 数据
const data = reactive<IDataType>({
  mdData: []
})

//! 使用vuex
const store = useStore()

//! 方法
const getMdDatas = async () => {
  const res = await getMdData()
  const arr = res.data.result.list
  for (const i of arr) {
    i.markdown_img = store.state.ImgBaseUrl + i.markdown_img
  }
  data.mdData = arr
  console.log(data.mdData)
}

//! 生命周期函数
onMounted(getMdDatas)
</script>

<style scoped lang="scss">
.el-button {
  margin-bottom: 10px;
}
.image {
  width: 100px;
  height: 100px;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

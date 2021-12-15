<template>
  <el-button :icon="Plus" type="warning" color="#342235" @click="toAddAdmin">添加博文</el-button>
  <el-table :data="data.mdData" stripe style="width: 100%">
    <el-table-column prop="id" label="博文编号" />
    <el-table-column prop="markdown_name" label="博文名称" />
    <el-table-column prop="markdown_title" label="博文介绍">
      <template #default="scope">
        <div class="title">{{ scope.row.markdown_title }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="markdown_img" label="博文照片">
      <template #default="scope">
        <div class="image">
          <el-image :src="scope.row.markdown_img"></el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="sort_class" label="博文分类" />
    <el-table-column prop="article_user" label="博文作者" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="warning" :icon="Edit" circle color="#342235" @click="modifyMD(scope.row)"></el-button>
        <el-popconfirm
          cancel-button-text="不删了"
          confirm-button-text="删除"
          confirm-button-type="danger"
          title="确定删除当前博文?"
          @confirm="deleteMd(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-row type="flex" justify="center">
      <el-col :span="5">
        <el-pagination
          :page-sizes="[2, 4, 6, 8, 10]"
          :page-size="data.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="data.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getMdData, deleteMdData } from '../../../api/md'

//! 约束接口
interface IDataType {
  mdData: Array<any>
  paegNum: number
  pageSize: number
  total: number
}

//! 数据
const data = reactive<IDataType>({
  mdData: [],
  paegNum: 1,
  pageSize: 4,
  total: 0
})

//! 使用vuex
const store = useStore()

//! 使用路由
const $router = useRouter()

//! 方法
//* 获取博文数据
const getMdDatas = async () => {
  const res = await getMdData(data.paegNum, data.pageSize)
  const arr = res.data.result.list
  for (const i of arr) {
    i.markdown_img = store.state.ImgBaseUrl + i.markdown_img
  }
  data.total = res.data.result.total * 1
  data.paegNum = res.data.result.paegNum * 1
  data.pageSize = res.data.result.pageSize * 1
  data.mdData = arr
}
//* 跳转至添加博文
const toAddAdmin = () => {
  $router.push(`/home/addblog`)
  window.sessionStorage.setItem('path', '/home/addblog')
  store.state.DefaultActive = window.sessionStorage.getItem('path')
}
//* 改变每页条数时触发的钩子
const handleSizeChange = (val: any) => {
  data.pageSize = val
  getMdDatas()
}
//* 改变当前页时触发的钩子
const handleCurrentChange = (val: any) => {
  data.paegNum = val
  getMdDatas()
}
//* 修改当前博文
const modifyMD = (val: any) => {
  store.state.CurrentMdData = val
  $router.push('/home/addblog')
  window.sessionStorage.setItem('path', '/home/addblog')
  store.state.DefaultActive = window.sessionStorage.getItem('path')
}
//* 删除当前博文
const deleteMd = (val: any) => {
  deleteMdData(val).then(() => {
    ElMessage({
      message: '博文删除成功',
      type: 'success',
    })
    getMdDatas()
  }).catch(() => ElMessage.error('博文删除失败'))

}

//! 重新赋值
store.state.DefaultActive = window.sessionStorage.getItem('path')

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
.el-table {
  margin-bottom: 20px;
}
</style>

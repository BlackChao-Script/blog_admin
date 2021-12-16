<template>
  <!-- 按钮 -->
  <el-button :icon="Plus" type="warning" color="#342235">添加博文详细文件</el-button>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.mdDetListData" stripe style="width: 100%">
    <el-table-column prop="id" label="博文详细编号" />
    <el-table-column prop="content_md" label="博文文件">
      <template #default="scope">
        <div class="title">{{ scope.row.content_md }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="md_id" label="博文id" />
    <el-table-column prop="create_time" label="博文创建时间" />
  </el-table>
  <!-- 分页器 -->
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
import { getMdDetListData } from '../../../api/md'

//! 约束接口
interface IDataType {
  mdDetListData: Array<any>
  paegNum: number
  pageSize: number
  total: number
  loading: boolean
}

//! 数据
const data = reactive<IDataType>({
  mdDetListData: [],
  paegNum: 1,
  pageSize: 6,
  total: 0,
  loading: true
})

//! 方法
//* 获取博文数据
const getMdDetListDatas = async () => {
  const res = await getMdDetListData(data.paegNum, data.pageSize)
  const arr = res.data.result.list
  const formateDate = (datetime: any) => {
    function addDateZero(num: any) {
      return (num < 10 ? "0" + num : num)
    }
    let d = new Date(datetime)
    let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
    return formatdatetime
  }
  for (const i of arr) {
    i.create_time = formateDate(i.create_time)
  }
  data.loading = false
  data.mdDetListData = arr
  data.total = res.data.result.total * 1
  data.paegNum = res.data.result.paegNum * 1
  data.pageSize = res.data.result.pageSize * 1
}
//* 改变每页条数时触发的钩子
const handleSizeChange = (val: any) => {
  data.pageSize = val
  getMdDetListDatas()
}
//* 改变当前页时触发的钩子
const handleCurrentChange = (val: any) => {
  data.paegNum = val
  getMdDetListDatas()
}

//! 生命周期函数
onMounted(getMdDetListDatas)

</script>

<style scoped lang="scss">
.el-button {
  qmargin-bottom: 10px;
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

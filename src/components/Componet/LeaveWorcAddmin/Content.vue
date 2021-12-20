<template>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.leaveWordData" stripe style="width: 100%">
    <el-table-column prop="id" label="留言编号" />
    <el-table-column prop="leaveWord_name" label="留言者" />
    <el-table-column prop="leaveWord_text" label="留言内容" />
    <el-table-column prop="leaveWord_img" label="留言者头像">
      <template #default="scope">
        <el-avatar :src="scope.row.leaveWord_img"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="leaveWord_time" label="留言时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-popconfirm
          cancel-button-text="不删了"
          confirm-button-text="删除"
          confirm-button-type="danger"
          title="确定删除当前博文?"
          @confirm="deleteleaveWord(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang='ts'>
import { Delete } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue-demi';
import { ElMessage } from 'element-plus'
import { getLeaveWordData, deleteLeaveWordData } from '../../../api/leaveWord'

//! 约束接口
interface IDataType {
  loading: boolean
  leaveWordData: any
}

//! 数据
const data = reactive<IDataType>({
  //* 控制加载
  loading: true,
  //* 留言数据
  leaveWordData: []
})

//! 方法
//* 获取留言数据
const getLeaveWordDatas = async () => {
  const res = await getLeaveWordData()
  const arr = res.data.result
  const formateDate = (datetime: any) => {
    function addDateZero(num: any) {
      return (num < 10 ? "0" + num : num)
    }
    let d = new Date(datetime)
    let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
    return formatdatetime
  }
  for (const i of arr) {
    i.leaveWord_time = formateDate(i.leaveWord_time)
  }
  data.leaveWordData = arr
  data.loading = false
}
//* 删除当前留言
const deleteleaveWord = (id: any) => {
  deleteLeaveWordData(id).then(() => {
    ElMessage({
      message: '评论删除成功',
      type: 'success',
    })
    getLeaveWordDatas()
  }).catch(() => ElMessage.error('评论删除失败'))
}

//! 生命周期函数
onMounted(getLeaveWordDatas)
</script>

<style scoped lang="scss">
</style>

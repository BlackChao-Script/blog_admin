<template>
  <!-- 按钮 -->
  <el-button :icon="Plus" type="warning" color="#342235" @click="showDialog">添加分类</el-button>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.sortData" stripe style="width: 100%">
    <el-table-column prop="id" label="分类编号" />
    <el-table-column prop="sort_name" label="分类名称" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="warning"
          :icon="Edit"
          circle
          color="#342235"
          @click="showModifyDialog(scope.row)"
        ></el-button>
        <el-popconfirm
          cancel-button-text="不删了"
          confirm-button-text="删除"
          confirm-button-type="danger"
          title="确定删除当前博文?"
          @confirm="deleteSort(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加分类对话框 -->
  <el-dialog
    width="500px"
    v-model="data.showAddSortDialog"
    title="添加分类"
    @close="closeAddSortDialog"
  >
    <el-form ref="SortFrom" :model="data.sortDataForm" :rules="data.sortDataFormRules">
      <el-form-item label="分类编号" prop="id">
        <el-input v-model="data.sortDataForm.id"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" label-width="30" prop="sort_name">
        <el-input v-model="data.sortDataForm.sort_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button :icon="Plus" type="warning" color="#342235" @click="submitSortFrom">立即添加</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改分类对话框 -->
  <el-dialog
    width="500px"
    v-model="data.showModifySortDialog"
    title="修改分类"
    @close="closeModifySortDialog"
  >
    <el-form ref="ModifySortFrom" :model="data.sortDataForm" :rules="data.sortDataFormRules">
      <el-form-item label="分类编号" prop="id">
        <el-input disabled v-model="data.sortDataForm.id"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" label-width="30" prop="sort_name">
        <el-input v-model="data.sortDataForm.sort_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button
              :icon="Plus"
              type="warning"
              color="#342235"
              @click="submitModifySortFrom"
            >立即修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang='ts'>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue-demi'
import { ElMessage } from 'element-plus'
import { getSortData, addSort, modifySortData, deleteSortData } from '../../../api/sort'
import { useStore } from 'vuex'

//! 约束接口
interface IDataType {
  sortData: Array<any>
  loading: boolean
  showAddSortDialog: boolean
  sortDataForm: any
  sortDataFormRules: any
  showModifySortDialog: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 分类数据
  sortData: [],
  //* 控制加载
  loading: true,
  //* 控制添加分类对话框
  showAddSortDialog: false,
  //* 分类表单
  sortDataForm: {
    id: '',
    sort_name: ''
  },
  //* 分类表单验证
  sortDataFormRules: {
    id: [
      {
        required: true,
        message: '请输入分类编号',
        trigger: 'blur',
      },
    ],
    sort_name: [
      {
        required: true,
        message: '请输入分类名称',
        trigger: 'blur',
      }
    ]
  },
  //* 控制修改对话框
  showModifySortDialog: false
})

//! 获取ref
const SortFrom = ref<any>(null)
const ModifySortFrom = ref<any>(null)

//! 方法
//* 获取分类数据
const getSortDatas = async () => {
  const res = await getSortData()
  data.sortData = res.data.result.list
  data.loading = false
}
//* 点击添加分类
const showDialog = () => {
  data.showAddSortDialog = true
}
//* 添加分类对话框关闭时的钩子
const closeAddSortDialog = () => {
  getSortDatas()
}
//* 修改分类对话框关闭时的钩子
const closeModifySortDialog = () => {
  getSortDatas()
  data.sortDataForm = {}
}
//* 点击修改
const showModifyDialog = (file: any) => {
  data.showModifySortDialog = true
  data.sortDataForm = file
}
//* 删除当前分类
const deleteSort = (id: any) => {
  deleteSortData(id).then(() => {
    ElMessage({
      message: '分类删除成功',
      type: 'success',
    })
    getSortDatas()
  }).catch(() => {
    ElMessage.error('分类删除失败')
  })
}
//* 提交添加表单
const submitSortFrom = () => {
  SortFrom.value.validate((vaild: any) => {
    if (!vaild) return
    addSort(data.sortDataForm.id, data.sortDataForm.sort_name).then(() => {
      ElMessage({
        message: '添加分类成功',
        type: 'success',
      })
      data.showAddSortDialog = false
    }).catch(() => {
      ElMessage.error('添加分类失败')
    })
  })
}
//* 提交修改表单
const submitModifySortFrom = () => {
  ModifySortFrom.value.validate((vaild: any) => {
    if (!vaild) return
    modifySortData(data.sortDataForm.id, data.sortDataForm.sort_name).then(() => {
      ElMessage({
        message: '修改分类成功',
        type: 'success',
      })
      data.showModifySortDialog = false
    }).catch(() => {
      ElMessage.error('修改分类失败')
    })
  })
}


//! 生命周期函数
onMounted(getSortDatas)
</script>

<style scoped lang="scss">
</style>

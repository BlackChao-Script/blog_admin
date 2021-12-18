<template>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.introductionData" stripe style="width: 100%">
    <el-table-column prop="id" label="简介编号" />
    <el-table-column prop="Introduction_sort" label="简介分类" />
    <el-table-column prop="Introduction_text" label="简介内容" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="warning"
          :icon="Edit"
          circle
          color="#342235"
          @click="clickShowintroductionDialog(scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改简介对话框 -->
  <el-dialog
    width="500px"
    v-model="data.showintroductionDialog"
    title="修改简介"
    @close="closeModifyDialog"
  >
    <el-form
      ref="IntroductionFrom"
      :model="data.introductionDataForm"
      :rules="data.introductionDataFormRules"
    >
      <el-form-item label="简介编号">
        <el-input disabled v-model="data.introductionDataForm.id"></el-input>
      </el-form-item>
      <el-form-item label="简介分类" label-width="30">
        <el-input disabled v-model="data.introductionDataForm.Introduction_sort"></el-input>
      </el-form-item>
      <el-form-item label="简介内容" label-width="30" prop="Introduction_text">
        <el-input v-model="data.introductionDataForm.Introduction_text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button
              :icon="Plus"
              type="warning"
              color="#342235"
              @click="submitIntroductionFrom"
            >立即修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang='ts'>
import { Edit, Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue-demi';
import { ElMessage } from 'element-plus'
import { getIntroductionData, modifyIntroductionData } from '../../../api/home'

//! 约束接口
interface IDataType {
  loading: boolean
  introductionData: Array<any>
  introductionDataForm: any
  introductionDataFormRules: any
  showintroductionDialog: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 控制加载
  loading: true,
  //* 简介数据
  introductionData: [],
  //* 简介数据表单
  introductionDataForm: {
    id: '',
    Introduction_sort: '',
    Introduction_text: ''
  },
  //* 简介数据表单验证规则
  introductionDataFormRules: {
    Introduction_text: [
      {
        required: true,
        message: '请输入简介内容',
        trigger: 'blur',
      },
    ]
  },
  //* 控制修改数据对话框
  showintroductionDialog: false
})

//! 获取ref
const IntroductionFrom = ref<any>(null)

//! 方法
//* 获取简介数据
const getIntroductionDatas = async () => {
  const res = await getIntroductionData()
  data.introductionData = res.data.result.list
  data.loading = false
}
//* 点击修改
const clickShowintroductionDialog = (file: any) => {
  data.showintroductionDialog = true
  data.introductionDataForm = file
}
//* 关闭修改简介对话框的钩子
const closeModifyDialog = () => {
  getIntroductionDatas()
  data.introductionDataForm = {}
}
//* 修改简介数据提交表单
const submitIntroductionFrom = () => {
  IntroductionFrom.value.validate((vaild: any) => {
    if (!vaild) return
    console.log(data.introductionDataForm)
    modifyIntroductionData(
      data.introductionDataForm.id,
      data.introductionDataForm.Introduction_sort,
      data.introductionDataForm.Introduction_text
    ).then(() => {
      ElMessage({
        message: '简介数据修改成功',
        type: 'success',
      })
      data.showintroductionDialog = false
    }).catch(() => {
      ElMessage.error('简介数据修改失败')
    })
  })
}

//! 生命周期函数
onMounted(getIntroductionDatas)
</script>

<style scoped lang="scss">
</style>

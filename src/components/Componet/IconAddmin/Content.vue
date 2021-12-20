<template>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.iconData" stripe style="width: 100%">
    <el-table-column prop="id" label="图标编号" />
    <el-table-column prop="icon_src" label="博文照片">
      <template #default="scope">
        <div class="image">
          <el-image :src="scope.row.icon_src"></el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="icon_link" label="图标跳转链接" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="warning"
          :icon="Edit"
          circle
          color="#342235"
          @click="clickShowIconDialog(scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改图标对话框 -->
  <el-dialog width="500px" v-model="data.showIconDialog" title="修改简介" @close="closeModifyDialog">
    <el-form ref="IconFrom" :model="data.iconDataForm" :rules="data.iconDataFormRules">
      <el-form-item label="图标编号">
        <el-input disabled v-model="data.iconDataForm.id"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="30">
        <el-row class="img">
          <el-col :span="24">
            <el-image :src="data.iconDataForm.icon_src"></el-image>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图标链接跳转地址" label-width="30">
        <el-input v-model="data.iconDataForm.icon_link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button :icon="Plus" type="warning" color="#342235" @click="submitIconFrom">立即修改</el-button>
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
import { getIconData, modifyIconData } from '../../../api/home'
import { useStore } from 'vuex';

//! 约束接口
interface IDataType {
  loading: boolean
  iconData: Array<any>
  iconDataForm: any
  iconDataFormRules: any
  showIconDialog: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 控制加载
  loading: true,
  //* 图标数据
  iconData: [],
  //* 图标数据表单
  iconDataForm: {
    id: '',
    icon_src: '',
    icon_link: ''
  },
  //* 图标数据表单验证规则
  iconDataFormRules: {
    Introduction_text: [
      {
        required: true,
        message: '请输入简介内容',
        trigger: 'blur',
      },
    ]
  },
  //* 控制修改数据对话框
  showIconDialog: false
})

//! 获取ref
const IconFrom = ref<any>(null)

//! 使用vuex
const store = useStore()

//! 方法
//* 获取简介数据
const getIntroductionDatas = async () => {
  const res = await getIconData()
  const arr = res.data.result.list
  arr.forEach((item: any) => {
    item.icon_src = store.state.ImgBaseUrl + item.icon_src
  })
  data.iconData = arr
  data.loading = false
}
//* 点击修改
const clickShowIconDialog = (file: any) => {
  data.showIconDialog = true
  data.iconDataForm = file
}
//* 关闭修改简介对话框的钩子
const closeModifyDialog = () => {
  getIntroductionDatas()
  data.iconDataForm = {}
}
//* 修改简介数据提交表单
const submitIconFrom = () => {
  IconFrom.value.validate((vaild: any) => {
    if (!vaild) return
    const icon_src = data.iconDataForm.icon_src.split('/')[4]
    modifyIconData(
      data.iconDataForm.id,
      icon_src,
      data.iconDataForm.icon_link
    ).then(() => {
      ElMessage({
        message: '简介数据修改成功',
        type: 'success',
      })
      data.showIconDialog = false
    }).catch(() => {
      ElMessage.error('简介数据修改失败')
    })
  })
}

//! 生命周期函数
onMounted(getIntroductionDatas)
</script>

<style scoped lang="scss">
.img {
  width: 150px;
  height: 150px;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>

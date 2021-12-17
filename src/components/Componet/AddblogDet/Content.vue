<template>
  <el-form
    ref="mdDetDataFrom"
    :model="data.mdDetDataFrom"
    :rules="data.mdDetDataFromRules"
    class="demo-ruleForm"
  >
    <el-form-item label="上传博文详细文件">
      <el-row>
        <el-col :span="10">
          <el-upload
            :action="data.uploadURL"
            :headers="data.headerObj"
            :limit="1"
            accept=".md"
            :before-upload="beforeUpload_u"
            :disabled="data.disabledUpload"
            :on-success="successMd"
            :on-error="errorMd"
          >
            <el-icon>
              <plus />
            </el-icon>
          </el-upload>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="博文id" prop="md_id">
      <el-row>
        <el-col :span="2">
          <el-input v-model="data.mdDetDataFrom.md_id"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Plus" type="warning" color="#342235" @click="addMdDetData">立即添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue-demi';
import { addMdDet } from '../../../api/md'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

//! 约束接口
interface IDataType {
  mdDetDataFrom: any
  mdDetDataFromRules: any
  uploadURL: string
  headerObj: any
  disabledUpload: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* md文件详细表单
  mdDetDataFrom: {
    content_md: '',
    md_id: ''
  },
  //* md文件详细表单验证
  mdDetDataFromRules: {
    md_id: [
      {
        required: true,
        message: '请输入博文id',
        trigger: 'blur',
      },
    ]
  },
  //* 文件上传地址
  uploadURL: '/api/upload',
  //* 文件上传的请求头
  headerObj: {
    Authorization: window.sessionStorage.getItem('token'),
  },
  //* 是否禁用上传
  disabledUpload: false
})

//! 获取ref
const mdDetDataFrom = ref<any>(null)

//! 使用路由
const $router = useRouter()

//! 使用vuex
const store = useStore()

//! 方法
//* 文件上传失败时的钩子
const errorMd = () => {
  ElMessage.error('文件上传失败')
}
//* 上传文件之前的钩子
const beforeUpload_u = (file: any) => {
  let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
  const extension = testmsg === 'md'
  let bool = false
  if (extension) {
    bool = true
  } else {
    bool = false
    ElMessage.error('上传文件只能是MarkDown文件')
  }
  return bool
}
//* 文件上传成功时的钩子
const successMd = (file: any) => {
  ElMessage({
    message: '文件上传成功',
    type: 'success',
  })
  data.disabledUpload = true
  data.mdDetDataFrom.content_md = file.result.file_path
  console.log(data.mdDetDataFrom.content_md)
}
//* 添加博文详细文件
const addMdDetData = () => {
  mdDetDataFrom.value.validate((vaild: any) => {
    if (!vaild) return
    addMdDet(data.mdDetDataFrom.content_md, data.mdDetDataFrom.md_id).then(() => {
      ElMessage({
        message: '博文详细添加成功',
        type: 'success',
      })
      $router.push('/home/blogadmindet')
      window.sessionStorage.setItem('path', '/home/blogadmindet')
      store.state.DefaultActive = window.sessionStorage.getItem('path')
    }).catch(() => ElMessage.error('博文详细添加失败'))
  })

}
</script>

<style scoped lang="scss">
</style>

<template>
  <el-form
    ref="blogForm"
    :model="data.blogForm"
    :rules="data.blogRules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="博文名称" prop="markdown_name">
      <el-row>
        <el-col :span="6">
          <el-input v-model="data.blogForm.markdown_name"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="发布者" prop="article_user">
      <el-row>
        <el-col :span="6">
          <el-input v-model="data.blogForm.article_user"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="博文照片">
      <el-row>
        <el-col :span="10">
          <el-upload
            :action="data.uploadURL"
            :headers="data.headerObj"
            list-type="picture-card"
            :limit="1"
            :disabled="data.disabledUpload"
            :on-success="successImg"
            :on-error="errorImg"
          >
            <el-icon>
              <plus />
            </el-icon>
          </el-upload>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="博文分类" prop="sort_class">
      <el-row>
        <el-col :span="6">
          <el-select v-model="data.blogForm.sort_class" placeholder="请选择博文分类">
            <el-option
              v-for="item in data.sortData"
              :key="item.id"
              :label="item.sort_name"
              :value="item.sort_name"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-divider content-position="left">博文分类必须与博文分类id对应</el-divider>
    <el-form-item label="博文分类id" prop="sort_id">
      <el-row>
        <el-col :span="6">
          <el-select v-model="data.blogForm.sort_id" placeholder="请选择博文分类id">
            <el-option
              v-for="item in data.sortData"
              :key="item.id"
              :label="item.id + item.sort_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="博文标题" prop="markdown_title">
      <el-row>
        <el-col :span="6">
          <el-input
            :clearable="true"
            :maxlength="200"
            :show-word-limit="true"
            v-model="data.blogForm.markdown_title"
            type="textarea"
          ></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        v-if="store.state.DefaultActive == ''"
        :icon="Plus"
        type="warning"
        color="#342235"
        @click="submitBlogForm"
      >立即添加</el-button>
      <el-button v-else :icon="Edit" type="warning" color="#342235" @click="submitBlogForm">立即修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang='ts'>
import {
  Plus, Edit
} from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue-demi';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
import { getSortData } from '../../../api/sort'
import { addMd } from '../../../api/md'
import { useRouter } from 'vue-router';

//! 约束接口
interface IDataType {
  blogForm: any
  blogRules: any
  sortData: Array<any>
  uploadURL: string
  headerObj: any
  disabledUpload: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 博文表单数据
  blogForm: {
    markdown_name: '',
    article_user: '',
    markdown_title: '',
    markdown_img: '',
    sort_id: '',
    sort_class: '',
  },
  //* 博文表单验证规则
  blogRules: {
    markdown_name: [
      {
        required: true,
        message: '请输入博文名称',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 8,
        message: '博文名称长度在2到8之间',
        trigger: 'blur',
      },
    ],
    article_user: [
      {
        required: true,
        message: '请输入发布者名称',
        trigger: 'blur',
      }
    ],
    markdown_title: [
      {
        required: true,
        message: '请输入博文标题',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 200,
        message: '博文标题长度在2到200之间',
        trigger: 'blur',
      },
    ],
    sort_id: [
      {
        required: true,
        message: '请选择分类id',
        trigger: 'blur',
      }
    ],
    sort_class: [
      {
        required: true,
        message: '请选择分类',
        trigger: 'blur',
      }
    ]
  },
  //* 分类数据
  sortData: [],
  //* 图片上传地址
  uploadURL: '/api/upload',
  //* 图片上传的请求头
  headerObj: {
    Authorization: window.sessionStorage.getItem('token'),
  },
  //* 是否禁用上传
  disabledUpload: false
})

//! 使用vuex
const store = useStore()

//! 使用路由
const $router = useRouter()

//! 获取ref
const blogForm = ref<any>(null)

//! 方法
//* 获取分类数据
const getSortDatas = async () => {
  const res = await getSortData()
  data.sortData = res.data.result.list
}
//* 图片上传成功时的钩子
const successImg = (file: any) => {
  ElMessage({
    message: '图片上传成功',
    type: 'success',
  })
  data.disabledUpload = true
  data.blogForm.markdown_img = file.result.goods_img
}
//* 图片上传失败时的钩子
const errorImg = () => {
  ElMessage.error('图片上传失败')
}
//* 添加博文
const submitBlogForm = () => {
  blogForm.value.validate((vaild: any) => {
    if (!vaild) return
    addMd(
      data.blogForm.markdown_name,
      data.blogForm.article_user,
      data.blogForm.markdown_title,
      data.blogForm.markdown_img,
      data.blogForm.sort_id,
      data.blogForm.sort_class,
    ).then(() => {
      ElMessage({
        message: '博文添加成功',
        type: 'success',
      })
      $router.push('/home/blogadmin')
      window.sessionStorage.setItem('path', '/home/blogadmin')
      store.state.DefaultActive = window.sessionStorage.getItem('path')
      data.blogForm = {}
    }).catch(() => ElMessage.error('博文添加失败'))


  })
}

//! 生命周期函数
onMounted(() => {
  getSortDatas()
  data.blogForm = store.state.CurrentMdData
})

</script>

<style scoped lang="scss">
</style>

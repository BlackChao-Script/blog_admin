<template>
  <!-- 按钮 -->
  <el-button :icon="Edit" type="warning" color="#342235" @click="showModifyAboutMe">修改我的信息</el-button>
  <div class="aboutme">
    <div class="about_title">我的头像</div>
    <el-row>
      <el-col :span="3">
        <el-image :src="data.AboutData.me_img"></el-image>
      </el-col>
    </el-row>
    <div class="about_title">介绍</div>
    <el-row>
      <el-col :span="12">
        <div class="about_text">{{ data.AboutData.me_introduce }}</div>
      </el-col>
    </el-row>
  </div>
  <!-- 修改我的信息对话框 -->
  <el-dialog width="500px" v-model="data.showModifyAboutDialog" title="修改分类">
    <el-form ref="ModifyAboutFrom" :model="data.AboutDataFrom">
      <el-form-item label="我的头像">
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
      </el-form-item>
      <el-form-item label="介绍" label-width="30">
        <el-input
          type="textarea"
          :autosize="true"
          :clearable="true"
          :show-word-limit="true"
          v-model="data.AboutDataFrom.me_introduce"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button :icon="Edit" type="warning" color="#342235" @click="submitAboutFrom">立即修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang='ts'>
import { Edit, Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue-demi'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getAboutMeData, modifyAboutMeData } from '../../../api/aboutme'


//! 约束接口
interface IDataType {
  AboutData: any
  AboutDataFrom: any
  showModifyAboutDialog: boolean
  uploadURL: string
  headerObj: any
  disabledUpload: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 关于我的数据
  AboutData: {},
  //* 关于我的表单
  AboutDataFrom: {
    me_img: '',
    me_introduce: ''
  },
  //* 控制修改关于我的对话框
  showModifyAboutDialog: false,
  //* 图片上传地址
  uploadURL: '/api/upload',
  //* 图片上传的请求头
  headerObj: {
    Authorization: window.sessionStorage.getItem('token'),
  },
  //* 是否禁用上传
  disabledUpload: false
})

//! 获取ref
const ModifyAboutFrom = ref<any>(null)

//! 使用vuex
const store = useStore()

//! 方法
//* 获取关于我的数据
const getAboutMeDatas = async () => {
  const res = await getAboutMeData()
  const arr = res.data.result
  arr[0].me_img = store.state.ImgBaseUrl + arr[0].me_img
  data.AboutData = arr[0]
  data.AboutDataFrom.me_introduce = arr[0].me_introduce
}
//* 图片上传成功时的钩子
const successImg = (file: any) => {
  ElMessage({
    message: '头像上传成功',
    type: 'success',
  })
  data.disabledUpload = true
  data.AboutDataFrom.me_img = file.result.file_path
}
//* 图片上传失败时的钩子
const errorImg = () => {
  ElMessage.error('头像上传失败')
}
//* 点击修改我的信息
const showModifyAboutMe = () => {
  data.showModifyAboutDialog = true
}

//* 提交关于我的数据表单
const submitAboutFrom = () => {
  ModifyAboutFrom.value.validate((vaild: any) => {
    if (!vaild) return
    modifyAboutMeData(
      data.AboutData.id,
      data.AboutDataFrom.me_img,
      data.AboutDataFrom.me_introduce
    ).then(() => {
      ElMessage({
        message: '关于我的数据修改成功',
        type: 'success',
      })
      data.showModifyAboutDialog = false
      getAboutMeDatas()
    }).catch(() => ElMessage.error('关于我的数据修改失败'))
  })
}

//! 生命周期函数
onMounted(getAboutMeDatas)

</script>

<style scoped lang="scss">
.aboutme {
  .about_title {
    padding: 10px 0px;
    font-size: 17px;
    font-weight: 600;
  }
}
</style>

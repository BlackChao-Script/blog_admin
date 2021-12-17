<template>
  <!-- 按钮 -->
  <el-button :icon="Plus" type="warning" color="#342235" @click="clickShowAddDialog">添加轮播图</el-button>
  <!-- 表格 -->
  <el-table v-loading="data.loading" :data="data.carouseldata" stripe style="width: 100%">
    <el-table-column prop="id" label="轮播图编号" />
    <el-table-column prop="carousel_name" label="轮播图标题" />
    <el-table-column prop="carousel_src" label="轮播图">
      <template #default="scope">
        <div class="image">
          <el-image :src="scope.row.carousel_src"></el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="carousel_link" label="跳转链接">
      <template #default="scope">
        <el-link
          type="warning"
          :href="scope.row.carousel_link"
          target="_blank"
        >{{ scope.row.carousel_name }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="warning"
          :icon="Edit"
          circle
          color="#342235"
          @click="clickShowModifyDialog(scope.row)"
        ></el-button>
        <el-popconfirm
          cancel-button-text="不删了"
          confirm-button-text="删除"
          confirm-button-type="danger"
          title="确定删除当前轮播图?"
          @confirm="deleteCarousel(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加轮播图对话框 -->
  <el-dialog width="500px" v-model="data.showAddDialog" title="添加轮播图" @close="closeAddDialog">
    <el-form ref="CarouselFrom" :model="data.CarouselFrom" :rules="data.CarouselFromRules">
      <el-form-item label="轮播图标题" prop="carousel_name">
        <el-input v-model="data.CarouselFrom.carousel_name"></el-input>
      </el-form-item>
      <el-form-item label="轮播图照片">
        <el-row>
          <el-col :span="5">
            <el-upload
              ref="uploadURL"
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
      <el-form-item label="轮播图链接" label-width="30" prop="carousel_link">
        <el-input v-model="data.CarouselFrom.carousel_link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button :icon="Plus" type="warning" color="#342235" @click="submitCarouselFrom">立即添加</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改轮播图对话框 -->
  <el-dialog
    width="500px"
    v-model="data.showCarouselDialog"
    title="修改轮播图"
    @close="closeModifyDialog"
  >
    <el-form ref="CarouselFrom" :model="data.CarouselFrom" :rules="data.CarouselFromRules">
      <el-form-item label="轮播图标题" prop="carousel_name">
        <el-input v-model="data.CarouselFrom.carousel_name"></el-input>
      </el-form-item>
      <el-form-item label="轮播图照片">
        <el-row v-if="!data.CarouselFrom.carousel_src">
          <el-col :span="5">
            <el-upload
              ref="uploadURL"
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
        <el-row v-else class="img">
          <el-col :span="24">
            <el-image :src="data.CarouselFrom.carousel_src"></el-image>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="轮播图链接" label-width="30" prop="carousel_link">
        <el-input v-model="data.CarouselFrom.carousel_link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="5" :pull="2">
            <el-button
              :icon="Plus"
              type="warning"
              color="#342235"
              @click="submitmodifyCarouselFrom"
            >立即修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang='ts'>
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue-demi';
import { ElMessage } from 'element-plus'
import { getCarouselData, addCarouselData, deleteCarouselData, modifyCarouselData } from '../../../api/home'
import { useStore } from 'vuex';

//! 约束接口
interface IDataType {
  carouseldata: Array<any>
  loading: boolean
  showAddDialog: boolean
  showCarouselDialog: boolean
  CarouselFrom: any
  CarouselFromRules: any
  uploadURL: string
  headerObj: any
  disabledUpload: boolean
}

//! 数据
const data = reactive<IDataType>({
  //* 轮播图数据
  carouseldata: [],
  //* 控制加载
  loading: true,
  //* 控制添加对话框
  showAddDialog: false,
  //* 控制修改对话框
  showCarouselDialog: false,
  //* 轮播图表单
  CarouselFrom: {
    carousel_name: '',
    carousel_src: '',
    carousel_link: ''
  },
  //* 轮播图表单验证规则
  CarouselFromRules: {
    carousel_name: [
      {
        required: true,
        message: '请输入轮播图标题',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 15,
        message: '博文标题长度在2到10之间',
        trigger: 'blur',
      },
    ],
    carousel_link: [
      {
        required: true,
        message: '请输入轮播图链接',
        trigger: 'blur',
      },
    ]
  },
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

//! 获取ref
const CarouselFrom = ref<any>(null)
const uploadURL = ref<any>(null)

//! 方法
//* 获取轮播图数据
const getCarouselDatas = async () => {
  try {
    const res = await getCarouselData()
    const arr = res.data.result.list
    for (const i of arr) {
      i.carousel_src = store.state.ImgBaseUrl + i.carousel_src
    }
    data.carouseldata = arr
    data.loading = false
  } catch (err) {
    ElMessage.error('获取轮播图数据失败')
  }
}
//* 图片上传成功时的钩子
const successImg = (file: any) => {
  ElMessage({
    message: '图片上传成功',
    type: 'success',
  })
  data.disabledUpload = true
  data.CarouselFrom.carousel_src = file.result.file_path
}
//* 图片上传失败时的钩子
const errorImg = () => {
  ElMessage.error('图片上传失败')
}
//* 点击添加轮播图
const clickShowAddDialog = () => {
  data.showAddDialog = true
}
//* 关闭添加对话框时的回调
const closeAddDialog = () => {
  data.CarouselFrom = {}
  uploadURL.value.clearFiles()
  getCarouselDatas()
}
//* 关闭修改对话框时的回调
const closeModifyDialog = () => {
  data.CarouselFrom = {}
  getCarouselDatas()
}
//* 添加轮播图提交表单
const submitCarouselFrom = () => {
  CarouselFrom.value.validate((vaild: any) => {
    if (!vaild) return
    addCarouselData(
      data.CarouselFrom.carousel_name,
      data.CarouselFrom.carousel_src,
      data.CarouselFrom.carousel_link
    ).then(() => {
      ElMessage({
        message: '轮播图添加成功',
        type: 'success',
      })
      data.showAddDialog = false
    }).catch(() => {
      ElMessage.error('轮播图添加失败')
    })
  })
}
//* 确定删除
const deleteCarousel = (id: any) => {
  deleteCarouselData(id).then(() => {
    ElMessage({
      message: '轮播图删除成功',
      type: 'success',
    })
    getCarouselDatas()
  }).catch(() => {
    ElMessage.error('轮播图删除失败')
  })
}
//* 点击修改轮播图
const clickShowModifyDialog = (file: any) => {
  data.showCarouselDialog = true
  data.CarouselFrom = file
}
//* 修改轮播图提交表单
const submitmodifyCarouselFrom = () => {
  CarouselFrom.value.validate((vaild: any) => {
    if (!vaild) return
    const img = data.CarouselFrom.carousel_src.split('/')[4]
    modifyCarouselData(
      data.CarouselFrom.id,
      data.CarouselFrom.carousel_name,
      img,
      data.CarouselFrom.carousel_link
    ).then(() => {
      ElMessage({
        message: '轮播图修改成功',
        type: 'success',
      })
      data.showCarouselDialog = false
      getCarouselDatas()
    }).catch(() => {
      ElMessage.error('轮播图修改失败')
    })
  })
}

//! 生命周期函数
onMounted(getCarouselDatas)
</script>

<style scoped lang="scss">
.image {
  width: 200px;
  height: 100px;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>

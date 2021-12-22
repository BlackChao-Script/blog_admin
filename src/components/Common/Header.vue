<template>
   <div class="header">
      <!-- 展开菜单控制栏 -->
      <div @click="toggleCollapse">
         <div class="header_icon" v-if="!store.state.showAsideMenu">
            <el-icon>
               <fold />
            </el-icon>
         </div>
         <div class="header_icon" v-else>
            <el-icon>
               <expand />
            </el-icon>
         </div>
      </div>
      <!-- 用户区 -->
      <div class="header_user">
         <!-- 用户图标 -->
         <div class="user_box">
            <div class="user_icon">
               <el-icon>
                  <avatar />
               </el-icon>
            </div>
            <div class="user_name">{{ store.state.userName }}</div>
         </div>
         <!-- 用户操作区 -->
         <div class="user_icona">
            <el-popover
               placement="bottom"
               :width="50"
               trigger="click"
               @after-enter="showIconMethod"
               @after-leave="showIconMethod"
            >
               <template #reference>
                  <div class="arrow_icon" v-if="!showIcon">
                     <el-icon>
                        <arrow-down />
                     </el-icon>
                  </div>
                  <div class="arrow_icon" v-else>
                     <el-icon>
                        <arrow-up />
                     </el-icon>
                  </div>
               </template>
               <el-row justify="center" align="middle">
                  <el-col :span="4" :push="4">
                     <div class="icona_icon">
                        <el-icon>
                           <lock />
                        </el-icon>
                     </div>
                  </el-col>
                  <el-col :span="20" :push="4" class="next" @click="modifyPassword">修改密码</el-col>
               </el-row>
               <el-row justify="center" align="middle">
                  <el-col :span="4" :push="4">
                     <div class="icona_icon">
                        <el-icon>
                           <edit />
                        </el-icon>
                     </div>
                  </el-col>
                  <el-col :span="20" :push="4" @click="nextLogin" class="next">退出登录</el-col>
               </el-row>
            </el-popover>
         </div>
      </div>
      <!-- 修改分类对话框 -->
      <el-dialog
         width="500px"
         v-model="showModifyPassowrd"
         title="修改分类"
         @open="openModifySortDialog"
         @close="closeModifySortDialog"
      >
         <el-form ref="ModifyPasswordFrom" :model="userDataForm" :rules="userDataFormRules">
            <el-form-item label="用户名" label-width="80px">
               <el-input disabled v-model="userDataForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" label-width="80px" prop="password">
               <el-input v-model="userDataForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
               <el-row type="flex" justify="end">
                  <el-col :span="5" :pull="2">
                     <el-button
                        :icon="Plus"
                        type="warning"
                        color="#342235"
                        @click="submitModifyPasswordFrom"
                     >立即修改</el-button>
                  </el-col>
               </el-row>
            </el-form-item>
         </el-form>
      </el-dialog>
   </div>
</template>

<script setup lang='ts'>
import {
   Lock,
   Edit,
   Avatar,
   Fold,
   Expand,
   ArrowDown,
   ArrowUp,
   Plus
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { modifyPasswordData } from '../../api/login'
import { ElMessage } from 'element-plus'

//! 使用vuex
const store = useStore()

//! 使用router
const $router = useRouter()

//! 数据
//* 控制上下三角形图标
const showIcon = ref<Boolean>(false)
//* 控制修改密码对话框
const showModifyPassowrd = ref<Boolean>(false)
//* 用户信息表单
const userDataForm = reactive<any | object>({
   user_name: '',
   password: ''
})
//* 用户信息表单验证规则
const userDataFormRules = reactive<any | object>({
   password: [
      {
         required: true,
         message: '请输入修改的密码',
         trigger: 'blur',
      },
   ],
})

//! 获取ref
const ModifyPasswordFrom = ref<any>(null)

//! 方法
//* 控制菜单的展开
const toggleCollapse = () => {
   store.state.showAsideMenu = !store.state.showAsideMenu
}
//* 修改密码对话框打开时的钩子
const openModifySortDialog = () => {
   userDataForm.user_name = store.state.userName
}
//* 修改密码对话框关闭时的钩子
const closeModifySortDialog = () => {

}
//* 退出登录
const nextLogin = () => {
   $router.push('/login')
   window.sessionStorage.setItem('path', '/home/systemIntroduction')
   window.sessionStorage.removeItem('token')
   store.state.DefaultActive = window.sessionStorage.getItem('path')

}
//* 修改密码
const modifyPassword = () => {
   showModifyPassowrd.value = true
}
//* 提交修改密码表单
const submitModifyPasswordFrom = () => {
   ModifyPasswordFrom.value.validate((vaild: any) => {
      if (!vaild) return
      modifyPasswordData(userDataForm.password).then(() => {
         ElMessage({
            message: '修改密码成功',
            type: 'success',
         })
         showModifyPassowrd.value = false
         userDataForm.password = ''
      }).catch(() => {
         ElMessage.error('修改密码失败')
      })
   })
}
//* 控制弹出框图标
const showIconMethod = () => {
   showIcon.value = !showIcon.value
}
store.state.userName = window.sessionStorage.getItem('usename')
</script>

<style scoped lang="scss">
.header {
   color: #342235;
   line-height: 60px;
   position: relative;
   display: flex;
   align-items: center;
   .header_icon {
      cursor: pointer;
      font-size: 25px;
   }
   .header_user {
      position: absolute;
      font-size: 20px;
      right: 0;
      display: flex;
      .user_box {
         display: flex;
         align-items: center;
         .user_icon {
            margin-top: 3px;
            margin-right: 5px;
         }
      }

      .user_icona {
         display: flex;
         align-items: center;
         margin: 0 10px;
      }
   }
}
.icona_icon {
   font-size: 18px;
   line-height: 100%;
}
.el-row {
   margin-top: 10px;
}
.next {
   cursor: pointer;
}
.arrow_icon {
   cursor: pointer;
}
</style>

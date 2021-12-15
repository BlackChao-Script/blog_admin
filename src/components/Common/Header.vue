<template>
   <div class="header">
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
      <div class="header_user">
         <div class="user_icon">
            <el-icon>
               <avatar />
            </el-icon>
         </div>
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
                           <user />
                        </el-icon>
                     </div>
                  </el-col>
                  <el-col :span="20" :push="4">{{ store.state.userName }}</el-col>
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
   </div>
</template>

<script setup lang='ts'>
import {
   User,
   Edit,
   Avatar,
   Fold,
   Expand,
   ArrowDown,
   ArrowUp
} from '@element-plus/icons-vue'
import { ref } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

//! 使用vuex
const store = useStore()
//! 使用router
const $router = useRouter()
//! 数据
const showIcon = ref<Boolean>(false)
//! 方法
//* 控制菜单的展开
const toggleCollapse = () => {
   store.state.showAsideMenu = !store.state.showAsideMenu
}
//* 退出登录
const nextLogin = () => {
   $router.push('/login')
   window.sessionStorage.setItem('path', '/home/systemIntroduction')
   window.sessionStorage.removeItem('token')
   store.state.DefaultActive = window.sessionStorage.getItem('path')

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
      .user_icon {
         margin-right: 5px;
      }
      .user_icona {
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

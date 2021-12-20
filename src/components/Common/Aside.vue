<template>
  <el-aside :width="store.state.showAsideMenu ? '64px' : '200px'">
    <div class="aside_heard">
      <div class="heard_img">
        <img src="../../assets/img/uugai.com-1038391-16393953222477.png" />
      </div>
      <div class="heard_title" v-if="!store.state.showAsideMenu">blog_admin</div>
    </div>
    <el-menu
      :collapse-transition="false"
      :collapse="store.state.showAsideMenu"
      active-text-color="#c15b56"
      background-color="#342235"
      class="el-menu-vertical-demo"
      :default-active="store.state.DefaultActive"
      text-color="#fff"
      :router="true"
      @select="SavePath"
      :unique-opened="true"
    >
      <!-- 仪表盘 -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <stopwatch />
          </el-icon>
          <span>Dashboard</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/systemIntroduction">
            <template #title>
              <el-icon>
                <DataAnalysis />
              </el-icon>
              <span>系统介绍</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 博文 -->
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <folder />
          </el-icon>
          <span>博文</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/blogadmin">
            <template #title>
              <el-icon>
                <document />
              </el-icon>
              <span>博文文件管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/blogadmindet">
            <template #title>
              <el-icon>
                <document-checked />
              </el-icon>
              <span>博文详细管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/addblog">
            <template #title>
              <el-icon>
                <plus />
              </el-icon>
              <span>添加(修改)博文</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/addblogdet">
            <template #title>
              <el-icon>
                <plus />
              </el-icon>
              <span>添加博文详细</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 分类 -->
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <files />
          </el-icon>
          <span>分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/sortaddmin">
            <template #title>
              <el-icon>
                <document />
              </el-icon>
              <span>分类管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 首页 -->
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <grid />
          </el-icon>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/carouseladdmin">
            <template #title>
              <el-icon>
                <trend-charts />
              </el-icon>
              <span>轮播图管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/introductionaddmin">
            <template #title>
              <el-icon>
                <coffee-cup />
              </el-icon>
              <span>简介管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/iconaddmin">
            <template #title>
              <el-icon>
                <coffee-cup />
              </el-icon>
              <span>个人图标管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 关于我 -->
      <el-sub-menu index="5">
        <template #title>
          <el-icon>
            <user />
          </el-icon>
          <span>关于我</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/modifyaboutme">
            <template #title>
              <el-icon>
                <iphone />
              </el-icon>
              <span>修改我的信息</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 评论 -->
      <el-sub-menu index="6">
        <template #title>
          <el-icon>
            <chat-dot-round />
          </el-icon>
          <span>评论</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index>
            <template #title>
              <el-icon>
                <chat-line-round />
              </el-icon>
              <span>管理评论</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 系统管理 -->
      <el-sub-menu index="7">
        <template #title>
          <el-icon>
            <setting />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <template #title>
              <el-icon>
                <lock />
              </el-icon>
              <span>修改密码</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang='ts'>
import {
  Stopwatch,
  Folder,
  DataAnalysis,
  Document,
  DocumentChecked,
  Grid,
  TrendCharts,
  CoffeeCup,
  User,
  Iphone,
  Lock,
  Setting,
  Plus,
  Files,
  ChatDotRound,
  ChatLineRound
} from '@element-plus/icons-vue'
import { useStore } from 'vuex';

//! 使用vuex
const store = useStore()

//! 方法
//* 保存当前路径
const SavePath = (index: any) => {
  window.sessionStorage.setItem('path', index)
}
if (window.sessionStorage.getItem('path')) {
  store.state.DefaultActive = window.sessionStorage.getItem('path')
} else {
  store.state.DefaultActive = '/home/systemIntroduction'
}

</script>

<style scoped lang="scss">
.el-aside {
  .el-menu {
    height: 100vh;
    border-right: 0 !important;
  }
  .aside_heard {
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #342235;
    .heard_img {
      width: 65px;
      height: 55px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .heard_title {
      font-size: 17px;
      font-weight: 600;
    }
  }
}
</style>

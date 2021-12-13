<template>
  <el-aside width="200px">
    <div class="aside_heard">
      <div class="heard_img">
        <img src="../assets/img/uugai.com-1038391-16393953222477.png" />
      </div>
      <div class="heard_title">blog_admin</div>
    </div>
    <el-menu
      active-text-color="#c15b56"
      background-color="#342235"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      :default-openeds="data.openedsArr"
    >
      <el-menu-item index="1">
        <template #title>
          <el-icon>
            <data-analysis />
          </el-icon>
          <span>系统简介</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <folder />
          </el-icon>
          <span>博文管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <template #title>
              <el-icon>
                <document />
              </el-icon>
              <span>博文文件管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template #title>
              <el-icon>
                <document-checked />
              </el-icon>
              <span>博文详细管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <grid />
          </el-icon>
          <span>首页管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <template #title>
              <el-icon>
                <trend-charts />
              </el-icon>
              <span>轮播图管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2">
            <template #title>
              <el-icon>
                <coffee-cup />
              </el-icon>
              <span>简介管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <user />
          </el-icon>
          <span>关于我管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <template #title>
              <el-icon>
                <iphone />
              </el-icon>
              <span>修改我的信息</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="5">
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
  Setting
} from '@element-plus/icons-vue'
import { reactive } from 'vue-demi';
//! 约束接口
interface IDataType {
  openedsArr: Array<string>
}
const data = reactive<IDataType>({
  openedsArr: ['2', '3', '4', '5']
})
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
      width: 90px;
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

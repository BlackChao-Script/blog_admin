<template>
  <div class="content_box">
    <el-card>
      <div class="box_title">系统介绍</div>
      <div class="box_text">blog_admin 是一个管理个人博客的管理系统,基于 Node.js、Vue3 相关技术栈开发,主要供学习用。</div>
    </el-card>
    <div class="blogdata_box">
      <el-row type="flex" justify="space-around">
        <el-col :span="7">
          <el-card class="box_item">
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <div class="item_icon a_color">
                  <el-icon>
                    <document />
                  </el-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_content">
                  <div class="content_title">博文总数</div>
                  <div class="content_number">{{ store.state.blogLength }}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="box_item">
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <div class="item_icon b_color">
                  <el-icon>
                    <files />
                  </el-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_content">
                  <div class="content_title">分类总数</div>
                  <div class="content_number">{{ store.state.sortLength }}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="box_item">
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <div class="item_icon c_color">
                  <el-icon>
                    <chat-dot-round />
                  </el-icon>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_content">
                  <div class="content_title">评论总数</div>
                  <div class="content_number">{{ store.state.leavewordLength }}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-card class="box">
          <el-row type="flex">
            <el-col :span="10">
              <div class="box_title">前端选型</div>
              <ul>
                <li
                  class="box_technical"
                  v-for="(item,index) in data.technicalList"
                  :key="index"
                >{{ item }}</li>
              </ul>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="box">
          <div class="box_title">后端选型</div>
          <ul>
            <li
              class="box_technical"
              v-for="(item,index) in data.technicalLista"
              :key="index"
            >{{ item }}</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <div class="box_title">联系作者</div>
      <ul>
        <li>邮箱: c199188177@163.com</li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { Document, Files, ChatDotRound } from '@element-plus/icons-vue'
import { reactive } from 'vue-demi';
import { useStore } from 'vuex';
import { getMdData } from '../../../api/md'
import { getLeaveWordData } from '../../../api/leaveWord'
import { getSortData } from '../../../api/sort'
import { onMounted } from 'vue-demi';

//! 约束接口
interface IDataType {
  technicalList: Array<any>
  technicalLista: Array<any>
}

//! 数据
const data = reactive<IDataType>({
  //* 前端
  technicalList: ['Vue 3.x', 'Vue-router', 'Vuex', 'Vite 2.x', 'Element-Plus', 'Ts', "Axios"],
  //* 后端
  technicalLista: ['Node.js', 'Koa2', 'MySQL', "Sequelize"]
})

//! 使用vuex
const store = useStore()

//! 生命周期函数
onMounted(async () => {
  //* 获取博文总数
  const blog = await getMdData(1, 6)
  store.state.blogLength = blog.data.result.total
  //* 获取分类总数
  const sort = await getSortData()
  store.state.sortLength = sort.data.result.list.length
  //* 获取评论总数
  const leaveword = await getLeaveWordData()
  store.state.leavewordLength = leaveword.data.result.length
})
</script>

<style scoped lang="scss">
.content_box {
  .blogdata_box {
    .box_item {
      .item_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        font-size: 50px;
        border-radius: 10%;
        transition: all 0.5s;
      }
      .a_color {
        color: #c15b56;
        &:hover {
          color: #fff;
          background-color: #c15b56;
        }
      }
      .b_color {
        color: #36a3f7;
        &:hover {
          color: #fff;
          background-color: #36a3f7;
        }
      }
      .c_color {
        color: #34bfa3;
        &:hover {
          color: #fff;
          background-color: #34bfa3;
        }
      }
    }
    .item_content {
      .content_title {
        color: #8c8c8c;
        font-size: 17px;
        font-weight: 600;
        margin-top: 15px;
      }
      .content_number {
        margin-top: 20px;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .box_title {
    margin-top: 30px;
    color: #342235;
    font-size: 16px;
    font-weight: 600;
  }
  .box_text {
    margin-top: 20px;
  }
}
.box {
  height: 250px;
}
</style>

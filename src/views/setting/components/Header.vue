<template>
  <div class="app-header">
    <div class="left">
      <img class="logo" :src="logoUrl">
      <h1 class="title">系统设置</h1>
    </div>
    <div class="right">
      <a-popover trigger="hover" placement="bottomRight" v-model:visible="visible">
        <template #content>
          <a-menu>
            <a-menu-item key="1" @click="showPersonDetail">个人信息</a-menu-item>
            <a-menu-item key="2" @click="backToDashboard">返回知识库</a-menu-item>
            <a-menu-item key="3" @click="userSignOut">退出登录</a-menu-item>
          </a-menu>
        </template>
        <a-avatar
            size="large"
            :src="userInfo.avatar"
        />
      </a-popover>
    </div>
  </div>
</template>

<script setup>
import {ref, inject, watch, provide, onMounted} from 'vue'
import {useRouter} from "vue-router";
import {userLogout} from '@/api/user';
const showMenu = ref(false)
const logoUrl = '' // 替换成自己的头像地址


const router = useRouter();
const backToDashboard = () => {
  router.push('/home')
}

import userApi from '@/api/user'

let userInfo = ref({});
onMounted(() => {
  getUserInfo();
});


const getUserInfo = () => {
  userApi.getSelfUserInfo().then((json) => {
    userInfo.value = json.data
  })
}

const userSignOut = () => {
  userLogout().then(() => {
    location.reload();
  });
}

</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
}

.left {
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
  margin-right: 20px;
}

.title {
  font-size: 18px;
  color: #333;
  margin: 0;
  line-height: 1;
}

.setting {
  margin-left: 20px;
  color: #999;
  font-size: 14px;
}

.right {
  display: flex;
  align-items: center;
}
</style>

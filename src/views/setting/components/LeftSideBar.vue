<template>
  <el-menu
      :default-active="activeMenu"
      router
  >
    <el-menu-item index="/setting/userInfo">
      <el-icon><icon-menu /></el-icon>
      <span>个人信息</span>
    </el-menu-item>
    <el-sub-menu>
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/setting/user">用户设置</el-menu-item>
      <el-menu-item index="/setting/role">角色设置</el-menu-item>
      <el-menu-item index="/setting/menu">权限设置</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const activeMenu = ref(''); // 存储当前激活的菜单项的路由路径
const router = useRouter();

onMounted(() => {
  activeMenu.value = router.currentRoute.value.path; // 初始化时设置当前路由路径
});

watch(
    () => router.currentRoute.value,
    (to, from) => {
      activeMenu.value = to.path; // 监听路由变化，更新当前激活的菜单项的路由路径
    }
);

</script>

<style scoped>

</style>

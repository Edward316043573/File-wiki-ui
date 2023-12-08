<template>
  <router-view/>
  <div>
    test
  </div>
</template>

<script>

</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app, .el-container, .el-menu {
  height: 100%;
}

.el-header {
  background-color: #1D4E89 !important;
}

.header-right-user-name {
  color: #fff;
  padding-right: 5px;
}

.el-menu-vertical {
  border-right: 0;
  background: #fafafa;
}

.el-menu-vertical .el-menu {
  background: #fafafa;
}

.el-header {
  background-color: #409EFF;
  color: #333;
  line-height: 40px;
  text-align: right;
  height: 40px !important;
}

.menu-box {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  background: #fafafa;
}

.menu-box .i-icon {
  line-height: 1;
  margin-right: 5px;
}
</style>

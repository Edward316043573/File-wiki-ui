<template>
    <el-card style="margin: 4px; height: 100%">
      <el-container>
        <el-header style="padding: 0">
          <Header/>
        </el-header>
        <a-divider style="margin: 0px;"></a-divider>
        <el-container style="height: 100%;">
          <el-aside style="width: 250px;">
            <LeftSideBar ref="leftSideBarRef"/>
          </el-aside>

          <el-main style="padding: 0;">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </el-card>
</template>

<script setup>
import {useStoreDisplay} from '@/stores/wikiDisplay.js'
import Header from './components/Header.vue'
import LeftSideBar from './components/LeftSideBar.vue'
import {onMounted, provide, ref} from "vue";

</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.global-layout-vue {
  height: 100%;
}

.hidTree {
  display: none;
}

#app,
.el-container,
.el-menu {
  height: 100%;
}


.header-right-user-name {
  color: #000000;
  vertical-align: middle;
}

.el-header {
  color: #333;
  height: 60px !important;
  border-bottom: 0.5px solid #eaeaea;
}

.head-icon {
  margin-right: 15px;
  margin-top: 15px;
  font-size: 16px;
  cursor: pointer;
  color: #000000;
  vertical-align: middle;
}

.header-user-message .page-info-box {
  text-align: right;
  margin-top: 10px;
}

.upgrade-info {
  max-height: 150px;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 26px;
}

.search-option-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-option-item .title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-option-item .content {
  font-size: 12px;
  color: #888;
}

.search-autocomplete {
  width: 600px !important;
}
</style>

<style lang="scss">
.space-folder-box {
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
}

.wiki-page-tree-box {
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 30px;

  .el-tree-node__content {
    height: 35px;
    position: relative;

    .page-tree-node {
      width: 100%;

      .label {
        .el-icon {
          vertical-align: middle;
        }

        .text {
          margin-left: 5px;
          vertical-align: middle;

          max-width: calc(100% - 40px);
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .rename-input {
        width: 90%;
      }

      .page-action-box {
        position: absolute;
        right: 0;
        top: 0;
        height: 35px;
        line-height: 35px;
        background: #fff;
        border-radius: 4px;
        display: none;

        .page-action-dropdown-btn {
          padding: 0 8px;
          height: 35px;
          margin-top: -1px;
        }

        .el-button + .el-button {
          margin-left: 0;
        }
      }

      .page-action-box.renaming {
        display: none !important;
      }
    }

    &:hover .page-action-box {
      display: block;
    }
  }
}
</style>

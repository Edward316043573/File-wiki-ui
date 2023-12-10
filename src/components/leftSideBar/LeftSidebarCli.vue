<template>
  <div style="padding: 10px;height: 100%;box-sizing: border-box;background: #fafafa;">
    <div>
      <!--    头像框   -->
      <el-row style="margin-bottom: 1px" :gutter="30">
        <el-col span="16">
          <el-image style=" width: 120px; height: 50px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :fit="fit"/>
        </el-col>
        <el-col :span="8" style="margin-left: 35px; display: flex; justify-content: flex-end">
          <a-dropdown placement="bottom" overlayClassName="header-action-user-dropdown">
					<span>
						<el-button style="height: 50px; width: 50px;" text color="#f6fafe">
              <el-avatar :src="avatarUrl"/>
            </el-button>
					</span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="showUserDetail">账户设置</a-menu-item>
                <!--                <a-menu-item v-if="this.$hasPermission(permissionList, '管理员系统权限')" @click="showConsole">管理员系统</a-menu-item>-->
                <a-menu-divider/>
                <a-menu-item @click="showAbout">关于</a-menu-item>
                <a-menu-item @click="userSignOut">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </el-col>
      </el-row>
    </div>

    <div style="margin-bottom: 5px">
      <el-select :model-value="choiceSpace" filterable placeholder="选择空间" @change="spaceChangeEvents"
                 style="width: 100%">
        <el-option-group label="" v-if="!props.readOnly">
          <el-option :key="-1" label="空间管理" :value="-1"></el-option>
        </el-option-group>
        <el-option-group label=""></el-option-group>
        <el-option v-for="item in spaceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <el-autocomplete v-model="searchKeywords" v-if="!props.readOnly" :fetch-suggestions="doSearchByKeywords"
                     placeholder="在当前空间搜索"
                     popper-class="search-autocomplete" style="width: 100%; margin: 10px 0"
                     @select="handleSearchKeywordsSelect">
      <template v-slot="{ item }">
        <div class="search-option-item">
          <div class="title">
            <span v-html="item.pageTitle || '-'"></span>
          </div>
          <span class="content" v-html="item.previewContent || '-'"></span>
        </div>
      </template>
    </el-autocomplete>
    <div class="space-folder-box" v-if="!props.readOnly">
      <el-row justify="space-between">
        <el-col :span="12">
          <el-tooltip style="margin: 4px" effect="dark" :content="descriptorForTree" placement="top">
            <span style="color:#888;font-size: 12px;cursor: pointer;line-height: 32px;" @click="changeDropWownStatus">空间目录</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <slot name="addMenuDir"/>
        </el-col>
      </el-row>
    </div>
    <div class="wiki-page-tree-box">
      <el-tree :class="explanClass"
               ref="wikiPageTreeRef"
               :current-node-key="props.nowPageId"
               :data="props.wikiPageList"
               :default-expanded-keys="wikiPageExpandedKeys"
               :expand-on-click-node="true"
               :filter-node-method="filterPageNode"
               :props="defaultProps"
               :draggable="!props.readOnly"
               highlight-current
               node-key="id"
               style="background-color: #fafafa"
               @node-click="handleNodeClick"
               @node-drop="handlePageDrop">
        <template v-if="!props.readOnly" v-slot="{ node, data }">
          <slot name="addMenuNode" :node="node" :data="data"></slot>
        </template>
      </el-tree>
    </div>
  </div>
  <AboutDialog v-model:visible="aboutDialogVisible"/>
</template>

<script setup>
import {ref, defineProps, defineEmits, defineExpose} from 'vue';
import {useRouter, useRoute} from "vue-router";
import AboutDialog from "@/views/common/AboutDialog.vue"
import {pageNews, pageChangeParent} from '@/api/page'
import {useStoreDisplay} from "@/stores/wikiDisplay";
import {useStorePageData} from "@/stores/pageData";

let emit = defineEmits(['doGetPageList', 'spaceChangeEvents', 'setNowPageId'])
let searchKeywords = ref('');
let descriptorForTree = ref("点击收起目录");
let explan = ref(false);
let explanClass = ref("el-tree");
let wikiPageExpandedKeys = ref([]);
let route = useRoute();
let router = useRouter();
let defaultProps = ref({children: 'children', label: 'name',});
let wikiPage = ref({});
let wikiPageTreeRef = ref();
let storeDisplay = useStoreDisplay();
let props = defineProps({
  wikiPageList: Array,
  spaceOptions: Array,
  nowPageId: Number,
  choiceSpace: Number,
  readOnly: Boolean
})

let avatarUrl = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
const assisSetCurrentKey = () => {
  emit('setNowPageId', route.query.pageId, props.readOnly)
  if (props.nowPageId) {
    wikiPageTreeRef.value.setCurrentKey(nowPageId.value)
  }
}

const changeWikiPageExpandedKeys = (pageId) => {
  // 展开没有触发子节点的加载，如果去加载子节点有还找不到当前的node，暂不展开
  // wikiPageExpandedKeys.value= [pageId];
}

const spaceChangeEvents = (data) => {
  emit('spaceChangeEvents', data, props.readOnly)
}

const doSearchByKeywords = (queryString, callback) => {
  if (!queryString || !queryString.trim()) {
    callback([])
    return
  }

  pageNews({spaceId: props.choiceSpace, keywords: queryString})
      .then((json) => {
        let spacePageNews = json.data || []
        callback(spacePageNews)
      })
}
const handleSearchKeywordsSelect = (item) => {
  searchKeywords.value = ''
  router.push({path: '/page/show', query: {pageId: item.pageId}})
}

const changeDropWownStatus = () => {
  if (explan.value) {
    explanClass.value = "el-tree"
    descriptorForTree.value = "点击收起目录"
    explan.value = false
  } else {
    explanClass.value = "hidTree"
    descriptorForTree.value = "点击展开目录"
    explan.value = true
  }
}

const filterPageNode = (value, data) => {
  if (!value || !data.name) return true;
  // issues:I2CG72 忽略大小写
  let name = data.name.toLowerCase();
  return name.indexOf(value.toLowerCase()) !== -1;
}
const searchByKeywords = () => {
  wikiPageTreeRef.value.filter(searchKeywords.value)
}
let storePage = useStorePageData();
const handleNodeClick = (data) => {
  //console.log('点击节点：', data, props.nowPageId)
  storeDisplay.showHeader = true
  emit('setNowPageId', data.id, props.readOnly)
  if (props.readOnly) {
    return
  }
  if (data.editorType !== 0) {
    router.push({path: '/page/show', query: {pageId: data.id}})
  }
}
const handlePageDrop = (draggingNode, dropNode, dropType, ev) => {
  console.log('tree drop: ', draggingNode.data, dropNode.data, dropType)
  // 'prev'、'inner'、'next'
  // before、after、inner
  var param = {id: draggingNode.data.id, parentId: dropNode.data.parentId}
  if (dropType == 'inner') {
    param.parentId = dropNode.data.id
  } else if (dropType == 'before') {
    param.beforeSeq = dropNode.data.seqNo
  } else if (dropType == 'after') {
    param.afterSeq = dropNode.data.seqNo
  }
  pageChangeParent(param).then((res) => {
    emit('doGetPageList', node.id, node)
  })
}
let aboutDialogVisible = ref(false);
const showAbout = () => {
	aboutDialogVisible.value = true;
}
defineExpose({searchByKeywords})

</script>


<style>

</style>

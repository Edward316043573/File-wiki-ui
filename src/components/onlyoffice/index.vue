<template>
  <div class="page-show-vue">
    <el-row type="border-card" style="height: 100%">
      <el-col :span="storeDisplay.commentShow ? 18 : 24"
              style="border-right: 1px solid #f1f1f1;height: 100%;overflow: auto;">
        <div class="report-onlyoffice" id="placeholder"></div>
        <PageZan></PageZan>
      </el-col>
      <el-col :span="6" style="height: 100%" v-show="storeDisplay.commentShow">
        <el-icon @click="closeActionTab" class="close-action-tab">
          <el-icon-close/>
        </el-icon>
        <el-tabs v-model="storeDisplay.commentActiveTab" style="padding: 0 20px;">
          <el-tab-pane label="评论" name="comment">
            <Comment/>
          </el-tab-pane>
          <el-tab-pane label="附件" name="annex">
            <Annex/>
          </el-tab-pane>
          <el-tab-pane label="修改历史" name="history">
            <PageHistory
                :pageHistoryList="pageHistoryList"
                :pageHistoryChoice="pageHistoryChoice"
                :pageHistoryDetail="pageHistoryDetail"
                @historyClickHandle="historyClickHandle"
                @createNavigationHeading="createNavigationHeading"
                @reloadDocument="reloadDocument"
            />
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>


</template>

<script setup>
import {ref, watch, onBeforeMount, onMounted, nextTick, defineEmits, defineProps} from 'vue';
import {onBeforeRouteUpdate, useRouter, useRoute} from "vue-router";
import {
  createOfficeFile,
  editOfficeFile,
  previewOfficeFile
} from '@/api/onlyoffice.js'
import unitUtil from '@/assets/lib/UnitUtil.js'
import htmlUtil from '@/assets/lib/HtmlUtil.js'
import {useStorePageData} from "@/stores/pageData";
import {useStoreDisplay} from "@/stores/wikiDisplay";
import PageHistory from '@/views/page/show/PageHistory.vue'
import Comment from '@/views/page/show/Comment.vue'
import PageZan from '@/views/page/show/PageZan.vue'
import {Close as ElIconClose} from '@element-plus/icons-vue'
import pageApi from '@/api/page'
import Annex from '@/views/page/show/Annex.vue'
import Navigation from '@/views/page/components/Navigation.vue'

let storeDisplay = useStoreDisplay();
let storePage = useStorePageData();
let docEditor = ref(null);
let platform = ref("desktop");
let fileInfo = ref({userFileId: 1, ot: ''});
// 左侧导航菜单
let navigationList = ref([]);
// 右侧标签页
let pageHistoryDetail = ref('');
let pageShowDetail = ref('');
let pageHistoryChoice = ref({});
let pageHistoryList = ref([]);
let pageHistoryPageNum = ref(1);

const props = defineProps({
  spaceInfo: Object,
});
let emit = defineEmits(['switchSpace', 'changeExpandedKeys', 'loadPageList']);

onBeforeRouteUpdate((to) => {
  initQueryParam(to);
});

onMounted(() => {
  storeDisplay.currentPage = 'view';
  initQueryParam(route);
});
const closeActionTab = () => {
  storeDisplay.commentShow = false;
  clearHistory();
}
const clearHistory = () => {
  pageHistoryChoice.value.loading = 0;
  pageHistoryDetail.value = '';
  pageHistoryChoice.value = {};
  pageHistoryList.value.forEach((item) => (item.loading = 0));
  pageShowDetail.value = pageContent.value.content;
}

const initQueryParam = (to) => {
  fileInfo.value = {
    userFileId: to.query.userFileId,
    ot: to.query.ot
  }
}

let wikiTitleRef = ref();
const createNavigationHeading = () => {
  let navigationListVal = htmlUtil.createNavigationHeading()
  // 标题加到导航里面去
  if (navigationListVal.length > 0) {
    let wikiTile = wikiPage.value.name || 'WIKI-内容展示'
    navigationListVal.unshift({
      level: 1,
      node: wikiTitleRef.value,
      text: wikiTile,
    })
  }
  navigationList.value = navigationListVal;
}
const historyClickHandle = (history) => {
  pageHistoryChoice.value.loading = 0;
  pageHistoryChoice.value = history;
  pageHistoryDetail.value = history.content;
  pageShowDetail.value = history.content;
}

let route = useRoute();
watch(
    () => route.query.userFileId,
    (newValue, oldValue) => {
      if (!newValue || !oldValue) {
        // 如果 route.query.userFileId 不存在，则直接返回或执行其他逻辑
        return;
      }
      // 摧毁之前的元素，以达成切换的目的
      docEditor.destroyEditor();
      initQueryParam(route);
      showDocDetail();
    }
)

onMounted(() => {
  initQueryParam(route)
  nextTick(() => {
    switch (fileInfo.value.ot) {
        // 添加
      case 'add':
        initOnlyoffice()
        break
        // 编辑
      case 'edit':
        editDoc()
        break
        // 详情
      case 'detail':
        showDocDetail()
        break
    }
  })
})

/**
 * 判断当前平台
 */
const judgePlatform = () => {
  if (
      /AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
      /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
          navigator.userAgent
      )
  ) {
    if (window.location.href.indexOf('?mobile') < 0) {
      try {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          platform.value = 'mobile'
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

onBeforeMount(judgePlatform)

/**
 * 初始化 onlyoffice
 */
const initOnlyoffice = () => {
  let data = {
    userFileId: fileInfo.userFileId,
    fileId: fileInfo.fileId,
    fileName: fileInfo.fileName,
    filePath: fileInfo.filePath,
    fileCategory: fileInfo.fileCategory,
    type: fileInfo.type,
    memo: fileInfo.memo
  }
  createOfficeFile(data).then((res) => {
    if (res.code === 200) {
      let config = {
        ...res.data.file,
        type: platform
      }
      // config.editorConfig.callbackUrl = config.editorConfig.callbackUrl.replace('/IndexServlet', ONLYOFFICE_BASE_URL + '/IndexServlet')
      initDocEditor(res.data.docserviceApiUrl, config)
    }
  })
}

/**
 * 初始化文档编辑器
 * @param {string} docserviceApiUrl 文档服务API url
 * @param {object} config 文件相关配置信息
 */
const initDocEditor = (docserviceApiUrl, config) => {
  loadOnlyOfficeAPI(docserviceApiUrl).then(() => {
    /* global DocsAPI */
    docEditor = new DocsAPI.DocEditor('placeholder', {
      ...config,
      editorConfig: {
        ...config.editorConfig,
        lang: 'zh', //  语言设置为中文
        customization: {
          ...config.editorConfig.customization,
          zoom: 100 //  缩放比例为 100
        }
      }
    })
  })
}

/**
 * 编辑文档
 */
const editDoc = () => {
  let data = {
    userFileId: fileInfo.value.userFileId,
    previewUrl: fileInfo.value.fileUrl
  }
  editOfficeFile(data).then((res) => {
    if (res.code === 200) {
      // let config = {
      // 	...res.data.file,
      // 	type: this.platform
      // }
      initDocEditor(res.data.docserviceApiUrl, res.data.file)
    }
  })
}

/**
 * 加载 onlyoffice api
 * @return {Promise} 返回 api 加载状态
 */
const loadOnlyOfficeAPI = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject()
    }
  })
}

/**
 * 展示文档详情
 */
// 页面展示相关
let wikiPage = ref({});
let wikiPageAuth = ref({});
let pageContent = ref({});
let selfUserId = ref(0);
let uploadFileList = ref([]);
let parentPath = ref({});
const showDocDetail = () => {
  let data = {
    userFileId: fileInfo.value.userFileId,
    previewUrl: fileInfo.value.fileUrl
  }
  clearHistory()
  pageApi.pageDetail({id: data.userFileId}).then((json) => {
    let result = json.data || {};
    let wikiPageRes = result.wikiPage || {};
    wikiPageRes.selfZan = result.selfZan || 0;
    wikiPage.value = wikiPageRes;
    pageContent.value = result.pageContent || {};
    storePage.fileList = result.fileList || [];
    selfUserId.value = result.selfUserId || 0;
    wikiPageAuth.value = {
      canEdit: result.canEdit,
      canDelete: result.canDelete,
      canUploadFile: result.canUploadFile,
      canDeleteFile: result.canDeleteFile,
      canConfigAuth: result.canConfigAuth,
    }
    pageShowDetail.value = pageContent.value.content;
    // 修改标题
    document.title = wikiPageRes.name || 'WIKI-内容展示';
    // 修改最后点击的项，保证刷新后点击编辑能展示编辑的项
    // if (!lastClickNode.value.id) {
    // 	lastClickNode.value = {id: wikiPage.id, nodePath: wikiPage.name};
    // }
    // 调用父方法切换选择的空间
    emit('switchSpace', wikiPage.value.spaceId);
    // 调用父方法展开目录树
    emit('changeExpandedKeys', data.userFileId);
    setTimeout(() => {
      createNavigationHeading();
    }, 500);
    storePage.pageInfo = wikiPageRes;
    storePage.pageAuth = wikiPageAuth.value;
  })
  getPageHistory(data.userFileId, 1)
  previewOfficeFile(data).then((res) => {
    if (res.code === 200) {
      // let config = {
      // 	...res.data.file,
      // 	type: this.platform
      // }
      // config.document.permissions.edit = false //  预览模式下编辑权限为 false
      initDocEditor(res.data.docserviceApiUrl, res.data.file)
    }
  })
}

const getPageHistory = (pageId, pageNum) => {
  if (pageNum === 1) {
    pageHistoryList.value = [];
    pageHistoryPageNum.value = 1;
  }
  let param = {pageId: pageId, page: pageNum};
  pageApi.pageHistoryList(param).then((json) => {
    let historyList = json.data.records || [];
    if (historyList.length <= 0) {
      pageHistoryPageNum.value = 0;
    } else {
      historyList.forEach((item) => (item.loading = 0));
      pageHistoryList.value = pageHistoryList.value.concat(historyList);
    }
  })
}

const reloadDocument = (url) => {
  docEditor.destroyEditor();
  let data = {
    userFileId: fileInfo.value.userFileId,
    previewUrl: url
  }
  previewOfficeFile(data).then( (res) => {
    if (res.code === 200) {
      initDocEditor(res.data.docserviceApiUrl, res.data.file)
    }
  })
}
</script>

<style scoped>
.report-onlyoffice {
  height: 100%;
  width: 100%;
}

.page-show-vue .icon-collapse {
  float: left;
  font-size: 25px;
  color: #aaa;
  margin-top: 8px;
  cursor: pointer;
}

.page-show-vue .icon-collapse:hover {
  color: #eee;
}

.page-show-vue .wiki-title {
  font-size: 2em;
  text-align: center;
  font-weight: bold;
}

.page-show-vue .create-user-time {
  margin-right: 20px;
}

.page-show-vue .wiki-author {
  font-size: 14px;
  color: #888;
  padding: 20px 0;
  height: 40px;
  line-height: 40px;
}

.page-show-vue .wiki-page-content img {
  cursor: pointer;
  max-width: 100%;
}

.page-show-vue .wiki-page-content img:hover {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
}

.page-show-vue .upload-page-file .el-upload-list {
  display: none;
}

.page-show-vue .is-link {
  color: #1e88e5;
  cursor: pointer;
}

.page-show-vue #newPageContentDiv .w-e-text-container {
  height: 600px !important;
}

.page-show-vue .head {
  float: left;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 10px;
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
}

.page-show-vue .el-tabs__header {
  margin: 0;
}

.page-show-vue .el-tabs__nav-wrap {
  padding: 0 20px;
}

.page-show-vue .close-action-tab {
  position: absolute;
  right: 15px;
  top: 12px;
  cursor: pointer;
  z-index: 1;
}

.page-show-vue .action-tab-box {
  height: calc(100vh - 120px);
  overflow: auto;
  padding: 20px 10px;
}

.page-show-vue .action-box-empty {
  text-align: center;
  padding-top: 30px;
  color: #888;
  font-size: 14px;
}

.page-show-vue .history-item {
  height: 55px;
  line-height: 25px;
  cursor: pointer;
  vertical-align: middle;
}

.page-show-vue .history-loading-status {
  margin-left: 5px;
  color: #67c23a;
}

.page-show-vue .history-loading-status.el-icon-circle-close {
  color: #f56c6c;
}

.page-show-vue .el-timeline {
  padding-inline-start: 0;
}

.page-show-vue .markdown-body table {
  display: table;
}

.mobile-qr {
  width: 250px;
  height: 250px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 5px;
}


</style>

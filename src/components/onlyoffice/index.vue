<template>
  <div class="report-onlyoffice">
    <div id="placeholder"></div>
  </div>
</template>

<script setup>
import {ref, watch, onBeforeMount, onMounted, nextTick} from 'vue';
import {onBeforeRouteUpdate, useRouter, useRoute} from "vue-router";
import {
  createOfficeFile,
  editOfficeFile,
  previewOfficeFile
} from '@/api/onlyoffice.js'



let docEditor = ref(null);
let platform = ref("desktop");
let fileInfo = ref({userFileId: 1, ot: ''});
onBeforeRouteUpdate((to) => {
  initQueryParam(to);
});

const initQueryParam = (to) => {
  fileInfo.value = {
    userFileId: to.query.userFileId,
    ot: to.query.ot
  }
}



let route = useRoute();
// TODO 现在这里watch的是整个路由，完美一点就是监听路由里的userFileId和ot 目前没时间搞
watch(route,() => {
  // 摧毁之前的，以达成切换的目的
  docEditor.destroyEditor()
  initQueryParam(route);
  showDocDetail();
},{
  deep: true
})

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
const initOnlyoffice= () => {
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
const editDoc =() =>{
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
const showDocDetail = () => {
  let data = {
    userFileId: fileInfo.value.userFileId,
    previewUrl: fileInfo.value.fileUrl
  }
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
</script>

<style scoped>
.report-onlyoffice {
  height: 100%;
  width: 100%;
}
</style>

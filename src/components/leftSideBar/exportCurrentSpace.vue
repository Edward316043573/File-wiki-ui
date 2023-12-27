<template>
  <a-dropdown>
    <a-tooltip placement="topLeft" title="将此空间导出为电子书" arrow-point-at-center>
      <el-button :icon="Management" text class="exportCurrentSpace"></el-button>
    </a-tooltip>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="exportPDF(1)">
          <el-icon><FolderOpened /></el-icon>
          本地目录形式
        </a-menu-item>
        <a-menu-item key="2" @click="exportPDF(2)">
          <CloudDownloadOutlined /> 附件下载形式
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup>
import {
  Management,
  FolderOpened
} from '@element-plus/icons-vue'
import { CloudDownloadOutlined} from '@ant-design/icons-vue';
import fileApi from '@/api/fileApi.js'
import {useStoreSpaceData} from "@/stores/spaceData";
import { ElLoading, ElNotification  } from 'element-plus'

let storeSpace = useStoreSpaceData();
const exportPDF = (flag) => {
  const loading = ElLoading.service({
    lock: true,
    text: '正在处理中，请勿关闭界面',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  if (flag === 1) {
    // 附件形式
    fileApi.getPDFStorePath(storeSpace.chooseSpaceId).then((res) => {
      loading.close()
      ElNotification({
        title: 'Success',
        message: 'PDF生成成功,请前往本机：' + res.data.path + '查看',
        type: 'success',
      })
    }).catch((e) => {
      ElNotification({
        title: 'Error',
        message: '导出失败' + e.message,
        type: 'error',
      })
    })
  } else if (flag ===2) {
    // 下载形式
    fileApi.downloadPDF(storeSpace.chooseSpaceId).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', storeSpace.chooseSpaceId + '.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      loading.close()
      ElNotification({
        title: 'Success',
        message: 'PDF生成成功，请等待浏览器下载完毕',
        type: 'success',
      })
    }).catch((e) => {
      ElNotification({
        title: 'Error',
        message: '导出失败' + e.message,
        type: 'error',
      })
    })
  }
}

</script>

<style scoped>
.exportCurrentSpace {
  padding: 0 8px;
  height: 35px;
  margin-top: -1px;
}
</style>

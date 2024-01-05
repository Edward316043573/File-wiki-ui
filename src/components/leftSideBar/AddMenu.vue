<template>
	<a-dropdown :trigger="['click']" @click="choosePageIdFunc(props.funcId)">
		<el-button :icon="ElIconPlus" text class="add-menu-dropdown-btn"></el-button>
		<template #overlay>
			<a-menu>
				<a-menu-item key="1" @click="createWiki(1, props.funcId)">
					<IconParkWord fill="#498ba7"/> 创建富文本
				</a-menu-item>
				<a-menu-item key="2" @click="createWiki(2, props.funcId)">
					<IconDocument fill="#558ff2"/> 创建Markdown
				</a-menu-item>
				<a-menu-item key="0" @click="createWiki(0, props.funcId)">
					<FolderOpen fill="#ffd149"/> 创建文件夹
				</a-menu-item>
				<a-menu-item key="4" @click="createWikiByTemplate(props.funcId)">
					<IconParkPageTemplate/> 从模板创建
				</a-menu-item>
				<a-menu-item key="3">
					<el-tooltip content="支持MD，ZIP格式（图片和MD文件请放到同级目录并配置同级相对路径）" placement="right-start" :show-after="300">
						<a-upload v-model:file-list="fileList" name="file" :multiple="false" :customRequest="doAUpload" class="import-upload">
							<IconParkAfferent/> 导入
						</a-upload>
					</el-tooltip>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<script setup>
import {
	Plus as ElIconPlus,
} from '@element-plus/icons-vue'
import {
	FolderOpen,
	Word as IconParkWord,
	Afferent as IconParkAfferent,
	PageTemplate as IconParkPageTemplate,
} from '@icon-park/vue-next'
import {ref, defineProps, defineEmits, createVNode } from 'vue';
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'
import {updatePage} from '@/api/page'
import axios from "axios";
import IconDocument from '@/components/base/IconDocument.vue'
import {useTokenStore} from "../../stores/token";
import {Modal, Input, message} from 'ant-design-vue';

let router = useRouter();
let uploadFileUrl = ref(import.meta.env.VITE_APP_BASE_API + '/wiki/page/file/import/upload');
let fileList = ref([]);
let emit = defineEmits(['choosePageIdFunc', 'doGetPageList', 'createWikiByTemplate'])
let props = defineProps({
	choiceSpace: Number,
	choosePageId: Number,
	nowPageId: Number,
	funcId: Number
});
let tokenStore = useTokenStore();
const doAUpload = (data) => {
	let formData = new FormData();
	formData.append('files', data.file);
	formData.append('pageId', props.choosePageId);
  formData.append('spaceId', props.choiceSpace);

	axios({
		url: uploadFileUrl.value,
		method: 'post',
		data: formData,
		headers: {'Content-Type': 'multipart/form-data','Authorization': tokenStore.token},
		timeout: 100000000,
		withCredentials: true,
	}).then((res) => {
		fileList.value = [];
		if (res.data.code === 200) {
			ElMessage.success('导入成功');
      emit('doGetPageList', null);
		}
		if (res.data.code === 300) {
			ElMessage.warning(res.msg);
			ElMessage.warning('文件太多可能超时，如果是超时，请稍等后刷新查看列表~');
      emit('doGetPageList', null);
		}
    if (res.data.code === 500) {
      ElMessage.error('导入失败：' + res.data.data.info);
    }
	}).catch((e) => {
		fileList.value = [];
		emit('doGetPageList', null);
		ElMessage.error('导入失败：' + e.message);
	});
}
const choosePageIdFunc = (id) => {
	emit('choosePageIdFunc', id)
}

const createWikiByTemplate = (id) => {
	emit('createWikiByTemplate', id)
}
const createWiki = async (editorType, parentId) => {
  if (props.choiceSpace > 0) {
    let name = ref("新建文档");
    if (editorType === 0) {
      name.value = "新建文件夹"
      await new Promise((resolve, reject) => {
        Modal.confirm({
          title: '确认要建立文件夹吗',
          okText: "确认",
          cancelText: "取消",
          content: createVNode(Input, {
            modelValue: name.value,
            onchange: (val) => {
              name.value = val.target.value;
            },
            placeholder: '请输入文件名，不输入则默认为新建文件夹',
          }),
          onOk() {
            resolve();
          },
          onCancel() {
            return
          },
        });
      });
      }
    updatePage({
      spaceId: props.choiceSpace,
      parentId: parentId,
      editorType: editorType,
      name: name.value,
      content: '',
      preview: ''
    }).then((json) => {
      emit('doGetPageList', null)
      ElMessage.success('创建成功')
      if (editorType !== 0) {
        router.push({
          path: '/page/edit',
          query: {parentId: props.nowPageId.value, pageId: json.data.id}
        })
      }
    })
  } else {
    ElMessage.warning('请先选择或创建空间')
  }
}
</script>

<style lang="scss">
.add-menu-dropdown-btn {
  padding: 0 8px;
  height: 35px;
  margin-top: -1px;
}

.import-upload {
  .ant-upload-select {
	display: block;

	.ant-upload {
	  display: block;
	}
  }
}
</style>

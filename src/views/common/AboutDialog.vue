<template>
  <!--关于弹窗-->
  <el-dialog title="关于" v-model="aboutDialogVisible" width="600px" class="about-Eddie-doc">
    <div class="about-content">
      <div class="doc-name">知识库管理平台</div>
      <div class="doc-desc">
        <div class="slogan">知识库管理平台</div>
        <div>当前版本：1.0.0</div>
        <div>
          版权所有 © 2018-2023
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {onBeforeUnmount, ref, shallowRef, watch, onMounted, defineProps, defineEmits, defineExpose} from 'vue'
import {useStoreUserData} from "@/stores/userData";

let storeUser = useStoreUserData();
const props = defineProps({
  visible: Boolean,
});
let aboutDialogVisible = ref(false);
const emit = defineEmits(['update:visible', 'ok']);
watch(aboutDialogVisible, () => {
  emit('update:visible', aboutDialogVisible.value);
});
watch(() => props.visible, () => {
  aboutDialogVisible.value = props.visible;
});
onMounted(() => {
  aboutDialogVisible.value = props.visible;
});
let upgradeInfo = ref({});
</script>

<style lang="scss">
.about-Eddie-doc {
  text-align: left;
  line-height: normal;

  .el-dialog__body {
    padding: 20px;
  }

  .about-content {
    .doc-name {
      font-weight: bold;
      font-size: 25px;
    }

    .doc-desc {
      line-height: 30px;
      padding: 10px 0;

      .slogan {
        margin-bottom: 30px;
      }
    }
  }
}
</style>

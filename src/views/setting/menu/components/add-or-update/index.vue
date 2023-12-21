<template>
  <el-dialog v-model="visible" :title="form.menuId ? '编辑' : '添加'" width="700px" @closed="reset" >
    <el-form ref="menuRef" :model="form" :rules="rules" label-width="100px">
      <el-col :span="24">
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
              v-model="form.parentId"
              :data="menuList"
              :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
              value-key="menuId"
              placeholder="选择上级菜单"
              check-strictly
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="form.menuType">
            <el-radio-button label="M">目录</el-radio-button>
            <el-radio-button label="C">菜单</el-radio-button>
            <el-radio-button label="F">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType != 'F'">
        <el-form-item prop="isFrame">
          <template #label>
                        <span>
                           <el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>是否外链
                        </span>
          </template>
          <el-radio-group v-model="form.isFrame">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType != 'F'">
        <el-form-item prop="path">
          <template #label>
                        <span>
                           <el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           路由地址
                        </span>
          </template>
          <el-input v-model="form.path" placeholder="请输入路由地址"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType == 'C'">
        <el-form-item prop="component">
          <template #label>
                        <span>
                           <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           组件路径
                        </span>
          </template>
          <el-input v-model="form.component" placeholder="请输入组件路径"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType != 'M'">
        <el-form-item prop="perms">
          <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100"/>
          <template #label>
                        <span>
                           <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`hasPermi('system:user:list')`)"
                                       placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           权限字符
                        </span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType == 'C'">
        <el-form-item prop="query">
          <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255"/>
          <template #label>
                        <span>
                           <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           路由参数
                        </span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType == 'C'">
        <el-form-item prop="isCache">
          <template #label>
                        <span>
                           <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           是否缓存
                        </span>
          </template>
          <el-radio-group v-model="form.isCache">
            <el-radio label="0">缓存</el-radio>
            <el-radio label="1">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="form.menuType != 'F'">
        <el-form-item prop="visible">
          <template #label>
                        <span>
                           <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           显示状态
                        </span>
          </template>
          <el-radio-group v-model="form.visible">
            <el-radio
                v-for="dict in sys_show_hide"
                :key="dict.value"
                :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="status">
          <template #label>
                        <span>
                           <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           菜单状态
                        </span>
          </template>
          <el-radio-group v-model="form.status">
            <el-radio
                v-for="dict in sys_normal_disable"
                :key="dict.value"
                :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, reactive, nextTick, computed, onMounted} from 'vue';
import {ElMessage} from "element-plus";
import menuApi from '@/api/menu';

const emit = defineEmits(['refresh']);

const props = defineProps({
  menuList: Array
})

const sys_show_hide = [
  {label: '显示', value: '0'},
  {label: '隐藏', value: '1'},
]
const sys_normal_disable = [
  {label: '正常', value: '0'},
  {label: '停用', value: '1'},
]

const visible = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(false);
const refreshTable = ref(true);
const showChooseIcon = ref(false);
const iconSelectRef = ref(null);

const menuRef = ref(null)
const form = reactive({
  parentId: undefined,
  menuType: 'M',
  icon: undefined,
  menuName: '',
  orderNum: '0',
  isFrame: '1',
  path: '',
  component: '',
  perms: '',
  query: '',
  isCache: '0',
  visible: '0',
  status: '0',

});

/** 表单重置 */
function reset() {
  if(!menuRef) return
  menuRef.value.resetFields();
  form.component = ''; // 清空组件路径
  form.perms = ''; // 清空权限字符
  form.menuId = undefined;
}

/** 取消按钮 */
function cancel() {
  visible.value = false;
  reset();
};

const rules = reactive(
    {
      menuName: [{required: true, message: "菜单名称不能为空", trigger: "blur"}],
      orderNum: [{required: true, message: "菜单顺序不能为空", trigger: "blur"}],
      perms: [{required: true, message: "权限字符不能为空", trigger: "blur"}]
    }
)

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/** 提交按钮 */
function submitForm() {
  menuRef.value.validate(valid => {
    if (valid) {
      if (form.menuId != undefined) {
        menuApi.updateMenu(form).then(response => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          visible.value = false;
          emit('refresh')
        });
      } else {
        menuApi.addMenu(form).then(response => {
          ElMessage({
            message: '新增成功',
            type: 'success',
          })
          visible.value = false;
          emit('refresh')
        });
      }
    }
  });
};

const init = async (data) => {
  visible.value = true;
  nextTick(() => {
    if (data) Object.assign(form, data);
  })
};

defineExpose({init});
</script>

<style lang="scss" scoped></style>

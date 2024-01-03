<template>
  <el-dialog v-model="visible" :title="form.roleId ? '编辑' : '添加'" width="650px" @closed="reset">
    <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item prop="roleKey">
        <template #label>
                  <span>
                     <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`hasRole('admin')`)" placement="top">
                        <el-icon><question-filled /></el-icon>
                     </el-tooltip>
                     权限字符
                  </span>
        </template>
        <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
      </el-form-item>
      <el-form-item label="角色顺序" prop="roleSort">
        <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
          >{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-tree
            ref="permListRef"
            :data="menuOptions"
            :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
            node-key="menuId"
            show-checkbox
            default-expand-all
            :default-checked-keys="selectedMenuIds"
        ></el-tree>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
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
import { ref, reactive, nextTick } from 'vue';
import menuApi from '@/api/menu';
import roleApi from '@/api/role';
import {ElMessage} from "element-plus";
const selectedMenuIds = ref([]);
const emit = defineEmits(['refresh']);

const open = ref(false);
const loading = ref(true);
const title = ref("");
const menuOptions = ref([]);
const deptOptions = ref([]);
const menuRef = ref(null);
const deptRef = ref(null);
const visible = ref(false);
const form = reactive({
  roleName: '',
  roleKey: '',
  roleSort: '',
  status: '0',
  remark: '',
  menuIds: []
});

const sys_normal_disable = [
  {label: '正常', value: '0'},
  {label: '停用', value: '1'},
]

const rules = reactive(
    {
      roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
      roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
    }
)
const roleRef = ref(null)
/** 重置新增的表单以及其他数据  */
function reset() {
  if(!roleRef) return
  roleRef.value.resetFields();
  form.role = undefined;
}

/** 树权限（展开/折叠）*/
function handleCheckedTreeExpand(value, type) {
  if (type == "menu") {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  } else if (type == "dept") {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  }
}

let searchForm = reactive({
  menuName: '',
  status: '',
});
const getMenuList = () => {
  menuApi.listMenu(searchForm).then((response) => {
    menuOptions.value = handleTree(response.data, "menuId");
    loading.value = false;
  })
}

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

/** 树权限（全选/全不选） */
function handleCheckedTreeNodeAll(value, type) {
  if (type == "menu") {
    menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
  } else if (type == "dept") {
    deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
  }
}

/** 树权限（父子联动） */
function handleCheckedTreeConnect(value, type) {
  if (type == "menu") {
    form.value.menuCheckStrictly = value ? true : false;
  } else if (type == "dept") {
    form.value.deptCheckStrictly = value ? true : false;
  }
}

// 用于获取选择的值
const permListRef = ref(null)
/** 提交按钮 */
function submitForm() {
  roleRef.value.validate(valid => {
    if (valid) {
      if (form.roleId != undefined) {
        form.menuIds = permListRef.value.getCheckedKeys();
        roleApi.updateRole(form).then(response => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          visible.value = false;
          emit('refresh')
        });
      } else {
        form.menuIds = permListRef.value.getCheckedKeys();
        roleApi.addRole(form).then(response => {
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


/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

const init = async (data) => {
  visible.value = true;
  nextTick(() => {
    if (data) {Object.assign(form, data);
      if (data.menuIds && data.menuIds.length > 0) {
        selectedMenuIds.value = data.menuIds;
      }}
    getMenuList()
  })
};

defineExpose({ init });
</script>

<style lang="scss" scoped></style>

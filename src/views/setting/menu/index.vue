<template>
  <el-card style="margin: 3px">
    <el-form :model="searchForm" inline>
      <div>
        <el-form-item label="功能名称" style="margin-right: 8px" >
          <el-input v-model="searchForm.menuName" class="w-220px" placeholder="用户名搜索" />
        </el-form-item>
        <el-form-item label="状态" style="margin-right: 8px">
          <el-select v-model="searchForm.status" placeholder="状态" clearable class="w-220px">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
          <el-button @click="onAddOrUpdate">新增</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table
        :data="tableData"
        v-loading="loading"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="功能名称" prop="menuName" align="center" />
      <el-table-column label="图标" prop="icon" align="center" />
      <el-table-column label="权限标识" prop="perms" align="center" />
      <el-table-column label="组件路径" prop="component" align="center" />
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === '0' ? 'success' : 'info'">
            {{ scope.row.status === '0' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="200" align="center" />
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="onAddOrUpdate(scope.row)" v-hasPermi="['system:menu:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:menu:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddOrUpdate ref="addOrUpdateRef" :menuList="tableData" @refresh="getMenuList"/>
  </el-card>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import menuApi from '@/api/menu';
import AddOrUpdate from './components/add-or-update/index.vue';
import {ElMessage, ElMessageBox} from "element-plus";


const loading = ref(true)
// 获取列表
let tableData = ref([]);

onMounted(() => {
  getMenuList();
});

const getMenuList = () => {
  menuApi.listMenu(searchForm).then((response) => {
    tableData.value = handleTree(response.data, "menuId");
    loading.value = false;
  })
}

const addOrUpdateRef = ref();
let searchForm = reactive({
  menuName: '',
  status: '',
});

const onAddOrUpdate = (data) => {
  addOrUpdateRef.value.init(data);
};

/** 搜索按钮操作 */
function handleQuery() {
  searchForm.page = 1;
  getMenuList();
};

/** 重置按钮操作 */
function resetQuery() {
  searchForm.menuName = '';
  searchForm.status = '';
};

/** 删除按钮操作 */
function handleDelete(row) {
  ElMessageBox.confirm('确认删除该项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        menuApi.delMenu(row.menuId)
            .then((response) => {
              const code = response.code || 200;
              if (code === 200) {
                ElMessage.success('删除成功');
                getMenuList();
              } else {
                ElMessage.error('删除失败: ' + response.msg);
              }
            })
            .catch((error) => {
              ElMessage.error('删除失败：' + error.message);
            });
      })
      .catch(() => {
        ElMessage.warning('已取消删除' );
      });
};

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

</script>

<style lang="scss" scoped>

</style>

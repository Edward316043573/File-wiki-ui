<template>
  <el-card style="margin: 3px">
    <el-form :model="searchForm" inline>
      <el-form-item label="用户名" style="margin-right: 8px" >
        <el-input v-model="searchForm.userName" class="w-220px" placeholder="用户名搜索" />
      </el-form-item>
      <el-form-item label="手机号" style="margin-right: 8px">
        <el-input v-model="searchForm.phonenumber" class="w-220px" placeholder="手机号搜索" />
      </el-form-item>
      <el-form-item label="邮箱" style="margin-right: 8px">
        <el-input v-model="searchForm.email" class="w-220px" placeholder="邮箱搜索" />
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
      </el-form-item>
      <el-form-item>
        <el-button @click="onAddOrUpdate">新增</el-button>
        <el-button>修改</el-button>
        <el-button @click="onDelete">删除</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="ID" type="index" align="center" />
      <el-table-column label="用户名称" prop="userName" align="center" />
      <el-table-column label="用户昵称" prop="nickName" align="center" />
      <el-table-column label="用户邮箱" prop="email" align="center" />
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="角色" align="center">
        <template #default="{ row }">
          <el-tag>
            {{ row.role === 1 ? '超级管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === 0 ? 'success' : 'info'">
            {{ row.status === 0 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="creat_at" align="center" />
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" ></el-button>
          </el-tooltip>
          <el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="Key" ></el-button>
          </el-tooltip>
          <el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="CircleCheck"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="page"
        v-model:limit="limit"
        @pagination="getUserList"
    />
    <AddOrUpdate ref="addOrUpdateRef" />
  </el-card>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import userApi from '@/api/user';
import AddOrUpdate from './components/add-or-update/index.vue';

// 获取列表
let tableData = ref([]);
let total = ref(0)
let page = ref(1)
let limit = ref(10)
onMounted(() => {
  getUserList();
});
const getUserList = () => {
  userApi.listUser(searchForm).then((response) => {
    tableData.value = response.data.records;
    total = response.data.total;
    page = response.data.current;
  })
}

const addOrUpdateRef = ref();
let searchForm = reactive({
  userName: '',
  phonenumber: '',
  email: '',
  status: '',
  page: page,
  pageSize: limit
});

const onAddOrUpdate = (data) => {
  addOrUpdateRef.value.init(data);
};

const onDelete = () => {
  ElMessageBox.confirm('您确认要删除当前项吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '只是个demo！'
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作'
        });
      });
};

/** 搜索按钮操作 */
function handleQuery() {
  searchForm.page = 1;
  getUserList();
};

/** 重置按钮操作 */
function resetQuery() {
  searchForm.username = '';
  searchForm.phonenumber = '';
  searchForm.email= '';
  searchForm.status = '';
};
</script>

<style lang="scss" scoped>

</style>

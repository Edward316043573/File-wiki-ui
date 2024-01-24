<template>
  <el-dialog v-model="visible" :title="form.userId ? '编辑' : '添加'" width="700px" @closed="reset">
    <el-form ref="userRef" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.userId == null">
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option
                  v-for="dict in sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="状态">
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
        <el-col :span="12">
          <el-form-item label="角色" prop="roleIds">
            <el-select v-model="form.roleIds" multiple placeholder="请选择">
              <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import {ref, reactive, onMounted, nextTick} from 'vue';
import roleApi from '@/api/role';
import {addUser,updateUser} from '@/api/user'
import {ElMessage} from 'element-plus'

const emit = defineEmits(['refresh']);


const visible = ref(false);
const form = reactive({
  userId: undefined,
  userName: '',
  password: '',
  nickName: '',
  sex: '0',
  phonenumber: '',
  email: '',
  status: '0',
  roleIds: [],
  remark: ''
});
const roleOptions = ref([]);

onMounted(() => {
  getRoleList();
})
const getRoleList = () => {
  let searchForm = {
    page: 1,
    pageSize: 99999
  }
  roleApi.listRole(searchForm).then((response) => {
    roleOptions.value = response.data.records;
  })
}

const sys_user_sex = [
  {label: '男', value: '0'},
  {label: '女', value: '1'},
]
const sys_normal_disable = [
  {label: '正常', value: '0'},
  {label: '停用', value: '1'},
]


const rules = reactive(
    {
      userName: [{required: true, message: "用户名称不能为空", trigger: "blur"}, {
        min: 2,
        max: 20,
        message: "用户名称长度必须介于 2 和 20 之间",
        trigger: "blur"
      }],
      nickName: [{required: true, message: "用户昵称不能为空", trigger: "blur"}],
      password: [{required: true, message: "用户密码不能为空", trigger: "blur"}, {
        min: 4,
        message: "用户密码长度必须大于4",
        trigger: "blur"
      }],
      email: [{type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"]}],
      phonenumber: [{pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}]

    }
)

const userRef = ref(null)

/** 重置操作表单 */
function reset() {
  if (!userRef) return
  userRef.value.resetFields();
  form.userId = undefined;
};

/** 提交按钮 */
function submitForm() {
  userRef.value.validate(valid => {
    if (valid) {
      if (form.userId != undefined) {
        updateUser(form).then(response => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          visible.value = false;
          emit('refresh')
        });
      } else {
        addUser(form).then(response => {
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
  visible.value = false;
  reset();
};

const init = (data) => {
  visible.value = true;
  nextTick(() => {
    if (data) Object.assign(form, data);
  })
};

defineExpose({init});
</script>

<style lang="scss" scoped></style>

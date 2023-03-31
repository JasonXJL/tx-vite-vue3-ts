<script setup lang="ts">
import {
  addUser,
  AddUserDto,
  deleteBatchUser,
  deleteUser,
  editUser,
  EditUserDto,
  PageUserDto,
  queryUserPage,
  User
} from '@/utils/axios/api/system/user'
import { FormInstance, FormRules } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { reactive, ref } from 'vue'

const userSelectRef = ref<InstanceType<typeof ElTable>>()
const selectedUserList = ref<User[]>([])
const loading = ref(true)
const total = ref(0)
const userList = ref<User[]>([])
const userPageDto = ref<PageUserDto>({
  pageNum: 1,
  pageSize: 10
})
const addUserDto = ref<AddUserDto>({
  name: '',
  status: true
})
const editUserDto = ref<EditUserDto>({
  id: -1,
  name: '',
  status: true
})
const addUserDrawer = ref(false)
const editUserDrawer = ref(false)
const addUserFormRef = ref<FormInstance>()
const editUserFormRef = ref<FormInstance>()
const addUserRules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 2, max: 4, message: '长度在2到4个汉字', trigger: 'blur'}
  ]
})
const editUserRules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 2, max: 4, message: '长度在2到4个汉字', trigger: 'blur'}
  ]
})

const options = [
  {
    value: false,
    label: '禁用'
  },
  {
    value: true,
    label: '正常'
  }
]


function doQueryUserPage() {
  loading.value = true
  queryUserPage(userPageDto.value)
    .then(result => {
      total.value = result.data.total
      userList.value = result.data.list
    }).catch(() => {

    })
    .finally(() => {
      loading.value = false
    })
}

doQueryUserPage()

function handleSelectionChange(selectedUsers: User[]) {
  selectedUserList.value = selectedUsers
}

function sortChange(sort: any) {
  userPageDto.value.sort = sort.prop as string
  userPageDto.value.desc = sort.order.startsWith('desc')
  userPageDto.value.pageNum = 1
  doQueryUserPage()
}

function handleSizeChange(size: number) {
  userPageDto.value.pageNum = 1
  userPageDto.value.pageSize = size
  doQueryUserPage()
}

function handleCurrentChange(num: number) {
  userPageDto.value.pageNum = num
  doQueryUserPage()
}

async function doAddUser(formEl: FormInstance|undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addUser(addUserDto.value)
        .then(() => {
          addUserDto.value = {
            name: '',
            status: true
          }
          ElMessage({
            type: 'success',
            message: '添加成功'
          })
          addUserDrawer.value = false
          doQueryUserPage()
        }).catch(() => {
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '请校验参数'
      })
    }
  })
}

function doDeleteUser(id: number) {
  ElMessageBox({
    title: '警告',
    message: '此操作将永久删除此用户,是否删除?',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    deleteUser(id)
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    userPageDto.value.pageNum = 1
    doQueryUserPage()
  }).catch(() => {
  })
}

function batchDelete() {
  ElMessageBox({
    title: '警告',
    message: '此操作将永久删除所选用户,是否删除?',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    deleteBatchUser(selectedUserList.value.map(value => value.id).join(','))
      .then(() => {
        ElMessage({
          type: 'success',
          message: '批量删除成功'
        })
      })
    doQueryUserPage()
    selectedUserList.value = []
    userSelectRef.value!.clearSelection()
  }).catch(() => {
  })
}


async function doEditUser(formEl: FormInstance|undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      editUser(editUserDto.value)
        .then(() => {
          editUserDto.value = {
            id: -1,
            name: '',
            status: true
          }
          ElMessage({
            type: 'success',
            message: '编辑成功'
          })
          editUserDrawer.value = false
          doQueryUserPage()
        }).catch(() => {
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '请校验参数'
      })
    }
  })
}

const resetForm = (formEl: FormInstance) => {
  if (formEl) {
    formEl.resetFields()
  }
}
</script>

<template>
  <el-container class="form-container">
    <el-form :model="userPageDto" inline>
      <el-form-item label="姓名:">
        <el-input v-model="userPageDto.key" style="width: 200px" clearable/>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="userPageDto.status" style="width: 100px" clearable placeholder="请选择状态">
          <el-option v-for="option in options" :key="option.value" :value="option.value" :label="option.label"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doQueryUserPage">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="addUserDrawer=true">添加用户</el-button>
  </el-container>
  <el-table :data="userList" ref="userSelectRef" :header-cell-style="{'text-align':'center'}" @sort-change="sortChange"
            @selection-change="handleSelectionChange" stripe border show-header highlight-current-row
            v-loading="loading" max-height="650px">
    <el-table-column type="selection" width="55" align="center" fixed/>
    <el-table-column sortable="custom" prop="id" label="id" width="60" align="center" fixed/>
    <el-table-column prop="name" label="姓名" width="150" align="center" fixed/>
    <el-table-column prop="status" label="状态" width="70" align="center">
      <template #default="scope">
        <el-switch v-model="scope.row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
      </template>
    </el-table-column>
    <el-table-column label="其他" align="center"></el-table-column>
    <el-table-column sortable="custom" prop="createTime" label="创建时间" width="180" align="center"/>
    <el-table-column sortable="custom" prop="updateTime" label="修改时间" width="180" align="center"/>
    <el-table-column label="操作" width="200" align="center" fixed="right">
      <template #default="scope">
        <el-button type="warning" plain @click="editUserDrawer=true;editUserDto=scope.row">编辑</el-button>
        <el-button type="danger" plain @click="doDeleteUser(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty style="height: 350px;"></el-empty>
    </template>
  </el-table>
  <el-container class="page-container">
    <el-button :style="selectedUserList.length===0 ? 'visibility: hidden' : ''" type="danger" @click="batchDelete">
      批量删除
    </el-button>
    <el-config-provider :locale="zhCn">
      <el-pagination
        v-model:current-page="userPageDto.pageNum"
        v-model:page-size="userPageDto.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </el-container>
  <el-drawer v-model="addUserDrawer" :close-on-click-modal="false">
    <template #header>
      <h1>添加用户</h1>
    </template>
    <template #default>
      <el-form ref="addUserFormRef" :model="addUserDto" :rules="addUserRules" label-position="right" label-width="60px">
        <el-form-item label="姓名:" prop="name">
          <el-input clearable v-model="addUserDto.name"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="addUserDto.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="resetForm(addUserFormRef)">重置</el-button>
      <el-button type="primary" @click="doAddUser(addUserFormRef)">确定</el-button>
    </template>
  </el-drawer>
  <el-drawer v-model="editUserDrawer" :close-on-click-modal="false">
    <template #header>
      <h1>编辑用户</h1>
    </template>
    <template #default>
      <el-form ref="editUserFormRef" :model="editUserDto" :rules="editUserRules" label-position="right"
               label-width="60px">
        <el-form-item label="id" prop="id">
          <el-input disabled v-model="editUserDto.id"/>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input clearable v-model="editUserDto.name"/>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="editUserDto.status"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="resetForm(editUserFormRef)">重置</el-button>
      <el-button type="primary" @click="doEditUser(editUserFormRef)">确定</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.form-container {
  width: 98%;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 20px;
  display: flex;

  .el-button {
    margin-left: auto;
  }
}

.el-table {
  width: 98%;
  margin-left: 20px;
}

.page-container {
  width: 98%;
  margin-top: 20px;
  margin-left: 20px;

  .el-button {
    margin-right: auto;
  }

  .el-config-provider {


    .el-pagination {

    }
  }
}

.el-drawer {
  display: flex;

  .el-form {
  }

  .el-button {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>

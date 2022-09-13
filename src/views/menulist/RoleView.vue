<template>
  <div>
      <el-form   class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addRole">添加</el-button>
        </el-form-item>
      </el-form>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="身份" width="180" />
      <el-table-column prop="role" label="操作" >
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="changeRole(scope.row)"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {getRoleList} from '@/network/api'
import {RoleInitData,RoleListInt} from '@/type/role'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup () {
    const data = reactive(new RoleInitData())
    const router = useRouter()
    const getRole = ()=>{
      getRoleList().then(res=>{
        console.log(res)
        data.list = res.data
      })
    }
    onMounted(() => {
      getRole()
    })
    const addRole=()=>{
      ElMessageBox.prompt('请输入身份', '添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          if(value){
            data.list.push({roleId:data.list.length+1,roleName:value,authority:[]})
          }
          ElMessage({
            type: 'success',
            message: `${value}身份添加成功`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作',
          })
        })
    }
    const changeRole=(row:RoleListInt)=>{
      router.push({
        path:'authority',
        name: 'authority',
        params:{
          id:row.roleId,
          authority:row.authority
        }
      })
    }
    return {...toRefs(data),addRole,changeRole}
  }
})
</script>

<style>

</style>
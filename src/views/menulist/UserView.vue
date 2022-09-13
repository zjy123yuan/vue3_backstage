<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择身份" size="large">
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="身份" >
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.role"
            link
            size="small">
            {{item.roleName}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作" >
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="changeUser(scope.row)"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isShow" title="编辑">
    <el-form :model="checked">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="checked.nickName" autocomplete="off"  />
      </el-form-item>
      <el-form-item label="身份" label-width="50px">
        <el-select multiple v-model="checked.role" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updataRole">
          修改
        </el-button>
        <el-button @click="isShow = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import {getUserList,getRoleList} from '@/network/api'
import { InitData, UserListInt } from '@/type/user'
export default defineComponent({
  setup () {
    const data = reactive(new InitData())
    const getUser = ()=>{
      getUserList().then(res=>{
        console.log(res)
        data.list=res.data
      })
    }
    const getRole = ()=>{
      getRoleList().then(res=>{
        console.log(res)
        data.roleList=res.data
      })
    }
    onMounted(() => {
      getUser()
      getRole()
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deleteRow = (row: any)=>{
      console.log(row)
    }
    const onSubmit = ()=>{
      let arr :UserListInt[]=[]
      if(data.selectData.nickName||data.selectData.role){
        if(data.selectData.nickName){
          arr=data.list.filter(item=> item.nickName.indexOf(data.selectData.nickName)!=-1)
        } 
        if(data.selectData.role){
          arr=(data.selectData.nickName?arr:data.list).filter(item=>item.role.find((value)=>value.role===data.selectData.role))
        }
      } 
      else{
        arr = data.list
      }
      data.list=arr
    }
    watch([()=>data.selectData.nickName,()=>data.selectData.role],
      ()=>{
        if(data.selectData.nickName==''||data.selectData.role==0){
          getUser()
          getRole()
        }
      })
    const  changeUser=(row:UserListInt)=>{
      console.log(row)
      data.isShow=true
      data.checked={
        id:row.id,
        nickName:row.nickName,  
        userName:row.userName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role:row.role.map((item:any)=>item.role||item.roleId)
      }
    }
    const updataRole =()=>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj:any = data.list.find(item=>item.id==data.checked.id)
      obj.nickName=data.checked.nickName
      obj.role=data.roleList.filter(item=>data.checked.role.indexOf(item.roleId)!=-1)
      data.list.forEach((item,index)=>{
        if(item.id==obj.id){
          data.list[index]=obj
        }
      })
      data.isShow=false
    }
    return {...toRefs(data),deleteRow,onSubmit,changeUser,updataRole}
  }
})
</script>

<style scoped>

</style>
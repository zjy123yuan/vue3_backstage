<template>
  <div>
    <el-tree
    :data="list"
    ref="treeRef"
    show-checkbox
    node-key="roleId"
    :check-strictly="true"
    :default-checked-keys="authority"
    :props="{
      children:'roleList',
      label:'name'
    }"/>
    <el-button type="primary" @click="changAuthority">
          修改
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import {authority} from '@/type/authority' 
import {getAuthorityList} from '@/network/api'
import router from '@/router';
export default defineComponent({
  setup () {
    const route = useRoute()
    const router=useRouter()
    console.log(route)
    onMounted(() => {
      getAuthorityList().then(res=>{
        data.list=res.data
      })
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params:any = route.params
    const data = reactive(new authority(params.id,params.authority))
    const changAuthority = ()=>{
      console.log(data.treeRef.getCheckedKeys().sort(function(a:number,b:number){return a-b}))
      //此处应该传递数据给后台让后台修改
      //跳转路由
      router.push('role')
    }
    return {...toRefs(data),changAuthority}
  }
})
</script>

<style scoped>

</style>
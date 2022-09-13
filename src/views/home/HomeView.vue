<template>
  <div class="home">
    <div class="common-layout">
      <el-container class="header">
        <el-header height="100px">
          <el-row :gutter="20">
            <el-col :span="4" class="left" ><img src="@/assets/img/logo.png" class="logo"></el-col>
            <el-col :span="16" class="center"><h2>后台管理系统</h2></el-col>
            <el-col :span="4" class="right"><el-button @click="delToken">退出登录</el-button></el-col>
          </el-row>
        </el-header>
        
        <el-container>
          <el-aside class="aside">          
              <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu"
                :default-active="active"
                router
                text-color="#fff">
                <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                  <span>{{item.meta.title}}</span>
                </el-menu-item>
              </el-menu>
          </el-aside>          
          <el-main class="el-main"><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter,useRoute} from 'vue-router'
export default defineComponent({
  name: 'HomeView',
  setup(){
    const router = useRouter()
    const route = useRoute()
    //在meta中添加isShow判断是否是侧边栏跳转路由
    const list = router.getRoutes().filter(v=>v.meta.isshow)
    //退出登录
    const delToken = ()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    return{list,active:route.path,delToken}
  }
});
</script>
 
<style  lang="scss" scoped>
  .header{
    background-color: rgb(66, 73, 79);
    height: 100px;
    text-align: center;
    line-height: 100px;
    width: 100%;
    margin: 0;
    padding: 0;
    .left,.right,.center{
      height: 100px;
      color:rgba(255, 255, 255, 0.765);
    }

    .right:hover{
      color: rgb(255, 255, 255);
    }
    el-col{
      padding: 0;
    }
  }
  .logo{
    height: 100px;
  }
  .aside{
    text-align: center;
    width: 190px;
    .el-menu{
      height: calc(100vh - 100px);
    }

  }
  .el-main{
    height: calc(100vh - 100px);
  }
</style>
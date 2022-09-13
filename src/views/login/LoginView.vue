<template>
  <div class="login-box">
      <el-form ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm">
        <h2>后台管理系统</h2>
        <el-form-item label="账户：" prop="username" >
          <el-input  v-model="ruleForm.username"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码：" prop="password" >
          <el-input
            v-model="ruleForm.password"
            type="password"
            @keyup.enter="submitForm(ruleFormRef)"
            autocomplete="off"/>
        </el-form-item>
        <div v-show="isshow" class="toast">密码错误</div>
        <el-form-item >
          <el-button type="primary" class="btn"  @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button class="btn" @click="resetForm(ruleFormRef)" >重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref ,toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {LoginData} from '../../type/Login'
import {login} from '@/network/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const ruleFormRef = ref<FormInstance>()
    const data=reactive(new LoginData())
    const router = useRouter()
    const isshow = ref(false)
    const rules = reactive<FormRules>({
       username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '账号的长度应在3到10之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '密码的长度应该在3到10之间', trigger: 'blur' }, 
        ]    
    })
    //重置
    const resetForm = (formEl: FormInstance | undefined) => {
          // data.ruleForm.username=''
          // data.ruleForm.password=''
          if (!formEl) return
          formEl.resetFields()
        }
    //登录
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            login(data.ruleForm).then(res=>{
              if(res.data.msg!='登录失败'){
                 //保存token
                localStorage.setItem('token',res.data.token)
                //跳转页面
                router.push('/')
              }else{
                isshow.value = true
                setTimeout(() => {
                  isshow.value = false;
                }, 1000);
                data.ruleForm.username=''
                data.ruleForm.password=''
              }
            })

          } else {
            console.log('error submit!', fields)
            return  false
          }
        })
      }
    return {...toRefs(data),rules,resetForm,submitForm,ruleFormRef,isshow}
  }
})
</script>

<style lang="scss" scoped>
  .login-box{
    width: 100%;
    height: 100%;
    background: url("../../assets/img/background.png");
    background-size:100% 100%;
    background-repeat: no-repeat;
    display: flex;
    text-align: center;
    .demo-ruleForm{
      position: absolute;
      width: 400px;
      height: 200px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color:#8181d4;
      border-radius: 20px;
      padding: 50px;
      .btn{
      width: 100px;
      border: 2px solid rgb(31, 162, 244);
      background: none;
      display: block;
      margin: 20px auto;
      // text-align: center;
      border-radius: 20px;
      padding: 10px;
      outline: none;
      color: #130808;
      }
      .btn:hover{
        background-color:  rgb(20, 167, 235);
      }
      h2{
        margin-bottom: 10px;
      }
      .toast{
        position: absolute;
        top:50%;
        left: 50%;
        line-height: 100px;
        width: 200px;
        height: 100px;
        color: #fff;
        background-color: rgba(0,0,0,0.5);
        border-radius: 20px;
        transform: translateX(-50%) translateY(-50%); 
      }
    }
  }
  
</style>
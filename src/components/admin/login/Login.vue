<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="8" :push="8">
          <el-card>
            <template slot="header">
              欢迎管理员登录
            </template>
            <el-form label-position="right" label-width="80px">
              <el-form-item label="用户名：">
                <el-input v-model="loginForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" style="float: right;" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import config from '@/lib/http/config'
  export default {
    name: "Login",
    created (){
      if(this.$store.state.isLogin){
        this.$router.go(-1);
      }
    },
    data (){
      return {
          loginForm:{
            userName:"",
            passowrd:""
          },

      }
    },
    methods: {
      login (){
        let userName = this.loginForm.userName;
        let password = this.loginForm.password;

        let vthis = this;
        axios.post(config.rootUrl + '/oauth/token', {
          grant_type:'password',
          client_id:4,
          client_secret:'MXAvWexy4BSN9A8l77KS2HBJxuAxobPY5TyThwhy',
          username:userName,
          password:password,
          scope:''
        }).then( res =>{
          if(res.data.access_token){
            this.$router.go(-1);
            this.$store.commit('setToken', res.data)
          }
        }).catch(error=>{
          this.$message.error('用户名或密码错误');
          vthis.loginForm.password = '';
        });
      }
    }
  }
</script>

<style scoped>

</style>

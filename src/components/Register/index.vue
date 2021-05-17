<template>
  <div id="content">
    <div class="register_body">
      <div class="register_email">
        邮箱：<input v-model="email" type="text" class="register_text"><button :disabled = disabled @click="handleToSendVerify()">{{verifyInfo}}</button>
      </div>
      <div>
        用户名：<input v-model="username" type="text" class="register_text">
      </div>
      <div>
        密码：<input v-model="password" type="password" class="register_text">
      </div>
      <div>
        验证码：<input v-model="verify" type="text" class="register_text">
      </div>
      <div class="register_btn">
        <button @click="handleToRegister()">注册</button>
      </div>
      <div class="register_link">
        <router-link to="/mine/login">立即登录</router-link>
        <router-link to="/mine/findPassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {messageBox} from  '@/components/JS'
export default {
  data() {
    return {
      email:'',
      username:'',
      password:'',
      verify:'',
      verifyInfo:'发送验证码',
      disabled: false
    };
  },
  methods:{
    handleToSendVerify(){
      if (this.disabled) {
        return
      }
      this.$http.get('/api/users/verify?email='+ this.email).then(res => {
        var vm = this
        if (res.data.status == 0) {
          messageBox({
            title: '验证码',
            content:'验证码已发送',
            ok:'确定',
            handleOk(){
              vm.countDown()
            }
          })
        } else {
          messageBox({
            title: '验证码',
            content:'验证码发送失败',
            ok:'确定',
          })
        }
      })
    },
    handleToRegister(){
      let vm = this
      this.$http.post('/api/users/register',{
        email: this.email,
        username: this.username,
        password: this.password,
        verify: this.verify,
      }).then(res => {
        if (res.data.status == 0) {
          messageBox({
            title: '注册',
            content: '用户注册成功',
            ok:'确定',
            handleOk(){
              vm.$router.push('/mine/login')
            }
          })
        } else {
          messageBox({
            title: '注册',
            content: res.data.msg + ',用户注册失败',
            ok:'确定',
          })
        }
      })
    },
    countDown(){
      this.disabled = true
      var count = 60
      var timer =  setInterval(() => {
        count--;
        this.verifyInfo = '剩余'+count+'s';
        if (count == 0) {
          this.disabled = false;
          count = 60;
          this.verifyInfo = '发送验证码',
          clearInterval(timer)
        }
      },1000)
    }
  }
}
</script>

<style scoped lang='scss'>
  #content .register_body{  width:100%;}
  .register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
  .register_body .register_btn{ height:50px; margin:10px;}
  .register_body .register_email button{ position: absolute;right: 10px; top: 10px; height: 30px; border: none; padding: 5px; }
  .register_body .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
  .register_body .register_link{ display: flex; justify-content:space-between;}
  .register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
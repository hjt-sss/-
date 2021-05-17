<template>
   <div>
     <div>个人中心：</div>
        <div>当前用户：{{ $store.state.user.name }} <a href="javascript:;" @click="handleToLogout()">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="blank">进入管理后台</a> </div>
        <div v-else>用户身份：普通用户</div>
        <div>
          <input type="file" name="file" value="上传头像" @change="handleToUpload">
          <img class="userhead" :src="$store.state.user.userHeader" alt="">
        </div>
   </div>
</template>

<script>
import axios from 'axios'
import {messageBox} from '@/components/JS'
export default {
  name: 'center',
  data() {
    return {};
  },
  methods:{
    handleToUpload(ev){
      var file = ev.target.files[0]; //首先拿到file
      var params = new FormData()  //创建一个实例，将文件存储起来，传输给后台
      params.append('file', file, file.name);
      var config = {
        headers:{'Content-Type': 'multipart/form-data'}
      }
      let vm = this
      this.$http.post('/api/users/uploadUserHead', params, config).then(res => {
        if (res.data.status == 0) {
          messageBox({
            title:'信息',
            content:'上传成功',
            ok:'确定',
            handleOk(){
              vm.$store.commit('user/USER_NAME',{
                name: vm.$store.state.user.name, 
                isAdmin: vm.$store.state.user.isAdmin,
                userHeader: res.data.data.userHeader + '?' + Math.random()
              })
            }
          })
        } else {
          messageBox({
            title:'信息',
            content:'上传失败',
            ok:'确定',
            handleOk(){
              
            }
          })
        }
      })
    },
    handleToLogout(){
      this.$http.get('/api/users/logout').then(res => {
        if (res.data.status == 0) {
          localStorage.removeItem('name')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', {name: '', isAdmin: false,userHeader:''})
          this.$router.push('/mine/login')
        }
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    axios.get('/api/users/getUser').then(res => {
      if (res.data.status == 0) {
        next(vm => {
          localStorage.setItem('name',res.data.data.username)
          localStorage.setItem('isAdmin',res.data.data.isAdmin)
          vm.$store.commit('user/USER_NAME',{
            name: res.data.data.username, 
            isAdmin: res.data.data.isAdmin,
            userHeader: res.data.data.userHeader
          })
        })
      } else {
        next('/mine/login')
      }
    })
  },
}
</script>

<style scoped lang='scss'>
  .userhead{width: 100px; height: 100px; border-radius: 50%; overflow: hidden;}
</style>
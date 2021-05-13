<template>
   <div>
     <div>个人中心：</div>
        <div>当前用户：{{ $store.state.user.name }} <a href="javascript:;" @click="handleToLogout()">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="blank">进入管理后台</a> </div>
        <div v-else>用户身份：普通用户</div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'center',
  data() {
    return {};
  },
  methods:{
    handleToLogout(){
      this.$http.get('/api/users/logout').then(res => {
        if (res.data.status == 0) {
          localStorage.removeItem('name')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', {name: '', isAdmin: false})
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
          vm.$store.commit('user/USER_NAME',{name: res.data.data.username, isAdmin: res.data.data.isAdmin})
        })
      } else {
        next('/mine/login')
      }
    })
  },
}
</script>

<style scoped lang='scss'>

</style>
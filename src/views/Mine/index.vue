<template>
   <div id="main">
     <Header title="我的喵喵"></Header>
     <div id="content">
       <Login></Login>
     </div>
     <TabBar></TabBar>
   </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
  name: 'Mine',
  data() {
    return {};
  },

  components: {Header, TabBar, Login},

  computed:{},

  mounted () {},

  methods: {},
}
</script>

<style scoped lang='scss'>

</style>
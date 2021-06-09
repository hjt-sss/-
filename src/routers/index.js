import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(Router)

var router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 这里打印出来是‘/’
  // base: 'miaomiao', //修改路由路径
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path : '/*',
      redirect : '/mine'
    }
  ]
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  // to要跳转到的路径
  // from从哪个路径来
  // next往下执行的回调
  // 在localStorage中获取token
  let token=localStorage.getItem('name')
  // 判断该页面是否需要登录
  if(to.meta.auth){
    // 如果token存在直接跳转
    if(token){
      next()
    }else{
      // 否则跳转到login登录页面
      next({
        path:'/mine',
        // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
        query:{
          redirect:to.fullPath
        }
      })
    }
  }else{
    // 如果不需要登录，则直接跳转到对应页面
    next()
  }
})

export default router
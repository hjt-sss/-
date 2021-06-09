export default {
  path:'/cinema',
  meta:{
    auth:true//添加字段判断该页面是否需要登录
  },
  component: () => import('@/views/Cinema')
}
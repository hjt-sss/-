export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children:[
    {
      path:'city',
      component: () => import('@/components/City'),
      meta:{
        auth:true//添加字段判断该页面是否需要登录
      },
    },
    {
      path:'nowplaying',
      component: () => import('@/components/NowPlaying'),
      meta:{
        auth:true//添加字段判断该页面是否需要登录
      },
    },
    {
      path:'comingsoon',
      component: () => import('@/components/ComingSoon'),
      meta:{
        auth:true//添加字段判断该页面是否需要登录
      },
    },
    {
      path:'search',
      component: () => import('@/components/Search'),
      meta:{
        auth:true//添加字段判断该页面是否需要登录
      },
    },
    {
      path:'detail/1/:movieId',
      components:{
        default: () => import('@/components/NowPlaying'),
        detail: () => import('@/views/Movie/detail.vue')
      },
      meta:{
        auth:true//添加字段判断该页面是否需要登录
      },
      props: {
        detail: true
      },
    },
    {
      path:'detail/2/:movieId',
      components:{
        default: () => import('@/components/ComingSoon'),
        detail: () => import('@/views/Movie/detail.vue')
      },
      props: {
        detail: true
      },
    },
    {
      path:'/movie',
      redirect: '/movie/nowplaying'
    }
  ]
}
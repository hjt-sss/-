module.exports = {
  // publicPath: 'miaomiao', //打包之后的html文件静态资源例如css文件、js文件的路径
  devServer:{
    disableHostCheck: true,
    proxy: {
      '/api': {
        'target': 'http://10.12.0.111:3000', //需要请求的地址   //公司局域网本机IP
        // 'target': 'http://192.168.1.103:3000', //需要请求的地址    //家里WiFi本机IP
        // 'target': 'http://192.168.43.16:3000', //需要请求的地址    //手机无线IP
        'changeOrigin': true, //是否跨域
      },
      '/ajax': {
      // target 为 url 中 /ajax 前面的请求网址的部分
          target: 'https://m.maoyan.com/',  //猫眼电影app的IP
          // 实现反向代理
          changeOrigin: true
      },
    }
  }
}
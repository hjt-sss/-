/* 封装scroll组件 */
<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {};
  },
  props:{
    handleToTouchEnd:{
      type: Function,
      default: function(){}
    },
    handleToScroll:{
      type:Function,
      default: function(){}
    }
  },
  mounted () {
    var scroll = new BScroll( this.$refs.wrapper , {
      tap : true,
      probeType: 1
    });     //第一个参数是获取到的dom元素，第二个是需要的一些参数
    this.scroll = scroll
    scroll.on('scroll',(pos) => {   //滚动时触发   pos所处位置  pos.y y轴拖拽距离
      this.handleToScroll(pos)
    }),
    scroll.on('touchEnd', (pos) => { //拖拽结束后触发
      this.handleToTouchEnd(pos)
    })
  },
  methods:{
    toScrollTop(y){
      this.scroll.scrollTo(0,y)
    }
  }
}
</script>

<style scoped lang='scss'>
  .wrapper{height: 100%;}
</style>
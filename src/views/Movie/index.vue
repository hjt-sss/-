<template>
  <div id="main">
    <Header title="喵喵电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import {messageBox} from '@/components/JS'
export default {
  name: 'Movie',
  data() {
    return {};
  },
  components: {Header, TabBar},
  mounted () {
    this.$http.get('/miaomiao/localCity').then(res => {
      if (res.status == 200) {
        var cityName = res.data.data[0].nm
        var cityId = res.data.data[0].id
        if (this.$store.state.city.id == cityId) {
          return
        }
        messageBox({
          title: '定位',
          content: cityName,
          cancel:'取消',
          ok:'切换定位',
          handleOk(){
            localStorage.setItem('nowCityNm', cityName)
            localStorage.setItem('nowCityId', cityId)
            //assgin记录浏览历史，所以可以实现后退功能
            //replace不记录浏览历史替换当前页，不能后退
            //reload()刷新页面,里面如果参数为true，强制刷新ctrl+f5
            location.reload()
          }
        })
      }
    })
  },
}
</script>

<style scoped lang='scss'>
  .movie_menu .router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  #content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
  .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
  // .movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
  .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
  // .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
  // .movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry i{  font-size:24px; color:red;}
  a{text-decoration: none;}
</style>
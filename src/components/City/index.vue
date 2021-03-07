<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li  v-for="i in hotList" :key="i.id">{{i.nm}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="citySort">
        <div v-for="item in cityList" :key="item.id">
          <h2>{{item.index}}</h2>
          <ul v-for="i in item.list" :key="i.id">
            <li>{{i.nm}}</li>
          </ul>
        </div>	
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.id" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      cityList:[],
      hotList:[]
    };
  },
  mounted () {
    axios.get('/miaomiao/cityList').then(res => { //测试反向代理
      if(res.data.meta.msg == "查询成功"){
        var cities = res.data.data
        var {cityList, hotList} = this.formatCityList(cities)
        this.cityList = cityList
        this.hotList = hotList
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    formatCityList(cities){
      var cityList = []  //城市列表，结构是[index: A~Z, list:[{nm: 城市名, id: 城市id}]]
      var hotList = []//热门城市列表

      for (let index = 0; index < cities.length; index++) {
        if (cities[index].isHot === 1) {
          hotList.push(cities[index])
        }
        
      }

      //遍历获取的数据，拿到索引值以及name以及id
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0,1).toUpperCase()  //去除所有的城市的py的第一个字母,并转为小写
        if(toCom(firstLetter)){   //如果firstLetter不存在于cityList中，证明这是新添加的索引,执行这一步，说明cityList[i].index != firstLetter,所以toCom返回的是true，所以执行这一步，将firstLetter添加到cityList.index中
          cityList.push({index: firstLetter, list:[{nm: cities[i].nm, id: cities[i].id}]})
        } else { //firstLetter存在于cityList中，说明这是已经存在的，将它累加到已有索引中，直接将城市push到cityList的list中
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({nm: cities[i].nm, id: cities[i].id})
            }
          }
        }
      }

      cityList.sort((n1,n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })

      function toCom(firstLetter){   //遍历城市列表，判断是否存在结构体中
        for (var i = 0; i < cityList.length; i++) {
          if(cityList[i].index === firstLetter){ //如果cityList中的index和firstLetter相同，
            return false;
          }
        }
        return true
      }
      return{    //必须返回，不然上面拿不到
        cityList,
        hotList
      }
    },
    handleToIndex(index){
      var h2 = this.$refs.citySort.getElementsByTagName('h2')
      this.$refs.citySort.parentNode.scrollTop = h2[index].offsetTop
    }
  },
}
</script>

<style scoped lang='scss'>
  // #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
  #content .city_body{ display: flex;
    position: fixed;
    top: 97px;
    bottom: -22px;
    overflow: scroll;
    right: 0;
    width: 100%;
    margin-bottom: 4.7rem;
    z-index: 1;}
  .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
  .city_body .city_list::-webkit-scrollbar{
      background-color:transparent;
      width:0;
  }
  .city_body .city_hot{ margin-top: 20px;}
  .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
  .city_body .city_sort div{ margin-top: 20px;}
  .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
  .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
  .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
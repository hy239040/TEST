<template>
  <div>
    <!-- <mt-swipe :auto="4000">
          <mt-swipe-item  v-for="item in banner" :key="item.id">
            <img :src=item.img alt="">
          </mt-swipe-item>
          
      </mt-swipe> -->
    <banner :swipe='banner' :w='true'></banner>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to="/home/photoTXT">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图文分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to="/home/goodsList">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品列表</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>

<script>
  import banner from '../subcomponents/banner.vue';
  export default {
    name: 'home',
    created() {
      this.getBanner();
      // this.getBannerByHttp();
    },
    components:{
        banner,
    },
    data() {
      return {
        banner: []

      }
    },
    methods: {
      // getBanner() {
      //   this.$axios.get('api/getlunbo')
      //     .then(res => {
      //       // console.log(res);

      //       if (res.data.status === 0) {
      //         this.banner = res.data.message

      //       }
      //     })
      // },
      getBanner(){
        // 返回promise对象
        this.$http.get(`api/getlunbo`)
        .then(res =>{
          console.log(res.message);
          this.banner = res.message
        })
      }
    }
  }
</script>

<style scoped lang='less'>
 

  .mui-grid-view {
    background-color: #fff;

    img {
      width: 70%;
    }

  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    font-size: 13px
  }

  .mui-table-view-cell {
    border: none !important;
  }
</style>
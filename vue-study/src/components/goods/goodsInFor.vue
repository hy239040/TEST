<template>
  <div>
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in images" :key="item.id">
        <img :src="item.src" alt />
      </mt-swipe-item>
    </mt-swipe>-->
    <banner :swipe='banner' :w='false'></banner>

    <div class="mui-card">
      <div class="mui-card-header">{{getinfo.title}}</div>
      <div class="mui-card-content price">
        <p>
          <s>市场价: {{getinfo.market_price }}</s>
          <span>销售价:{{getinfo.sell_price}}</span>
        </p>
        <div class="mui-card-content-inner">
          <span>购买数量:</span>
          <number :maxNum="getinfo.stock_quantity"
            @getNum='getCount'></number>
          <div class="btn">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="goCart">加入购物车</mt-button>

          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{getinfo.goods_no}}</p>
          <p>库存情况:{{getinfo.stock_quantity}}</p>
          <p>上架时间:{{getinfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <div class="btn2">
          <router-link :to="'/home/goodsList/particulars/'+getinfo.id" type="button"
            class="mui-btn mui-btn-primary mui-btn-outlined" tag="button">图文详情</router-link>
          <router-link :to="'/home/goodsList/goodsComment/'+getinfo.id
          " type="button" class="mui-btn mui-btn-danger mui-btn-outlined">发表评论</router-link>
        </div>
      </div>
    </div>

    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" @transitionend="end"></div>
    </transition>
  </div>
</template>

<script>
  import banner from "../subcomponents/banner.vue";
  import number from "../subcomponents/number.vue";
  export default {
    name: "goodsInFor",
    data() {
      return {
        getdesc: [],
        id: this.$route.params.id,
        getinfo: [],
        banner: {},
        flag: false,
        isShow: false,
        count:1
      };
    },
    components: {
      banner,
      number,
    },
    created() {
      this.getGetdesc();
      this.getGetinfo();
      this.getBanner();
    },
    methods: {
      // 商品价格
      getGetdesc() {
        this.$axios.get("api/goods/getdesc/" + this.id).then(res => {
          if (res.data.status === 0) {
            this.getdesc = res.data.message[0];
          }
          // console.log(res);
        });
      },
      getGetinfo() {
        this.$axios.get("/api/goods/getinfo/" + this.id).then(res => {
          if (res.data.status === 0) {
            this.getinfo = res.data.message[0];
          }
        });
      },
      // 轮播图
      getBanner() {
        this.$axios.get("/api/getthumimages/" + this.id).then(res => {
          if (res.data.status === 0) {
            // 和首页的轮播图不一致
            // 更改
            res.data.message.forEach(item => {
              item.img = item.src
            });
            this.banner = res.data.message;
          }
        });
      },
      // 点击加入购物车
      goCart() {
        if (this.isShow) return false;
        this.isShow = true;
        this.flag = !this.flag;

        // 加入购物车的操作
        let goodsList={
          id:this.id,
          count:parseInt(this.count) ,
          price:this.getinfo.sell_price,
          selected:true
        }
        this.$store.commit('addToCart',goodsList);
        
      
      },
      // 定义一个方法获取子组件上的数量
      getCount(count){
        this.count=count
      },
      beforeEnter(el) {
        el.style.transform = 'translate(0px,0px)';
      },
      enter(el, done) {
        //问题:每个屏幕的分辨率不同，需要动态计算这个坐标值
        //解决:通过dom. getBoundingClientRect() 动态获取基于窗口的坐标
        // 小球
        let ball = el.getBoundingClientRect();
        // 徽标
        let badge = document.querySelector('.mui-badge').getBoundingClientRect()
        // 求差
        let x = badge.left - ball.left;
        let y = badge.top - ball.top;

        el.offsetHeight;
        el.style.transform = `translate(${x}px,${y}px)`;
        el.style.transition = 'all 1s cubic-bezier(0,-0.47, 0.78,-0.1)';
        done();

      },
      afterEnter() {
        this.flag = !this.flag;

      },
      end() {
        this.isShow = false;

      }

    }
  };
</script>

<style scoped lang='less'>
  .mui-card-content.price {
    p {
      padding: 0 10px;

      span {
        color: red;
        margin: 0 10px;
      }
    }

    .btn {
      margin: 10px 0;


    }
  }

  .btn2 {
    width: 100%;

    .mui-btn {
      margin: 10px 0;
      width: 100%;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 480px;
    left: 150px;

  }
</style>
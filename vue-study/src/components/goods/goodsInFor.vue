<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in images" :key="item.id">
        <img :src="item.src" alt />
      </mt-swipe-item>
    </mt-swipe>

    <div class="mui-card">
      <div class="mui-card-header">{{getinfo.title}}</div>
      <div class="mui-card-content price">
        <p>
          <s>市场价: {{getinfo.market_price }}</s>
          <span>销售价:{{getinfo.sell_price}}</span>
        </p>
        <div class="mui-card-content-inner">
          <span>购买数量:</span>
          <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="getinfo.stock_quantity">
            <button class="mui-btn mui-btn-numbox-minus" type="button" disabled>-</button>
            <input id="test" class="mui-input-numbox" type="number" value="5" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
          </div>
          <div class="btn">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
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
          <router-link
            :to="'/home/goodsList/particulars/'+getinfo.id"
            type="button"
            class="mui-btn mui-btn-primary mui-btn-outlined"
            tag="button">图文详情</router-link>
          <router-link 
          :to="'/home/goodsList/goodsComment/'+getinfo.id
          " type="button"
          class="mui-btn mui-btn-danger  mui-btn-outlined">
            发表评论
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsInFor",
  data() {
    return {
      getdesc: [],
      id: this.$route.params.id,
      getinfo: [],
      images: {}
    };
  },
  created() {
    this.getGetdesc();
    this.getGetinfo();
    this.getBanner();
    console.log(this.id);
  },
  methods: {
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
        console.log(res);
      });
    },
    getBanner() {
      this.$axios.get("/api/getthumimages/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.images = res.data.message;
          console.log(this.images);
        }
        // console.log(res);
      });
    }
  }
};
</script>

<style scoped lang='less'>
.mint-swipe {
  width: 100%;
  height: 300px;
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
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
  .mui-btn  {
    margin: 10px 0;
    width: 100%;
  }
}
</style>
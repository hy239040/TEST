<template>
  <div>
    <ul>
      <li v-for="item in goods" :key="item.id">
        <router-link :to="'/home/goodsList/goodsInFor/'+item.id" tag="div" class="main">
          <img :src="item.img_url" alt />
          <h3>{{item.title}}</h3>
          <div class="pice">
            <p>
              <span>{{item.sell_price}}</span>
              <span>{{item.market_price}}</span>
            </p>
            <p>
              <span>热卖中</span>
              <span>{{item.stock_quantity}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-button plain type="danger" size="large" @click="getPageindex">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  data() {
    return {
      pageindex: 1,
      goods: [],
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      this.$axios.get(`/api/getgoods?pageindex=${this.pageindex}`).then(res => {
        if (res.data.status === 0) {
          this.goods=this.goods.concat(res.data.message);
        }
      });
    },
    getPageindex() {
      this.pageindex++;
      this.getGoods();
      if (this.pageindex>2) {
        return this.toast("没有更多内容了")
      }
    }
  }
};
</script>

<style scoped lang='less'>
ul {
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 10px;

  li {
    width: 50%;
    box-sizing: border-box;
    float: left;
    // margin: 10px 0;
    padding: 5px;

    .main {
      border: 1px solid #ccc;
      padding: 5px;

      h3 {
        font-size: 14px;
        float: left;
      }

      img {
        width: 100%;
      }

      .pice {
        margin-top: 50px;

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
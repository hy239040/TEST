<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media myCart" v-for="(item, i) in goods" :key="item.id">
        <mt-switch class="switch" v-model="$store.getters.getSwitch[item.id]"
          @change="getSwitch(item.id,$store.getters.getSwitch[item.id])"></mt-switch>
        <div class="main">
          <img class="mui-media-object mui-pull-left" :src="item.thumb_path" />
          <div class="mui-media-body">
            {{item.title}}
            <div>
              <span>￥{{item.sell_price}} 元</span>
              <cart-num class="box" :initCart='$store.getters.getCountById[item.id]' @getGoodNum='getGoodsNum' :id="item.id"></cart-num>
              <a href="#" @click="remove(i,item.id)">删除</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>总计(不计运费)</p>
          <p>已勾选商品 <span>{{$store.getters.getGoods.amount}}</span>件,
          总价<span>￥{{$store.getters.getGoods.sum}}</span> </p>
          <mt-button type="danger">立即支付</mt-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cartNum from '../subcomponents/cartNum.vue';
  export default {
    name: "cart",
    data() {
      return {
        goods: [],
      };
    },
    components: {
      cartNum,
    },
    created() {
      this.getCart();
      this.remove();
      this.getSwitch();
    },
    methods: {
      getCart() {
        let ids = [];
        /*   
          this.$axios.get("api/goods/getshopcarlist/" + ids.join(',')).then(res => {
            if (res.data.status === 0) {  
              this.goods = res.data.message;
            }
          }); */
        this.$store.state.cart.forEach(item => ids.push(parseInt(item.id)));
        if (ids.length<=0) return;
        this.$http.get("api/goods/getshopcarlist/" + ids.join(',')) 
          .then(res => {
            this.goods = res.message;
          })
      },
      remove(i, id) {
        this.goods.splice(i, 1);
        // 删除
        this.$store.commit('removeID', id)
      },
      getSwitch(id, sel) {
        // 更新到仓库
        this.$store.commit('updateSelected', {
          id: id,
          selected: sel
        })
      },
      getGoodsNum(num,id){
          this.$store.commit('getNum',{id:id,num:num})
      }
      
    }
  };
</script>

<style lang="less" scoped>
  .mint-switch-label {
    margin-left: 10px;
    flex: 9;
  }

  .mui-media-object {
    line-height: 42px;
    max-width: 80px;
    height: 80px;
  }

  .box {
    display: inline-block;
  }

  .mui-media-body {
    div {
      span {
        color: red;
        font-size: 14px;
      }

      .mui-numbox {
        margin: 5px
      }
    }
  }

  .mui-card {
    position: relative;

    p {
      span {
        color: red;
      }
    }

    .mint-button--normal {
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }
</style>
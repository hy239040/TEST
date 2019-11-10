<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in goods" :key="item.id">
        <mt-switch class="switch"></mt-switch>
        <div class="main">
          <img class="mui-media-object mui-pull-left" :src="item.thumb_path" />
          <div class="mui-media-body">
            {{item.title}}
            <div>
              <span>￥{{item.sell_price}}</span>
              <div class="mui-numbox" data-numbox-min="1" data-numbox-max="10">
                <button class="mui-btn mui-btn-numbox-minus" type="button" disabled>-</button>
                <input id="test" class="mui-input-numbox" type="number" value="5" />
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
              <a href="#">删除</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      goods: [],
      id: [87, 88, 89]
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.$axios.get("api/goods/getshopcarlist/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.goods = res.data.message;
        }
      });
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
.mui-media-body{
  div{
    span{
      color: red;
    }
    .mui-numbox{
      margin: 5px
    }
  }
}
</style>
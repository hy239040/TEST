<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipe" :key="item.id">
                <img :src=item.img alt="" :class="{width:w}" >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script  >
    export default {
        name:'banner',
        props: ['swipe','w'],
    }
</script>

<style lang='less' scoped>
 .mint-swipe {
    // width: 100%;
    height: 270px;
    text-align: center;

    .mint-swipe-item {
      img {
        // width: 100%;
        height: 100%;
      }
    }
  }
  .width{
    width: 100%;
  }
</style>
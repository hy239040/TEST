<template>
  <div>
    <h3>{{particulars.title}}</h3>
    <hr />
    <div v-html="particulars.content"></div>
  </div>
</template>

<script>
export default {
  name: "particulars",
  data() {
    return {
      particulars: [],
      id: this.$route.params.id
    };
  },
  created() {
    this.getParticulars();
  },
  methods: {
    getParticulars() {
      this.$axios.get("/api/goods/getdesc/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.particulars = res.data.message[0];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
div {
    padding: 5px;
  h3 {
    font-size: 16px;
    padding: 10px;
  }
}
</style>
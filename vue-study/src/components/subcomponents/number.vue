<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="maxNum">
            <button class="mui-btn mui-btn-numbox-minus" type="button" disabled>-</button>
            <input @change='countChanged' ref="numBox" id="test" class="mui-input-numbox" type="number" value="1" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'number',
        props: ['maxNum'],
        mounted() {
            this.mui('.mui-numbox').numbox()
            // 1.检查单词
            // 2. 仓巷数据来源: 数据从异步请求过来的, 无法知道什么时间段能传过来值
            // 解决: 使用watch监听
            // console.log(this.maxNum);
        },
        watch: {
            'maxNum': function (newVal, oldVal) {
                this.mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        },
        methods: {
            countChanged(){
                // 获取输入框的值
                // 正在元素中设置ref属性值, 在js通过tihs.ref
                console.log(this.$refs.numBox.value);
                this.$emit('getNum', this.$refs.numBox.value);
            }
        },
    }
</script>

<style>

</style>
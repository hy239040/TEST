<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="50">
            <button class="mui-btn mui-btn-numbox-minus" type="button" disabled>－</button>
            <input  ref="numBox" id="test" class="mui-input-numbox" type="number" :value="initCart" @change='numChanged' />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'number',
        props:['initCart','id'],
        mounted() {
            this.mui('.mui-numbox').numbox()
            
        },
        methods: {
            numChanged(){
                console.log(this.$refs.numBox.value);
                this.$emit('getGoodNum', parseInt(this.$refs.numBox.value),this.id)
                
            }
        },
        
    }
</script>

<style>

</style>
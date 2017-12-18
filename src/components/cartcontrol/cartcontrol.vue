<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"
           @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 通知父组件添加商品，执行动画
        this.$emit('cart-add', event.target);
      },
      decreaseCart () {
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      padding: 6px
    .cart-decrease
      &.move-enter-active, &.move-leave-active
        transition: all .4s linear
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate(24px, 0)
    .cart-count
      vertical-align: top
      display: inline-block
      font-size: 10px
      width: 12px
      padding-top: 6px
      text-align: center
      line-height: 24px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
</style>

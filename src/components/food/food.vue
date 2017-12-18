<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img class="image" :src="food.image">
          <i class="icon-arrow_lift" @click="hide"></i>
        </div>
        <div class="content">
          <h2 class="title">{{food.name}}</h2>
          <div class="extra">
            <span class="sell">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span
            class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @cart-add="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
          <split></split>
        </div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings" @ratingType="ratingTypeEvent"
                        @contentToggle="contentToggleEvent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item border-1px" v-for="rating in food.ratings"
                  v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDateFuc}}</div>
                <p class="text">
                  <span class="icon"
                        :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  <span class="content">{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价！
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import { formatDate } from 'common/js/date';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
//         初始化状态
//        this.selectType = ALL;
//        this.onlyContent = false;
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        console.log(event.target);
        // 添加商品
        Vue.set(this.food, 'count', 1);
        //
        this.$emit('cart-add', event.target);
      },
      addFood () { // 通知
        this.$emit('cart-add', event.target);
      },
      ratingTypeEvent (type) {   // 监听评价内容的切换
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentToggleEvent (contentToggle) { // 监听是否有误内容切换
        this.onlyContent = contentToggle;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    },
    filters: {
      formatDateFuc (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all .2s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(-100%, 0, 0)
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-bottom: 100%
      .image
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .icon-arrow_lift
        position: absolute
        left: 0
        top: 0
        padding: 10px
        width: 20px
        height: 20px
        font-size: 20px
        color: #fff
    .content
      position: relative
      overflow: hidden
      .title
        font-size: 14px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
        margin: 18px 0 8px 18px
      .extra
        margin-left: 18px
        font-size: 10px
        line-height: 10px
        color: rgb(147, 153, 159)
      .price
        margin: 18px 0 18px 18px
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          color: rgb(240, 20, 20)
          font-size: 14px
        .old
          font-size: 10px
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .add-cart
        position: absolute
        right: 18px
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        color: #fff
        border-radius: 12px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        background: rgb(0, 160, 220)
        &.fade-enter-active, &.fade-leave-active
          transition: all .2s
        &.fade-enter, &.fade-leave-to
          opacity: 0

    .info
      .title
        line-height: 14px
        margin: 18px 0 6px 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        margin: 0 26px 18px 26px
        color: rgb(77, 85, 93)
        font-weight: 200
        font-size: 12px
        line-height: 24px

    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        margin: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 16px
            font-size: 0
            line-height: 12px
            .name
              display: inline-block
              font-size: 10px
              vertical-align: top
              color: rgb(147, 153, 159)
              padding-right: 6px
            .avatar
              border-radius: 50%
          .time
            line-height: 12px
            font-size: 10px
            margin-bottom: 6px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            .icon
              line-height: 16px
              margin-right: 4px
              &.icon-thumb_down
                color: rgb(147, 153, 159)
              &.icon-thumb_up
                color: rgb(0, 160, 220)
            .content
              line-height: 16px
              color: rgb(7, 17, 27)

        .no-rating
          color: rgb(147, 153, 159)
          font-size: 12px
          padding: 16px 0
</style>

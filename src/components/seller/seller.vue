<template>
  <div class="seller" ref="seller">
    <div class="content">
      <div class="title-wrapper">
        <div class="title">{{seller.name}}</div>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text-order">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="heart">
          <p class="icon-favorite" :class="{'active':favorite}" @click="favoriteToggle"></p>
          <span class="text" v-text="favoriteText"></span>
        </div>
      </div>
      <div class="info">
        <div class="deliveryPrice">
          <p class="text">起送价</p>
          <span class="price">{{seller.deliveryPrice}}<i>元</i></span>
        </div>
        <div class="minPrice">
          <p class="text">商家配送</p>
          <span class="price">{{seller.minPrice}}<i>元</i></span>
        </div>
        <div class="deliveryTime">
          <p class="text">平均配送时间</p>
          <span class="price">{{seller.deliveryTime}}<i>分钟</i></span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <p class="text">广告与活动</p>
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item,index) in seller.supports">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="text">{{seller.supports[index].description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="seller-inside">
        <div class="title">商家实景</div>
        <div class="img-wrapper" ref="imgWrapper">
          <ul class="img-list" ref="imgList">
            <li class="img-item" v-for="img in seller.pics">
              <img :src="img" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <div class="title">商家信息</div>
        <p class="info-item" v-for="item in seller.infos">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import { saveToLocal, loadFromLocal } from 'common/js/store';

  export default {
    components: {
      star,
      split
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '收藏' : '未收藏';
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      // 初始化滚动
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      });
    },
    mounted () {
      this._initWidth();
    },
    watch: {
      seller () {
        this._initWidth();
      }
    },
    methods: {
      _initWidth () {
        if (this.seller.pics) {
          const width = 120;
          const marginRight = 6;
          let widthAll = (width + marginRight) * this.seller.pics.length - marginRight;
          this.$refs.imgList.style.width = widthAll + 'px';
          // 初始化图片横向滚动
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.imgWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      favoriteToggle () {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .content
      .title-wrapper
        position: relative
        padding: 18px 0
        margin: 0 18px
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .title
          color: rgb(7, 17, 27)
          padding-bottom: 8px
          line-height: 14px
          font-size: 14px
        .star-wrapper
          font-size: 0
          .star
            display: inline-block
            vertical-align: top
          .text-order
            margin: 0 12px 0 8px
            vertical-align: top
            font-size: 10px
            line-height: 18px
            color: rgb(77, 85, 93)
            display: inline-block
          .sell-count
            vertical-align: top
            font-size: 10px
            line-height: 18px
            color: rgb(77, 85, 93)
            display: inline-block
        .heart
          position: absolute
          right: 0
          top: 18px
          text-align: center
          .icon-favorite
            font-size: 24px
            color: #d4d6d9
            line-height: 24px
            &.active
              color: rgb(240, 20, 20)
          .text
            margin-top: 4px
            color: rgb(77, 85, 93)
            line-height: 10px
            font-size: 10px

      .info
        display: flex
        margin: 18px 0
        text-align: center
        .text
          color: rgb(147, 153, 159)
          line-height: 10px
          font-size: 10px
          padding-bottom: 4px
        .price
          font-size: 24px
          line-height: 24px
          color: rgb(7, 17, 27)
          text-align: center
          i
            font-style: normal
            font-size: 12px
        .deliveryPrice
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, .1)
        .minPrice
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, .1)
        .deliveryTime
          flex: 1

      .bulletin
        margin: 0 18px
        padding: 18px 0 16px 0
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .text
          color: rgb(7, 17, 27)
          padding-bottom: 8px
          line-height: 14px
          font-size: 14px
        .content
          padding: 0 12px
          line-height: 24px
          color: rgb(240, 20, 20)
          font-size: 12px

      .supports
        margin: 0 18px
        .support-item
          padding: 16px 0 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border-bottom: none
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            vertical-align: top
            color: rgb(7, 17, 27)
            font-size: 12px
            line-height: 16px
      .seller-inside
        margin: 0 18px
        .title
          margin-top: 18px
          margin-bottom: 12px
          color: rgb(7, 17, 27)
          font-size: 14px
          line-height: 14px
        .img-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .img-list
            fontsize: 0
            margin-bottom: 18px
            .img-item
              display: inline-block
              margin-right: 6px
              font-size: 0
      .seller-info
        margin: 0 18px
        .title
          margin: 18px 0 12px 0
          color: rgb(7, 17, 27)
          font-size: 14px
          line-height: 14px
        .info-item
          border-top: 1px solid rgba(7, 17, 27, .1)
          padding: 16px 12px
          color: rgb(7, 17, 27)
          font-size: 12px
          line-height: 16px

</style>

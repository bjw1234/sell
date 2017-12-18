<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <p class="score-text">综合评分</p>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="deliver-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"
                    @ratingType="ratingTypeEvent" :ratings="ratings"
                    @contentToggle="contentToggleEvent"></ratingselect>
      <ul class="rating-wrapper">
        <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in ratings">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score" class="star"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <span class="icon"
                    :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
              <span v-for="item in rating.recommend" class="item">{{item}}</span>
            </div>
            <div class="time">{{rating.rateTime | formatDateFuc}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from 'components/split/split';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import { formatDate } from 'common/js/date';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    components: {
      split,
      star,
      ratingselect
    },
    created () {
      const _this = this;
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          _this.ratings = response.data;
          // 初始化滚动
          _this.$nextTick(() => {
            _this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      ratingTypeEvent (type) {
        this.selectType = type;
        this.$nextTick(() => {
          if (this.scroll) {
            this.scroll.refresh();
          }
        });
      },
      contentToggleEvent (contentToggle) {
        this.onlyContent = contentToggle;
        this.$nextTick(() => {
          if (this.scroll) {
            this.scroll.refresh();
          }
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
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      margin: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        border-right: 1px solid rgba(7, 17, 27, .1)
        @media only screen and (max-width: 320px)
          flex: 0 0 110px
          width: 110px
        .score
          margin: 0 auto 6px auto
          text-align: center
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .score-text
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
          text-align: center
        .rankRate
          margin-top: 8px
          line-height: 10px
          font-size: 10px
          text-align: center
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 3px 0
        margin-left: 24px
        @media only screen and (max-width: 320px)
          margin-left: 10px
        .score-wrapper
          margin-bottom: 5px
          font-size: 12px
          line-height: 18px
          .title
            color: rgb(7, 17, 27)
            margin-right: 12px
          .star
            display: inline-block
            vertical-align: top
          .score
            color: rgb(255, 153, 0)
            margin-left: 12px
        .delivery-wrapper
          font-size: 12px
          line-height: 18px
          .title
            color: rgb(7, 17, 27)
          .deliver-time
            margin-left: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      margin: 0 18px
      .rating-item
        position: relative
        display: flex
        padding: 18px 0
        border-bottom: 1px solid rgba(147, 153, 159, .1)
        .avatar
          flex: 0 0 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          .name
            line-height: 12px
            color: rgb(7, 17, 27)
            font-size: 10px
          .star-wrapper
            font-size: 0
            padding: 4px 0 6px 0
            .star
              display: inline-block
            .delivery
              padding-left: 6px
              line-height: 12px
              color: rgb(147, 153, 159)
              font-size: 10px
          .text
            color: rgb(7, 17, 27)
            line-height: 18px
            font-size: 12px
          .recommend
            padding-top: 8px
            font-size: 0
            .icon
              color: rgb(0, 160, 220)
              line-height: 16px
              font-size: 12px
            .item
              color: rgb(147, 153, 159)
              font-size: 10px
              line-height: 16px
              display: inline-block
              border-radius: 2px
              margin: 0 8px 6px 8px
              padding: 0 6px
              vertical-align: top
              border: 1px solid rgba(7, 17, 27, .1)
              max-width: 50px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
          .time
            position: absolute
            right: 0
            top: 18px
            color: rgb(147, 153, 159)
            font-size: 10px
            line-height: 12px
</style>

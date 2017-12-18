<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2)" class="block positive" :class="{'active':selectTypeData === 2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectTypeData === 0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectTypeData === 1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggle(onlyContentData)" class="switch border-1px" :class="{'on':onlyContentData}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const NEGATIVE = 1;
  const POSITIVE = 0;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    created () {
      this.selectTypeData = ALL;
      this.onlyContentData = false;
    },
    data () {
      return {
        selectTypeData: {
          type: Number
        },
        onlyContentData: {
          type: Boolean
        }
      };
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type) {
        this.selectTypeData = type;
        // 告诉父组件
        this.$emit('ratingType', type);
      },
      toggle (onlyContentData) {
        this.onlyContentData = !onlyContentData;
        // 告诉父组件
        this.$emit('contentToggle', this.onlyContentData);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-style: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        color: rgb(77, 85, 93)
        font-size: 12px
        line-height: 16px
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, .2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, .2)
          &.active
            background: rgb(77, 85, 93)

    .switch
      color: rgb(147, 153, 159)
      border-1px(rgba(7, 17, 27, .1))
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        padding: 12px 4px 12px 18px
        font-size: 24px
        line-height: 24px
        color: rgb(147, 153, 159)
      .text
        display: inline-block
        line-height: 24px
        font-size: 12px
        vertical-align: top
        margin-top: 12px

</style>

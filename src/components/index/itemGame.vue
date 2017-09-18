<template>
  <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
    <div class="box2">
      <swiper :list="baseList" loop :aspect-ratio="6/9"></swiper>
      <listA></listA>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <listB></listB>
      <load-more tip="loading"></load-more>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
  import { Swiper, SwiperItem, Scroller, LoadMore } from 'vux';
  import listA from '../../components/common/list1';
  import listB from '../../components/common/list2';

  export default {
    data () {
      return {
        baseList: [{
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/3.jpg',
          title: '送你一次旅行'
        }],
        bottomCount: 0
      };
    },
    components: {
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore,
      listA,
      listB
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          //do nothing
        } else {
          this.onFetching = true;
          setTimeout(() => {
            this.bottomCount += 10;
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset();
            });
            this.onFetching = false;
          }, 2000);
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .swiper-demo-img {
    img {
      width: 100%;
      display: inline-block;
    }
  }
</style>

<template>

    <div class="carousel">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in slidesPic">
            <img :src="item.src"/>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- 滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </div>

</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    components: {
      Swiper
    },
    props: {
      slidesPic: {
        type: Array,
        default: []
      }
    },
    data () {
      return {

      }
    },
    mounted () {
      var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })
    }
  }
</script>

<style scoped>
  /*---banner---*/

  .carousel {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;

  }

  .swiper-container {
    max-width: 1130px;
    height: 300px;
    border-radius:15px;
    box-shadow: 0px 0px 20px #888888;
  }

  /*---banner-end---*/
</style>

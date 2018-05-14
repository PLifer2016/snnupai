<template>
<div>
  <div id="fzf-body">

    <div class="fzf-content">
      <h1>啊哦！</h1>
      <h2>页面找不到了!</h2>
      <h3 style="letter-spacing: 20px;">看起来你好像走丢了呢~~</h3>
    </div>
    <div class="button-content">
      <a href="index">
        <button type="button" id="returnIndex" class="button">返回首页</button>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import Button from "bootstrap-vue/es/components/button/button";
import myDialog from "../components/base/dialog"
import tradeForm from "../components/tradeForm"
import axios from "axios"
import qs from 'qs';

export default {
  components: {
    Button,
    myDialog,
    tradeForm
  },
  data () {
    return {

    }
  },
  methods: {

  },

  mounted () {

  },

}
</script>

<style>
  #fzf-body {
    height: 750px;
    width: 100%;
    padding-top: 30px;
    background: url("../assets/404-bg.jpg") no-repeat;
    background-size:100% 100%;
  }

  .fzf-content {
    margin-top: 70px;
    margin-left: 140px;
    line-height: 50px;
    letter-spacing: 30px;
    color: #000;
  }

  .button-content {
    margin-top: 30px;
    margin-left: 140px;
  }

  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 25px;
    margin-right: 20px;
    letter-spacing: 6px;
  }

  .button:hover {
    cursor: pointer;
  }
</style>

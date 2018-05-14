<template>
<div id="body">
  <header class="app-head">
    <nav>
      <div class="logo">
        <router-link :to="{path: '/'}">
          <img src="../assets/snnupai.png"/>
        </router-link>
      </div>

      <div class="menu">
        <div class="menu-box">
          <ul class="menu-list-content">
            <li class="menu-list-box"><router-link :to="{path: '/'}">首页</router-link></li>
            <li class="menu-list-box"><router-link :to="{path: '/trade'}">跳蚤市场</router-link></li>
            <li class="menu-list-box"><router-link :to="{path: '/loveWall'}">表白墙</router-link></li>
            <li class="menu-list-box"><a href="">论坛</a></li>
            <li class="menu-list-box"><a href="">老乡会</a></li>
            <li class="menu-list-box"><a href="">新生指南</a></li>
            <li class="menu-list-box"><a href="">师大印象</a></li>
            <li class="menu-list-box"><a href="">就业指南</a></li>
            <li class="menu-list-box">社团</li>
          </ul>
        </div>
      </div>
      <div class="user-center user-center-unlogin">
        <ul class="unlogin">
          <li v-if="username!==''"><a href="">{{ username }}</a><i></i></li>
          <li v-if="username!==''" @click="quit">退出</li>
          <li v-show="username===''"><router-link to="login">登录</router-link><i></i></li>
          <li v-show="username===''"><router-link to="register">注册</router-link></li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="app-content">
    <keep-alive>
      <router-view @loginSuccess="loginSuccess"></router-view>
    </keep-alive>
  </div>
  <footer id="footer">
    <div class="footer-wrapper">
      <div class="footer-wrapper-top">
        <div class="footer-wrapper-top-left">
          <a href="">加入我们</a>
          <a href="">招聘版主</a>
          <a href="">联系我们</a>
        </div>
        <div class="footer-wrapper-top-right">
          <p>这里可以添加微信、QQ、新浪微博等等</p>
        </div>
      </div>

      <div class="footer-wrapper-bottom">
        <a href="">陕ICP备XXXXX</a><i></i>
        <a href="">举报专区</a><i></i>
        <a href="">举报邮箱：假装是邮箱</a>
      </div>

      <div class="footer-wrapper-bootom space-footer-bottom">
        <span><a>这里放许可证之类的</a></span><i></i>
        <span><a>这里放许可证之类的</a></span>
        <span class="copyrightLink">Copyright © 2018-2018 陕师派开发团队</span>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
  import axios from 'axios'
export default {
  components: {

  },
  data () {
    return {
        username: '',
    }
  },
  methods: {
    loginSuccess (username,id) {
      this.username = username;
    },
    quit () {
      axios.get('/logout')
        .then((res) => {
          console.log("退出成功：");
          console.log(res);
          if(res.data === "ok"){
            this.username = '';
            this.$Message.success("成功");
          } else {
            this.$Message.error("退出失败");
          }
        })
    },

  },
  mounted () {

      axios.get('/getUserInfo')
        .then((res) => {
          console.log("getUserInfo:");
          console.log(res);
          if(res.data.msg === 'ok'){
            console.log("获取用户信息成功！");
            this.username = res.data.username;
          }
        })
  }
}
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }



  #body {
    position: relative;
    padding-bottom: 229px;
    background-color: #f4f4f4;
  }

  ul li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  /*---header---*/

  header {
    background-color: #f28c48;
    color: #fff;
  }

  header nav {
    height: 72px;
  }

  header nav a {
    font-size: 16px;
  }

  header nav .logo {
    position: absolute;
    top: 18px;
    left: 5%;
  }

  header nav .menu {
    padding-left: 20%;
  }

  header nav .menu .menu-box {
    text-align: center;
  }

  header nav .menu .menu-box  .menu-list-content{
    height: 56px;
    margin: 0 auto;
  }

  header nav .menu .menu-box  .menu-list-content li{
    float: left;
    cursor: pointer;
    height: 56px;
    line-height: 72px;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }

  header nav .menu .menu-box  .menu-list-content li a{
    color: #fff;
  }

  header nav .user-center {
    position: absolute;
    top: 0;
    right: 0;
    width: 330px;
    height: 56px;
  }

  header nav .user-center ul {
    float: right;
    margin-right: 30%;
  }

  header nav .user-center ul li {
    float: left;
    line-height: 72px;
  }

  header nav .user-center ul li a{
    color: #fff;
  }

  header nav .user-center ul li i {
    display: inline-block;
    width: 1px;
    height: 10px;
    background: #444;
    margin-left: 10px;
    margin-right: 10px;
  }

  /*---footer---*/

  footer {
    width: 100%;
    height: 229px;
    background-color: #282828;
    position: absolute;
    bottom: 0;
  }

  footer .footer-wrapper {
    height: 100%;
    width: 75%;
    margin: 0 auto;
    color: #666;
  }

  footer .footer-wrapper .footer-wrapper-top {
    height: 130px;
    width: 100%;
    line-height: 130px;
    border-bottom: 1px solid #333;
  }

  footer .footer-wrapper .footer-wrapper-top .footer-wrapper-top-left {
    float: left;
  }

  footer .footer-wrapper .footer-wrapper-top .footer-wrapper-top-right {
    float: right;
  }

  footer .footer-wrapper .footer-wrapper-top .footer-wrapper-top-left a {
    margin-right: 50px;
    color: #666;
  }

  footer .footer-wrapper .footer-wrapper-bottom {
    position: relative;
    margin-top: 24px;
    font-size: 12px;
  }

  footer .footer-wrapper .footer-wrapper-bottom a {
    color: #666;
  }

  footer .footer-wrapper i {
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: #666;
    vertical-align: middle;
    margin: 0 19px;
  }

  footer .footer-wrapper .space-footer-bottom a{
    color: #666;
    font-size: 12px;
  }

  footer .footer-wrapper .space-footer-bottom .copyrightLink {
    font-size: 12px;
    float: right;
  }

  /*---footer-end---*/



</style>

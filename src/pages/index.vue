<template>
  <div>
    <!--公告-->
    <div class="marquee-div">
			  <p class="marquee">
			    {{ announcement }}
			  </p>
    </div>
    <!--轮播框和详细内容-->
    <div>
      <swiper-slide :slidesPic="slidesPic"></swiper-slide>

      <div class="snnupai-content">
        <!-- 门户 -->
        <div class="portal">
          <div class="forum-title">
            <h3>师大门户</h3>
          </div>
          <div class="portal-content">
            <div class="portal-content-row">
              <span><a href="http://219.244.71.113/login.jsp">选课系统（内网访问）</a></span><i></i>
              <span><a href="http://sztz.snnu.edu.cn/">大学生素质拓展认证系统</a></span><i></i>
              <span><a href="http://www.lib.snnu.edu.cn/action.do?webid=w-l-index-m">陕师大图书馆（内网访问）</a></span><i></i>
              <span><a href="http://opac.snnu.edu.cn:8991/F">馆藏书目查询</a></span><i></i>
              <span><a href="http://www.lib.snnu.edu.cn/action.do?webid=w-l-showchildmenu&cmid=w-a-dzsjk">电子数据库</a></span><i></i>
              <span><a href="http://www.lib.snnu.edu.cn/action.do?webid=w-l-zwsjk-v&dbid=55&goback=w-d-zwsjk">随书光盘</a></span><i></i>
            </div>
            <div class="portal-content-row">
              <span><a href="http://www.snnu.edu.cn/jgsz1/jxkydw.htm">教学科研单位</a></span><i></i>
              <span><a href="http://service.snnu.edu.cn/">后勤服务</a></span><i></i>
              <span><a href="http://bwg1.snnu.edu.cn/">博物馆</a></span><i></i>
              <span><a href="http://bb.snnu.edu.cn/">陕西师范大学在线课程平台（bb平台）</a></span><i></i>
              <span><a href="https://mail.snnu.edu.cn/">师大邮箱</a></span><i></i>
              <span><a href="https://weibo.com/snnu1944">官方新浪微博</a></span><i></i>
              <span><a href="http://xgxt.snnu.edu.cn/ssoserver/login.jsp">学工系统</a></span><i></i>
            </div>
            <div class="portal-content-row">
              <span><a href="http://zyfw.snnu.edu.cn/">志愿服务</a></span><i></i>
              <span><a href="http://202.117.144.241/schoolcar/jj.aspx">陕师大校车时刻表（内网访问）</a></span><i></i>
              <span><a href="http://www.snnu.edu.cn/xysh/bgdh.htm">校内办公电话查询系统</a></span><i></i>
              <span><a href="http://tuanwei.snnu.edu.cn/">为学网</a></span><i></i>
              <span><a href="http://nic.snnu.edu.cn/">网络信息中心</a></span><i></i>
            </div>
          </div>

        </div>

        <div class="banner-box">
          <img src="../assets/banner-box1.jpg"/>
        </div>




        <!-- 各个版块 -->
        <div class="snnupai-module section-entrance">
          <div class="forum-title">
            <h3>版块地图</h3>
          </div>
          <div class="content">
            <div class="row">
              <div class="col-md-3">
                <ul>
                  <li>
                    <a href="">
                      <img src="../assets/impression.jpg"/>
                    </a>
                  </li>
                </ul>

              </div>
              <div class="col-md-9" >
                <ul>
                  <li class="one-row">
                    <a href=""><img src="../assets/luntan.jpg"/></a>
                  </li>
                  <li class="one-row">
                    <a href=""><img src="../assets/biaobai.jpg"/></a>
                  </li>
                  <li class="one-row">
                    <a href=""><img src="../assets/laoxiang.jpg"/></a>
                  </li>
                  <li class="two-row">
                    <a href=""><img src="../assets/lost.jpg"/></a>
                  </li>
                  <li class="two-row">
                    <a href=""><img src="../assets/shichang.jpg"/></a>
                  </li>
                  <li class="two-row">
                    <a href=""><img src="../assets/xinsheng.jpg"/></a>
                  </li>
                </ul>
              </div>

            </div>
          </div>


        </div>

        <div class="banner-box">
          <img src="../assets/banner-box2.jpg"/>
        </div>

        <!-- 专题活动 -->
        <div class="snnupai-module special-events">
          <div class="forum-title">
            <h3>专题活动</h3>
          </div>
          <div class="content">
            <div class="row">
              <div>
                <ul>
                  <li>
                    <a href="">
                      <img src="../assets/xianshang.jpg"/>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="../assets/xianxia.jpg"/>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="../assets/kaoyan.jpg"/>
                    </a>
                  </li>
                  <li class="last-one">
                    <a href="">
                      <img src="../assets/jiuye.jpg"/>
                    </a>
                  </li>
                </ul>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import swiperSlide from '../components/swiperSlide'
import axios from 'axios'
export default {
  components: {
    swiperSlide
  },
  data () {
    return {
      announcement: '',
      slidesPic: [
        {
          src: require('../assets/banner1.jpg'),
        },
        {
          src: require('../assets/banner2.jpg'),
        },
        {
          src: require('../assets/banner3.jpg'),
        }
      ]
    }
  },

  mounted () {
    axios.get('/query/gonggao')
      .then((res) => {
        console.log("公告：");
        console.log(res);
        this.announcement = res.data.msg;
      })
  }

}
</script>

<style scoped>
  .marquee {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    animation: marquee 30s linear infinite;
  }

  .marquee:hover {
    animation-play-state: paused
  }

  /* Make it move */
  @keyframes marquee {
    0%   { text-indent:  calc(100%) }
    100% { text-indent:  calc(-100%)}
  }

  /* Make it pretty */
  .marquee {
    padding-left: 1.5em;
    position: relative;
    font: 16px 'Segoe UI', Tahoma, Helvetica, Sans-Serif;
  }

  /*------announcement-end-------*/



  /*---snnupai-content---*/


  .snnupai-content {

  }

  /*------portal------*/
  .snnupai-content .portal {
    max-width: 1130px;
    margin: 20px auto;
    border-radius:10px;
    background-color: #fff;
    box-shadow: 0px 0px 15px #88888847;
    overflow: hidden; /*撑开父元素*/
  }

  .forum-title  {
    border-bottom: 3px solid #dadada;
    padding-top: 10px;
    margin: 0 20px;
  }

  .forum-title  h3{
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .snnupai-content .portal .portal-content {
    margin: 20px 20px;
  }

  .snnupai-content .portal .portal-content span a{
    font-size: 15px;
  }

  .snnupai-content .portal .portal-content i {
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: #666;
    vertical-align: middle;
    margin: 0 19px;
  }

  .snnupai-content .portal .portal-content .portal-content-row {
    margin: 10px auto;
  }

  .snnupai-content .portal .portal-content .portal-content-row a {
    color: #337ab7;
    text-decoration: none;
  }
  /*------portal-end------*/

  /*------banner-box------*/

  .snnupai-content .banner-box {
    max-width: 1130px;
    height: 120px;
    margin: 10px auto;
    overflow: hidden; /*撑开父元素*/
  }

  /*------banner-box-end------*/

  /*------section-entrance------*/

  .snnupai-content .snnupai-module {
    max-width: 1130px;
    margin: 20px auto;
    overflow: hidden; /*撑开父元素*/
  }

  .snnupai-content .content {
    margin-top: 20px;
  }


  .snnupai-content .snnupai-module .content .row .col-md-3 ul {
    padding: 0;
  }

  .snnupai-content .snnupai-module .content .row li:hover {
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    transform: translate3d(0, -2px, 0);
  }

  .snnupai-content .snnupai-module .content .row .col-md-3 ul li{
    width: 270px;
  }

  .snnupai-content .snnupai-module .content .row .col-md-9 {
    padding: 0;
  }

  .snnupai-content .snnupai-module .content .row .col-md-9 ul {
    padding: 0;
  }
  .snnupai-content .snnupai-module .content .row .col-md-9 ul li{
    float: left;
    height: 240px;
    width: 260px;
    background-color: white;
  }

  .snnupai-content .snnupai-module .content .row .col-md-9 ul .one-row {
    margin-top: 0;
    margin-left: 25px;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .snnupai-content .snnupai-module .content .row .col-md-9 ul .two-row {
    margin-top: 0;
    margin-left: 25px;
    margin-right: 0;
    margin-bottom: 0;
  }
  /*------section-entrance-end------*/

  /*------special-events------*/

  .special-events .content .row {
    margin: 0;
  }

  .special-events .content .row div ul {
    padding: 0;
  }
  .special-events .content .row div ul li {
    float: left;
    margin-right: 16px;
  }

  .special-events .content .row div ul .last-one {
    margin-right: 0;
  }

  /*------special-events-end------*/

  /*---snnupai-content-end---*/
</style>

<template>
<div>
  <div class="trade-header">
    <div class="trade-header-bg">
      <div class="trade-title">
        <h1>跳蚤市场</h1>
      </div>
      <div class="trade-edit">
        <button type="button" class="btn" @click="writeTradeInfoClick">发布二手商品</button>
      </div>
    </div>
  </div>
  <div class="trade-body">
      <ul>
        <Row :gutter="80">
          <i-col span="6" v-for="(item, index) in tradeList" :key="item.tradeId">
            <li>
              <div class="trade-info">
                <router-link :to="{path: '/tradeDetail/'+item.tradeId}" @click.native="flushCom">
                  <img :src="item.imageUrl"/>
                </router-link>
                <div class="trade-des ">
                  <p>标题：{{ item.title }}</p>
                  <p>时间：{{ item.createdDate }}</p>
                  <p>地点：{{ item.xiaoQu }}</p>
                  <p>描述：{{ item.content }}</p>
                </div>
                <div class="collection">
                  <i-button style="float:right;margin-top: 10px;margin-right: 10px;" v-if="!item.follow" @click="follow($event, item.tradeId, index)">关注</i-button>
                  <i-button style="float:right;margin-top: 10px;margin-right: 10px;" type="primary" v-if="item.follow" @click="follow($event, item.tradeId, index)">已关注</i-button>
                </div>
              </div>
            </li>
          </i-col>
        </Row>
      </ul>
    <div v-if="tradeInfoNoMore">
      <p style="text-align: center;">没有更多消息了~~~</p>
    </div>
  </div>
  <my-dialog :is-show="isShowWriteTradeInfo" @on-close="closeDialog('isShowWriteTradeInfo')">
    <trade-form @addTradeInfo="addTradeInfoToList"></trade-form>
  </my-dialog>
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
      isShowWriteTradeInfo: false,
      isLogin: false,
      tradeList: [],
      page: 1,
      userInfo: {
        userName: '',
        userId: '',
      },
      tradeInfoNoMore: false,
    }
  },
  methods: {
    writeTradeInfoClick () {
      this.getUserInfo ();
      if(!this.isLogin) {
        this.$Message.error("请先登录后再发布！");
        return;
      }
      this.isShowWriteTradeInfo = true;
    },

    closeDialog (attr) {
      this[attr] = false;
    },

    getUserInfo () {
      let self = this;
      axios.get('/api/getUserInfo')
        .then((res) => {
          console.log("getUserInfo:");
          console.log(res);
          if(res.data.msg === 'ok'){
            this.userInfo.userName = res.data.username;
            this.userInfo.userId = res.data.userId;
            self.isLogin = true;
          } else {
            self.isLogin = false;
          }
        })
    },

    getMoreTradeInfo () {

      if(this.page === 1){
        //获取10条商品信息，
        axios.get("/api/get/trade/list",{
            params: {
              offset: this.page,
              limit: 5
          }
        })
          .then((res) => {
            console.log(this.page);
            console.log(res);
            console.log(res.data.tradeInfos);
            var moreTradeList = res.data.tradeInfos;
            for(var i=0; i<moreTradeList.length; i++){
              this.tradeList.push(moreTradeList[i]);
            }
            if(res.data.noMore == true) {
              this.tradeInfoNoMore = true;
            }
          }, (error) => {
            console.log(error);
          });
        this.page++;
      }
      else {
        axios.get("/api/get/trade/list",{
          params: {
            offset: this.page,
            limit: 10
          }
        })
          .then((res) => {
            //console.log(res);
            //console.log(res.data.loveInfoList);
            if(res.data.noMore === true){
              this.tradeInfoNoMore = true;
            } else {
              var moreTradeList = res.data.tradeInfos;
              for(var i=0; i<moreTradeList.length; i++){
                this.tradeList.push(moreTradeList[i]);
              }
            }
          }, (error) => {
            console.log(error);
          });
        this.page++;
      }


    },

    addTradeInfoToList () {
      this.closeDialog('isShowWriteTradeInfo');
      this.tradeList = [];
      this.page = 1;
      this.getMoreTradeInfo();
    },

    follow (e,id,index) {
      if(!this.isLogin) {
        this.$Message.error("请先登录后再收藏！");
        return;
      }
      //对一条表白帖子关注，返回值：msg：ok or fail
      axios.post('/follow/trade',
        qs.stringify({
          tradeId: id,
        })
      )
        .then((res) => {
          if(res.data.msg === 'ok'){
            this.tradeList[index].follow = !this.tradeList[index].follow;
          } else {
            this.$Message.error('操作失败');
          }

        });
    },

    flushCom:function(){
      //router是路由实例,例如:var router = new Router({})
      //router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
      this.$router.go(0);
    }
  },

  mounted () {
    this.getUserInfo ();
    this.getMoreTradeInfo ();
    window.addEventListener('scroll', () => {
      if( document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight) {
        this.getMoreTradeInfo ();
      }
    })
  },

}
</script>

<style>

  .trade-header {
    max-width: 1130px;
    height: 210px;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #fff;
  }

  .trade-header .trade-header-bg {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: url('../assets/flea-market-bg.jpg');
  }

  .trade-header .trade-header-bg .trade-title {
    padding-top: 5%;
  }

  .trade-header .trade-header-bg .trade-title h1 {
    text-align: center;
    color: #fff;
    letter-spacing: 10px;
    font-size: 50px;
  }

  .trade-header .trade-header-bg .trade-edit button {
    float: right;
    margin: 20px;
    background-color: #fff;
    border: 1px dashed #f28c48;
    border-radius: 5px;
  }

  .trade-header .trade-header-bg .trade-edit button:hover {
    background-color: #f28c48;
    color: #fff;
  }

  .trade-body {
    max-width: 1130px;
    margin: 0 auto 30px;
  }


  .trade-body ul {
    padding: 0;
  }

  .trade-body li {
    height: 350px;
    margin: 10px 0;

  }
  .trade-body li .trade-info {
    position: relative;
    box-shadow: 0px 0px 15px #88888847;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
  }

  .trade-body  li .trade-info .trade-des {
    width: 80%;
    margin: 10px auto 0;
  }

  .trade-body  li .trade-info .trade-des p{
    margin-top: 10px;
  }

  .trade-body li .trade-info img {
    width: 100%;
    height: 52%;
  }

  .collection {
    width: 100%;
    position: absolute;
    border-top: 1px solid #8080802b;
    bottom: 10px;
  }



</style>

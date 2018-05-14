<template>
<div>
  <div class="trade-header">
    <div class="trade-header-bg">
      <div class="trade-title">
        <h1>跳蚤市场</h1>
      </div>
    </div>
  </div>

  <div class="trade-detail">
    <div class="trade-detail-header">
      <Row :getter="16">
        <i-col span="9">
          <div class="trade-detail-img">
            <img :src="tradeInfo.images[0]" style="width: 100%; margin: 0 auto; display:block"/>
          </div>
        </i-col>
        <i-col span="14" offset="1">
          <div class="trade-detail-info">
            <h3><strong>标题：</strong>{{ tradeInfo.title }}</h3>
            <h3><strong>发布人：</strong>{{ tradeInfo.nickname }}</h3>
            <h3><strong>发布时间：</strong>{{ tradeInfo.time }}</h3>
            <h3><strong>价格：</strong>{{ tradeInfo.price }}元</h3>
            <h3><strong>QQ：</strong>{{ tradeInfo.qq }}</h3>
            <h3><strong>微信：</strong>{{ tradeInfo.weixin }}</h3>
            <h3><strong>描述：</strong>{{ tradeInfo.describe }}</h3>
            <Row>
              <i-col v-if="confirmIfOne.announcer === confirmIfOne.visitor">
                <Button type="primary" v-if="!isComfirmed" @click="confirmSold">已出售</Button>
                <Button type="primary" v-if="isComfirmed">确认成功</Button>
                <span>（请卖家卖出宝贝后，及时点击以确认出售）</span>
              </i-col>
            </Row>
          </div>
        </i-col>
      </Row>
    </div>
    <div style="margin-top: 20px;">
      <Tabs value="tradeImg">
        <TabPane label="宝贝图片" name="tradeImg">
          <div v-for="item in tradeInfo.images" style="width: 80%; margin: 0 auto;">
            <img :src="item" style="width: 100%"/>
          </div>
        </TabPane>
        <TabPane label="评论" name="tradeComment">
          <div class="trade-comment-div">
            <Row>
              <i-col>
                <i-input v-model="writeComment.content" :rows="4" type="textarea" placeholder="评论一下吧！"></i-input>
              </i-col>
            </Row>
            <br>
            <Row>
              <i-col span="6" offset="20">
                <Checkbox v-model="writeComment.anonymous">匿名发布</Checkbox>
                <Button type="primary" @click="submitComment">提交</Button>
              </i-col>
            </Row>
            <div style="border-top: 1px solid #88888847; margin-top: 20px; padding-top: 20px;">
              <ul>
                <li v-for="(item, index) in tradeComment">
                  <div style="margin-top: 10px">
                    <Row>
                      <i-col span="3">
                        <Avatar
                          size="large"
                          style=" margin: 20px 0 10px 40px;"
                          :src=item.headUrl>
                        </Avatar>
                      </i-col>
                      <i-col span="3" style="margin-top: 35px;">
                        <p>{{ item.nickname }}</p>
                      </i-col>
                      <i-col span="4" style="margin-top: 35px;">
                        <p>{{ item.createdDate }}</p>
                      </i-col>
                    </Row>
                    <Row>
                      <i-col span="20" offset="3" >
                        <p style="padding-bottom: 20px; border-bottom: 1px solid rgba(136, 136, 136, 0.28)">{{ item.content }}</p>
                      </i-col>
                    </Row>
                    <Row>
                      <i-col span="20" offset="3" style="margin-top:10px">
                        <Button v-if="item.isLike" type="primary" shape="circle" size="small" @click="likeComment($event,index,item.id)">赞</Button>
                        <Button v-if="!item.isLike" shape="circle" size="small" @click="likeComment($event,index,item.id)">赞</Button>
                        <Button v-if="item.isDisLike" type="primary" shape="circle" size="small" @click="dislikeComment($event,index,item.id)">踩</Button>
                        <Button v-if="!item.isDisLike" shape="circle" size="small" @click="dislikeComment($event,index,item.id)">踩</Button>
                      </i-col>
                    </Row>
                    <p></p>
                  </div>
                </li>
                <div v-if="!commentNoMore" style="margin-top: 20px;">
                  <Row>
                    <i-col span="2" offset="11">
                      <Button type="primary" @click="getTradeComment">加载更多</Button>
                    </i-col>
                  </Row>
                </div>
                <div v-if="commentNoMore" style="margin-top: 20px;">
                  <p style="text-align: center;">没有更多消息了~~~</p>
                </div>
              </ul>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios"
import qs from 'qs';

export default {
  components: {

  },
  data () {
    return {
      tradeInfo: {
        images:[]
      },
      tradeId: '',
      tradeComment: [],
      commentOffset: 1,
      writeComment: {
        content: '',
        anonymous: false,
      },
      confirmIfOne: {
        announcer: '',
        visitor: ''
      },
      isLogin: false,
      isComfirmed: false,
      userInfo: {
        userName: '',
        userId: '',
      },
      commentNoMore: false,
    }
  },
  methods: {
    getTradeComment () {
      axios.post('/trade/comment/list',
        qs.stringify({
          tradeId: this.tradeId,
          offset: this.commentOffset,
          limit: 10,
        })
      )
        .then((res) => {
          console.log("res" + this.commentOffset);
          console.log(res);
          let len = res.data.commentList.length;
          for(let i=0; i<len; i++){
            this.tradeComment.push(res.data.commentList[i]);
          }
          this.commentNoMore = res.data.noMore;
          this.commentOffset++;
          //alert(this.commentOffset);
        })
    },

    submitComment () {
      if(this.writeComment.content === '') {
        this.$Message.error("内容不能为空");
        return;
      }
      let anonymous = this.writeComment.anonymous ? 1 : 0;
      axios.post('/add/trade/comment',
        qs.stringify({
          content: this.writeComment.content,
          tradeId: this.tradeId,
          anonymous: anonymous,
        })
      )
        .then((res) => {
          if(res.data.msg === 'ok') {
            this.commentOffset = 1;
            this.tradeComment = [];
            this.getTradeComment();
          }
        })

    },

    getUserInfo () {
      let self = this;
      axios.get('/getUserInfo')
        .then((res) => {
          console.log("getUserInfo:");
          console.log(res);
          this.confirmIfOne.visitor = res.data.username;
          if(res.data.msg === 'ok'){
            this.userInfo.userName = res.data.username;
            this.userInfo.userId = res.data.userId;
            self.isLogin = true;
          } else {
            self.isLogin = false;
          }
        })
    },

    confirmSold () {
      axios.post('/confirm/trade',
        qs.stringify({
          tradeId: this.tradeId,
        })
      )
        .then((res) => {
          if(res.data.msg == 'ok') {
            this.$Message.success('确认成功，该条信息将被删除！');
            this.isComfirmed = true;
          }
        })
    },

    likeComment (e, index, id) {
      axios.post('/like/comment',
        qs.stringify({
          commentId: id,
        })
      )
        .then((res) => {
          console.log("like");
          console.log(res);
          this.tradeComment[index].isLike = !this.tradeComment[index].isLike;
          if(this.tradeComment[index].isLike) {
            this.tradeComment[index].isDisLike = false;
          }
        })
    },

    dislikeComment (e, index, id) {
      axios.post('/dislike/comment',
        qs.stringify({
          commentId: id,
        })
      )
        .then((res) => {
          console.log("dislike");
          console.log(res);
          this.tradeComment[index].isDisLike = !this.tradeComment[index].isDisLike;
          if(this.tradeComment[index].isDisLike) {
            this.tradeComment[index].isLike = false;
          }
        })
    },
  },



  mounted () {
    this.getUserInfo();
    this.tradeId = this.$route.params.tradeId;
    axios.get('/get/trade/detail',{
      params: {
        tradeId: this.tradeId,
      }
    })
      .then((res) => {
        console.log("detail");
        console.log(res);
        this.confirmIfOne.announcer = res.data.nickname;
        this.tradeInfo = res.data;
        console.log(this.tradeInfo);
      });

    this.getTradeComment();

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

  .trade-detail {
    max-width: 1130px;
    margin: 10px auto;
    box-shadow: 0px 0px 15px #88888847;
    border-radius: 10px;
  }

  .trade-detail-img {
    padding: 10px;
    /*border: 1px solid gray;*/
  }

  .trade-detail-info {
    padding: 10px;
  }

  .trade-detail-info h2 {
    font-size: 20px;
    margin-bottom: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .trade-detail-info strong {
    font-weight: bold;
    line-height: 30px;
    font-size: 14px;
  }

  .trade-comment-div {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 20px;
    border-bottom: 1px solid #88888847;
  }
</style>

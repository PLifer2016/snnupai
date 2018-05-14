<template>
<div>
  <div class="love-wall-header">
    <div class="love-wall-header-bg">
      <div class="love-wall-title">
        <h1>表白气球</h1>
      </div>
      <div class="love-wall-edit">
        <button type="button" class="btn" @click="writeLoveInfoClick">放一个表白气球</button>
      </div>
    </div>
  </div>

  <div class="love-wall-content" ref="list">
    <ul>
      <li class="love-wall-content-li" v-for="(item,index) in loveList" :key="item.loveId">
        <div class="li-content-header">
          <Row>
            <i-col span="2" >
              <Avatar
                size="large"
                style=" margin: 20px 0 10px 40px;"
                :src=item.headUrl>
              </Avatar>
            </i-col>
            <i-col span="6">
              <h2>{{ item.nickname }}</h2>
            </i-col>
          </Row>
        </div>
        <div class="li-content-body">
          <Row>
            <i-col span="22" offset="1">
              <div>
              <p >{{ item.content }}</p>
              </div>
            </i-col>
          </Row>
        </div>
        <div class="li-content-footer">
          <Row type="flex" justify="start">

            <i-col span="10" offset="1">
              <span>{{ item.time }}</span>
              <i-button @click="showComment($event, item.loveId, index)">{{ item.commentNum }}条评论</i-button>
              <i-button v-if="! item.isFollow" @click='follow($event, item.loveId, index)'>关注</i-button>
              <i-button type="primary" v-if="item.isFollow" @click='follow($event, item.loveId, index)'>已关注</i-button>
              <i-button v-if="!item.isLike" @click='like($event, item.loveId, index)'>赞{{item.likeNum}}</i-button>
              <i-button type="primary" v-if="item.isLike" @click='like($event, item.loveId, index)'>已赞{{item.likeNum}}</i-button>
            </i-col>
          </Row>
        </div>
        <Row>
          <i-col span="24">
            <div class="love-wall-comment">
              <comment-input :params="commentParams" @submitComment="submitComment"></comment-input>
              <ul>
                <li v-for="c in item.commentListInfo.commentList">
                  <div>
                    <div class="love-wall-comment-header">
                      <Row>
                        <i-col span="2" >
                          <Avatar
                            style=" margin: 20px 0 10px 40px;"
                            :src=c.headUrl>

                          </Avatar>
                        </i-col>
                        <i-col span="6">
                          <span style="display: inline-block; margin-top: 30px">{{ c.nickname }}</span>
                        </i-col>
                        <i-col span="6">
                          <h2 style="margin-top: 30px">{{ c.createdDate }}</h2>
                        </i-col>
                      </Row>
                    </div>
                    <div class="love-wall-comment-body">
                      <Row>
                        <i-col span="22" offset="1  ">
                          <p>{{ c.content }}</p>
                        </i-col>
                      </Row>
                    </div>
                    <div class="love-wall-comment-footer">
                      <Row>
                        <i-col span="9" offset="1">
                          <i-button v-if="c.isLike" type="primary" size="small"
                                    @click="commentLike($event, c)">赞</i-button>
                          <i-button v-if="!c.isLike" size="small"
                                    @click="commentLike($event, c)">赞</i-button>
                          <i-button v-if="c.isDisLike" type="primary" size="small"
                                    @click="commentDisLike($event, c)">踩</i-button>
                          <i-button v-if="!c.isDisLike" size="small"
                                    @click="commentDisLike($event, c)">踩</i-button>
                        </i-col>
                      </Row>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="!item.commentListInfo.noMore" style="margin-top: 20px;">
                <Row>
                  <i-col span="2" offset="11">
                    <i-button type="primary" @click="loadMoreComment($event, item.loveId, item.commentListInfo.page, index)">加载更多</i-button>
                  </i-col>
                </Row>
              </div>
              <div v-if="item.commentListInfo.noMore" style="margin-top: 20px;margin-bottom: 10px;">
                <p style="text-align: center;">没有更多消息了~~~</p>
              </div>
            </div>
          </i-col>
        </Row>
      </li>
    </ul>
    <div v-if="loveInfoNoMore">
      <p style="text-align: center;">没有更多消息了~~~</p>
    </div>
  </div>

  <my-dialog :is-show="isShowWriteLoveInfo" @on-close="closeDialog('isShowWriteLoveInfo')">
    <love-wall-form @addLoveInfo="addLoveInfoToList"></love-wall-form>
  </my-dialog>

  <!--<my-replay-dialog :isReplayDialogShow="isShowWriteLoveInfoReplay" @on-close="closeDialog('isShowWriteLoveInfoReplay')">-->
    <!--<love-wall-replay-form :to-some-one="replayToSomeOne" :entity-id="loveId"  @loadComment="loadCommentList"></love-wall-replay-form>-->
  <!--</my-replay-dialog>-->

</div>
</template>

<script>
import Button from "bootstrap-vue/es/components/button/button";
import myDialog from "../components/base/dialog"
import myReplayDialog from "../components/base/replayDialog"
import LoveWallForm from "../components/loveWallForm"
import LoveWallReplayForm from "../components/loveWallReplayForm"
import CommentInput from "../components/base/commentInput"
import Pagination from "bootstrap-vue/src/components/pagination/pagination";
import axios from "axios"
import qs from 'qs';

export default {
  components: {
    Pagination,
    Button,
    myDialog,
    myReplayDialog,
    LoveWallForm,
    LoveWallReplayForm,
    CommentInput
  },
  data () {
    return {
      isShowWriteLoveInfo: false,
      page: 1,
      loveList: [],
      loveListLength: 0,
      replayToSomeOne: '',
      userInfo: {
        userName: '',
        userId: '',
      },
      isLogin: false,
      commentParams: {
        id: '',
        index: ''
      },
      loveInfoNoMore: false,
    }
  },
  methods: {
    closeDialog (attr) {
      this[attr] = false;
    },

    getUserInfo () {
      let self = this;
      axios.get('/api/getUserInfo')
        .then((res) => {
          // console.log("getUserInfo:");
          // console.log(res);
          if(res.data.msg === 'ok'){
            //console.log("发布一条表白信息前获取用户信息成功！");
            this.userInfo.userName = res.data.username;
            this.userInfo.userId = res.data.userId;
            self.isLogin = true;
            // alert(self.isLogin);
          } else {
            //console.log("发布一条表白信息前获取用户信息失败！");
            self.isLogin = false;
          }
        })
      //console.log("isLogin："+ self.isLogin);
    },

    writeLoveInfoClick () {
      this.getUserInfo ();
      if(this.isLogin) {
        this.isShowWriteLoveInfo = true;
      } else {
        this.$Message.error("请登录之后再发表");
        // this.$router.push('/login');
      }
    },


    //首次加载和下拉刷新获取数据
    getMoreLoveInfo () {
      if(this.page === 1){
        //获取10条表白信息，返回值：以截图
        axios.post("/api/loveWall/list",
          qs.stringify({
            offset: this.page,
            limit: 10
          })
        )
          .then((res) => {
            console.log("*********************************************");
            console.log(res);
            if(res.data.returnCode == '400'){
              this.$router.push('/404');
            }
            //插入一个page，为了加载更多评论时提供offset参数
            for(let i=0; i<res.data.loveInfos.length; i++) {
              res.data.loveInfos[i].commentListInfo.page = 1;
            }

            var moreLoveList = res.data.loveInfos;
            for(var i=0; i<moreLoveList.length; i++){
              this.loveList.push(moreLoveList[i]);
            }
            if(res.data.noMore == true) {
              this.loveInfoNoMore = true;
            }
          }, (error) => {
            console.log(error);
          });
        this.page++;
      }
      else {
        axios.post("/api/loveWall/list",
            qs.stringify({
            offset: this.page,
            limit: 10
          })
        )
          .then((res) => {
            if(res.data.noMore === true){
              this.loveInfoNoMore = true;
            } else {
              var moreLoveList = res.data.loveInfos;
              for(var i=0; i<moreLoveList.length; i++){
                this.loveList.push(moreLoveList[i]);
              }
            }
          }, (error) => {
            console.log(error);
          });
        this.page++;
      }
    },

    //提交后在列表里添加一条数据
    addLoveInfoToList () {
      this.closeDialog('isShowWriteLoveInfo');
      this.loveList = [];
      this.page = 1;
      this.getMoreLoveInfo();
    },

    follow (e,id,index) {
      this.getUserInfo ();
      if(!this.isLogin) {
        this.$Message.error("请登录之后再关注");
        return;
      }
      //对一条表白帖子关注，返回值：msg：ok or fail
      axios.post('/loveWallInfoFollow',
        qs.stringify({
          loveId: id,
        })
      )
        .then((res) => {
          //console.log("follow:" + res);
          this.loveList[index].isFollow = !this.loveList[index].isFollow;
        });
    },

    like(e,id,index){
      this.getUserInfo ();
      if(!this.isLogin) {
        this.$Message.error("请登录之后再点赞");
        return;
      }
      //对一条表白帖子点赞，返回值：msg：ok or fail
      axios.post('/loveWallInfoLike',
        qs.stringify({
          loveId: id,
        })
      )
        .then((res) => {
          if(res.data.msg === 'ok'){
            this.loveList[index].isLike = !this.loveList[index].isLike;
            if(this.loveList[index].isLike)
              this.loveList[index].likeNum++;
            else
              this.loveList[index].likeNum--;
          } else {
            alert("点赞失败");
          }

        })
    },

    commentLike(e, obj) {
      this.getUserInfo ();
      if(!this.isLogin) {
        this.$Message.error("请登录之后再点赞");
        return;
      }
      axios.post('/like/comment',
        qs.stringify({
          commentId: obj.id,
        })
      )
        .then((res) => {
          if(res.data.msg == 'ok'){
            //alert("lalal")
            obj.isLike = !obj.isLike
          }
        })
    },

    commentDisLike (e, obj) {
      this.getUserInfo ();
      if(!this.isLogin) {
        this.$Message.error("请登录之后再点赞");
        return;
      }
      axios.post('/dislike/comment',
        qs.stringify({
          commentId: obj.id,
        })
      )
        .then((res) => {
          if(res.data.msg == 'ok'){
            obj.isDisLike = !obj.isDisLike

          }
        })
    },

    showComment (e, id, index) {
        //axios

       var that = e.currentTarget;
       var commentShow = that.parentNode.parentNode.parentNode.parentNode.querySelector('.love-wall-comment');

        if(commentShow.className.indexOf('love-wall-comment-show') < 0) {
          commentShow.className = 'love-wall-comment-show love-wall-comment';
        } else {
          commentShow.className = 'love-wall-comment';
        }
        this.commentParams.id = id;
        this.commentParams.index = index;
    },

    submitComment (commentData) {
      this.getUserInfo ();
      if (this.isLogin){
        if(this.loveComment === ''){
          alert("内容不能为空！");
          return;
        }
        axios.post('/add/love/comment',
          qs.stringify({
            entityId: commentData.entityId,
            content: commentData.content,
            anonymous: commentData.anonymous,
          })
        )
          .then((res) => {
            //console.log(this.loveList[commentData.index].commentListInfo.commentList);
            this.loveList[commentData.index].commentListInfo.commentList = [];
            this.getCommentInfo(this.loveList[commentData.index].loveId,commentData.index);
          })
      } else {
        this.$Message.error("请登录之后再发表");
        //this.$router.push('/login');
      }
    },

    getCommentInfo (id, index) {
      axios.post('/love/comment/list',
        qs.stringify({
          loveId: id,
          offset: 1,
          limit: 10
        })
      )
        .then((res) => {
          this.loveList[index].commentListInfo.commentList = res.data.commentList;
        })
    },

    loadMoreComment(e, id, offset, index) {
      axios.post('/love/comment/list',
        qs.stringify({
          loveId: id,
          offset: offset+1,
          limit: 10
        })
      )
        .then((res) => {
          let temp = res.data.commentList;
          let tempNoMore = res.data.noMore;
          for(let i=0; i<temp.length; i++) {
            this.loveList[index].commentListInfo.commentList.push(temp[i]);
          }
          this.loveList[index].commentListInfo.noMore = tempNoMore;
          this.loveList[index].commentListInfo.page += 1;
        })
    }

  },

  mounted () {
    this.getUserInfo ();
    this.getMoreLoveInfo ();
    window.addEventListener('scroll', () => {
      if( document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight) {
        this.getMoreLoveInfo();
      }
    })
  },

}
</script>

<style>
  /*---snnupai-universal-header---*/

  .love-wall-header {
    max-width: 1130px;
    height: 210px;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #fff;
  }

  .love-wall-header .love-wall-header-bg {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: url("../assets/love-bg.jpg");
    box-shadow: 0px 0px 15px #88888847;
  }


  .love-wall-header .love-wall-header-bg .love-wall-title {
    padding-top: 5%;
  }

  .love-wall-header .love-wall-header-bg .love-wall-title h1 {
    text-align: left;
    padding-left: 30%;
    color: gray;
    font-size: 50px;
    letter-spacing: 10px;
    margin-top: 20px;
  }

  .love-wall-header .love-wall-header-bg .love-wall-edit button {
    float: right;
    margin: 20px;
    background-color: #fff;
    border: 1px dashed #f28c48;
    border-radius: 5px;
  }

  .love-wall-header .love-wall-header-bg .love-wall-edit button:hover {
    background-color: #f28c48;
    color: #fff;
  }

  .love-wall-content {
    max-width: 1130px;
    margin: 0 auto 20px;
  }

  .love-wall-content-li {
    padding: 0 0 20px 0;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 15px #88888847;
    margin-top: 20px;
    margin-bottom: 20px;
  }



  .love-wall-content-li .li-content-header h2 {
    font-size: 20px;
    margin-top: 30px;
  }

  .love-wall-content-li .li-content-body p {
    word-wrap: break-word;
    line-height: 20px;
    font-size: 16px;
  }
  .love-wall-content-li .li-content-footer {
    margin-top: 10px;
  }
  .love-wall-comment {
    margin-top: 10px;
    border: 1px solid #f6f6f6;
    display: none;
  }
  .love-wall-comment-show {
    display: block;
  }
  .love-wall-comment-body {
    line-height: 20px;
  }

  .love-wall-comment-footer {
    margin: 10px 0;
  }

  .love-wall-comment-header {
      border-top: 1px solid #f6f6f6;
  }
</style>

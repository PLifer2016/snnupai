import Mock from 'mockjs'

  Mock.mock(/announcement/,{
    announcement: '陕师派正在紧张地开发当中~~~'
  }),


  Mock.mock('/login',{
      username: 'PLifer'
  }),

  Mock.mock(/register/,{
    username: 'PLifer'
  }),

  Mock.mock('/love/add',{
    addLoveInfo:{
      'loveId': '@id'.toString(),
      avatarImage: '',
      'nickname': '@name',
      'content': '这是新的数据',
      time: '2012-10-5',
      'commentNum|0-20': 100,
      'isFollow|1': true,
      'isLike|1': true,
      'likeNum|0-20': 10,
      'commentList': [],
    }
  }),

    Mock.mock(/addLoveInfoReplay/,{
      addLoveInfo:{
        'loveId': '@id'.toString(),
        avatarImage: '',
        'nickname': '@name',
        'content': '这是新的数据',
        time: '2012-10-5',
        'commentNum|0-20': 100,
        'isFollow|1': true,
        'isLike|1': true,
        'likeNum|0-20': 10
      }
    }),

    Mock.mock(/love_list_ajax/,{
      "loveInfoList|10": [
        {
          'loveId': '@id'.toString(),
          avatarImage: '',
          'anonymous': true,
          'nickname': '@name',
          'content': '@paragraph(0,5)',
          time: '2012-10-5',
          'isFollow|1': true,
          'isLike|1': true,
          'likeNum|0-20': 10,
          'commentNum|0-20': 100,
          'commentList|10': [
            {
              'nickname': '@name',
              'anonymous': true,
              time: '2012-10-5',
              content: '我评论的！！！',
              entityId: '@id'.toString(),
              noMore: false,
            }
          ],
          noMore: false,
        }
      ]
    }),
    // Mock.mock(/love_list_ajax/,{
    //   "loveInfoList|10": [
    //     {
    //       'loveId': '@id'.toString(),
    //       avatarImage: '',
    //       'nickname': '@name',
    //       'content': '@paragraph(0,5)',
    //       time: '2012-10-5',
    //       'commentNum|0-20': 100,
    //       'isFollow|1': true,
    //       'isLike|1': true,
    //       'likeNum|0-20': 10
    //     }
    //   ]
    // }),

    Mock.mock(/getLoveCommentList/,{
      "loveCommentList|10": [
        {
          'entityId': '@id'.toString(),
          avatarImage: '',
          'nickname': '@name',
          'to|1': true,
          'toName': '@name',
          'content': '@paragraph(0,2)',
          time: '2012-10-5',
          'isLike|1': true,
          'likeNum|0-20': 10,
          'isUnLike|1': true,
          'unLikeNum|0-20': 10,
        }
      ]
    }),
    Mock.mock(/follow/,{
      status: 'ok'
    }),
    Mock.mock(/like/,{
      status: 'ok'
    })

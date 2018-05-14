<template>
<div>
  <Row>
    <i-col span="24">
      <Input v-model="loveInfo" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="勇敢地表白吧！"></Input>
      <p class="error-info" v-if=" error!=='' ">{{ error }}</p>
    </i-col>
  </Row>
  <br>
  <Row>

    <i-col  span="6" offset="18">
      <Checkbox v-model="isAnonymous">匿名提交</Checkbox>
      <Button type="primary" @click="submitLoveInfo">提交</Button>
    </i-col>
  </Row>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs';
export default {
  data () {
    return {
      loveInfo: '',
      isAnonymous: false,
      error: '',

    }
  },
  methods: {
    submitLoveInfo () {
      if(this.loveInfo === ''){
        this.error = '内容不能为空';
        return;
      }
      axios.post('/love/add',
        qs.stringify({
          content: this.loveInfo,
          anonymous: this.paramsIsAnonymous
        })
      )
        .then((res) => {
          if(res.data.msg === 'ok'){
            this.$emit('addLoveInfo');
          } else if (res.data.msg === 'fail') {
            this.$Message.error("提交失败");
          } else {
            console.log("表白信息提交出错：");
            console.log(res);
          }
        })
    }
  },
  computed: {
    paramsIsAnonymous: function () {
      return this.isAnonymous == true ? 1 : 0;
    }
  },
  watch: {
    loveInfo: function () {
      this.error = '';
    }
  }
}
</script>

<style>
  .error-info {
    color: red;
  }
</style>

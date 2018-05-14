<template>
<div>
  <div class="trade-form-content">
    <Form  label-position="right" :label-width="100">
      <FormItem label="标题">
        <i-input v-model="tradeInfo.title"></i-input>
      </FormItem>
      <FormItem label="标题">
        <input type="file" v-on:change="addImg($event)" multiple />
        <div v-for="img in pics" style="display:inline-block">
          <img :src="img" style="height: 100px; width: auto"/>
        </div>
      </FormItem >
      <FormItem label="价格">
        <i-input v-model="tradeInfo.price">
          <span slot="append">元</span>
        </i-input>
      </FormItem>
      <FormItem label="QQ">
        <i-input v-model="tradeInfo.QQ"></i-input>
      </FormItem>
      <FormItem label="微信号">
        <i-input v-model="tradeInfo.weixin"></i-input>
      </FormItem>
      <FormItem label="描述">
        <!--<i-input v-model="tradeInfo.describe"></i-input>-->
        <i-input v-model="tradeInfo.describe" type="textarea" :autosize="{minRows: 5,maxRows: 6}" placeholder="描述一下你的宝贝"></i-input>

      </FormItem>
      <FormItem label="校区">
        <Select v-model="tradeInfo.xiaoqu" style="width:200px">
          <Option value="0" label="长安校区">
            <span>长安校区</span>
          </Option>
          <Option value="1" label="雁塔校区">
            <span>雁塔校区</span>
          </Option>
        </Select>
      </FormItem>

    </Form>
    <Row>
      <i-col  span="4" offset="21">
        <Button type="primary" @click="submitTradeInfo">提交</Button>
      </i-col>
    </Row>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs';
export default {
  data () {
    return {
      tradeInfo: {
        title: '',
        price: '',
        QQ: '',
        weixin: '',
        describe: '',
        xiaoqu: '',
        files: ''
      },
      error: {
        title: '',
        price: '',
        QQ: '',
        weixin: '',
        describe: '',
        xiaoqu: ''
      },
      pics:[]
    }
  },
  methods: {
    addImg (event) {
      let self = this;
      let countFiles = event.target.files.length;
      this.tradeInfo.files = event.target.files;

      for(var i=0; i<countFiles; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        console.log(event.target.files[i]);
        reader.onload = function(e) {
          //console.log(e.target.result);
          //imgPath.url = e.target.result;
          self.pics.push(e.target.result);
          //console.log(self.pics);
        }
      }

    },

    submitTradeInfo () {
      console.log(this.tradeInfo);
      if(this.tradeInfo.title === '') {
        this.error.title = '标题不能为空';
      }
      if(this.tradeInfo.price === '') {
        this.error.price = '价格不能为空';
      }
      if(this.tradeInfo.QQ === '' && this.tradeInfo.weixin==='') {
        this.error.QQ = 'QQ和微信必须填一个';
      }
      if(this.tradeInfo.xiaoqu === '') {
        this.error.xiaoqu = '校区不能为空';
      }
      console.log("111:");
      console.log(this.tradeInfo.files);
      let formData = new FormData();
      formData.append('price',this.tradeInfo.price);
      formData.append('title',this.tradeInfo.title);
      formData.append('QQ',this.tradeInfo.QQ);
      formData.append('weixin',this.tradeInfo.weixin);
      formData.append('describe',this.tradeInfo.describe);
      formData.append('xiaoQu',this.tradeInfo.xiaoqu);
      for(var i=0; i<this.tradeInfo.files.length; i++){
        formData.append('pics',this.tradeInfo.files[i]);
      }

      console.log("formData:");
      console.log(formData.get('pics'));
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post('/add/trade',formData,config)
        .then((res) => {
          if(res.data.msg === 'ok') {
            this.$emit('addTradeInfo');
          }
        })


    }

  },
  computed: {

  },
  watch: {

  }
}
</script>

<style>
  .trade-form-content {
    width: 80%;
  }
</style>

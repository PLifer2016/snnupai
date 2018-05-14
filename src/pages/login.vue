<template>
  <div class="login-content">
    <div class="login-wrap">
      <h2>登录陕师派</h2>
      <h3>享受快捷美好的校园生活</h3>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" >
        <FormItem prop="user">
          <i-input type="text" v-model="formInline.user" placeholder="手机或者邮箱" size="large">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input type="password" v-model="formInline.password" placeholder="密码" size="large">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem>
          <Row>
            <i-col span="12" offset="15">
              <Checkbox v-model="rememberme">记住密码</Checkbox>
              <Button size="large" type="primary" @click="handleSubmit('formInline')" label-position="right">登录</Button>
            </i-col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        rememberme: '',
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '输入手机或者邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

      getUserInfo () {
        var self = this;
        axios.get('/getUserInfo')
          .then((res) => {
            console.log("getUserInfo:");
            console.log(res);
            if(res.data.msg === 'ok'){
              console.log("获取用户信息成功！");
              self.$emit("loginSuccess", res.data.username,res.data.userId);
            }
          })
      },

      handleSubmit(name) {
        var self = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('userstr',this.formInline.user);
            formData.append('password',this.formInline.password);
            formData.append('rememberme',this.rememberme);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            axios.post('/login',formData,config)
              .then((res) => {
                console.log("登录成功：");
                console.log(res);
                this.getUserInfo();
                self.$router.push('/');
                this.$Message.success('登录成功!');
              })

          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-content {
    height: 600px;
    width: 100%;
    margin: 0 auto;
    background: url("../assets/login-bg.jpg");
    background-size: 100%, 100%;
    overflow:hidden;
  }
  .login-content .login-wrap {
    width: 400px;
    height: 400px;
    margin: 80px auto;
    padding: 20px 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 20px 5px #00000052;
  }
  h2 {
    font-size: 30px;
    display: inline-block;
    margin: 20px 0 10px 0;
  }
  h3 {
    font-size: 20px;
    display: inline-block;
    margin: 15px 0 40px 0;
  }
</style>



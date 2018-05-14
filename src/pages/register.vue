<template>
  <div class="login-content">
    <div class="login-wrap">
      <h2>注册陕师派</h2>
      <h3>享受快捷美好的校园生活</h3>
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名" prop="username">
          <i-input type="text" v-model="formCustom.username"></i-input>
        </Form-item>
        <Form-item label="密码" prop="passwd">
          <i-input type="password" v-model="formCustom.passwd"></i-input>
        </Form-item>
        <Form-item label="确认密码" prop="passwdCheck">
          <i-input type="password" v-model="formCustom.passwdCheck"></i-input>
        </Form-item>
        <Form-item label="邮箱" prop="email">
          <i-input type="text" v-model="formCustom.email"></i-input>
        </Form-item>
        <Form-item label="手机" prop="phone">
          <i-input type="text" v-model="formCustom.phone"></i-input>
        </Form-item>
        <Form-item>
          <Row>
            <Col span="20" offset="7">
              <Checkbox v-model="formCustom.rememberme">记住密码</Checkbox>
              <i-button type="primary" @click="handleSubmit('formCustom')">提交</i-button>
              <i-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</i-button>
            </Col>
          </Row>
        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      const validateUsr = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
          callback();
      };

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };

      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        } else {
          callback();
        }
      };

      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          callback();
        }
      };



      return {
        formCustom: {
          username: '',
          passwd: '',
          passwdCheck: '',
          email: '',
          phone: '',
          rememberme: ''
        },
        ruleCustom: {
          username: [
            { validator: validateUsr, trigger: 'blur' }
          ],
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
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

      handleSubmit (name) {
        var self = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('username',this.formCustom.username);
            formData.append('password',this.formCustom.passwd);
            formData.append('rememberme',this.formCustom.rememberme);
            formData.append('email',this.formCustom.email);
            formData.append('phone',this.formCustom.phone);
            formData.append('confirmPassword',this.formCustom.passwdCheck);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };

            axios.post('/reg',formData,config)
              .then((res) => {
                if(res.data.msg === 'fail'){
                  this.$Message.error('注册失败!');
                  return;
                }
                if(res.data.msg != 'ok'){
                  this.$Message.error(res.data.msg);
                  return;
                }
                console.log("注册");
                console.log(res);
                this.getUserInfo();
                this.$Message.success('提交成功!');
                self.$router.push('/');
              })
              // .catch((error) => {
              //   console.log(error);
              // });

          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields();
      }

    }
  }
</script>

<style scoped>
  .login-content {
    height: 700px;
    width: 100%;
    margin: 0 auto;
    background: url("../assets/login-bg.jpg");
    background-size: 100%, 100%;
    overflow:hidden;
  }
  .login-content .login-wrap {
    width: 400px;
    margin: 80px auto;
    padding: 20px 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 20px 5px #00000052;
  }
  h2 {
    font-size: 30px;
    display: inline-block;
    margin-top: 20px;
    margin-left: 10px;
  }
  h3 {
    font-size: 20px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 10px;
  }
</style>

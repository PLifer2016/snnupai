<template>
  <div>
    <Row>
      <i-col offset="1" span="20">
        <i-input v-model="commentInput.content" placeholder="说说你对这条告白的想法吧！"  style="width: 500px; margin-top: 20px; float:left">
          <Select v-model="commentInput.anonymous" slot="append" style="width: 70px">
            <Option value="true">匿名</Option>
            <Option value="false">实名</Option>
          </Select>
        </i-input>
        <i-button type="primary" style="margin: 20px 10px; float: left;" @click="submitComment">提交</i-button>
      </i-col>
    </Row>
  </div>
</template>

<script>

export default {
  //components: {KeepAlive},
  props: {
    params: {
      id: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: ''
      }
    }
  },
  data () {
    return {
      commentInput: {
        content: '',
        anonymous: 'false'
      }
    }
  },
  methods: {
    submitComment () {
      if (this.commentInput.anonymous==='true'){
        this.commentInput.anonymous = '1';
      } else {
        this.commentInput.anonymous = '0';
      }
      let commentData = {
        entityId: this.params.id,
        index: this.params.index,
        content: this.commentInput.content,
        anonymous: this.commentInput.anonymous,
      }
      this.$emit('submitComment',commentData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

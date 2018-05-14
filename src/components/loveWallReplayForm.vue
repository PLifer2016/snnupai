<template>
<div>
  <Row>
    <i-col span="24">
      <p>To: {{ toSomeOne }}</p>
      <Input v-model="loveReplayInfo" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="看了这些是不是有些想说的？"></Input>
      <p class="error-info" v-if=" error!=='' ">{{ error }}</p>
    </i-col>
  </Row>
  <br>
  <Row>

    <i-col  span="8" offset="17">
      <Checkbox v-model="isAnonymous">匿名提交</Checkbox>
      <Button type="primary" @click="submitLoveReplayInfo">提交</Button>
    </i-col>
  </Row>
</div>
</template>

<script>
  import axios from 'axios'
export default {
  props: {
    toSomeOne: {
      type: String,
      default: 'defaultToSomeOne'
    },
    entityId: {
      type: String,
      default: 'defaultEntityId'
    },
  },
  data () {
    return {
      loveReplayInfo: '',
      isAnonymous: false,
      error: '',
    }
  },
  methods: {
    submitLoveReplayInfo () {
      if(this.loveReplayInfo === ''){
        this.error = '内容不能为空';
        return;
      }
      this.$emit('loadComment',this.entityId);
    }
  },
  computed: {
    paramsIsAnonymous: function () {
      return this.isAnonymous == true ? 1 : 0;
    }
  },
  watch: {
    loveReplayInfo: function () {
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

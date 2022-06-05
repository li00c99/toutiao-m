<template>
  <van-button
    v-if="isFollowed"
    :loading="loadding"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="loadding"
    size="small"
    icon="plus"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: '',
  components: {},
  model:{
    prop:'isFollowed', // 父组件采用v-model传值 默认是value 通过定义model来修改
    event:'update-is_followed' //默认是input 
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loadding: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      try {
        this.loadding = true
        if (this.isFollowed) {
          // 关注状态
          const { data } = await deleteFollow(this.userId)
          console.log('取消关注')
        } else {
          const { data } = await addFollow(this.userId)
          console.log('关注成功')
          // 未关注
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loadding = false
    }
  }
}
</script>

<style scoped lang="less">
</style>

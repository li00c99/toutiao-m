<template>
  <van-icon
    :class="{
    liked:value === 1
  }"
    :name="value === -1 ? 'good-job-o' : 'good-job'"
    @click="onLiked"
    :loading="loading"
  ></van-icon>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLiked() {
      console.log(this.value);
      
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {}
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  color: coral;
}
</style>

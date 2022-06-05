<template>
  <van-icon
    :class="{collected:value}"
    :name="value ? 'star' : 'star-o'"
    :loading="loading"
    @click="onCollect"
  ></van-icon>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
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
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 收藏 得取消收藏
          const { data } = await deleteCollect(this.articleId)
          console.log('取消收藏')
        } else {
          // 未收藏 得收藏
          const { data } = await addCollect(this.articleId)
          console.log('收藏成功')
        }
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        let message = '操作失败'
        this.toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  color: coral;
}
</style>

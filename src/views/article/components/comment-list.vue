<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :error="error"
    error-text="加载失败，请点击重试"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      @reply-click="$emit('reply-click',$event)"
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
    ></comment-item>
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: '',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    // 通过定义list default默认值如果父组件没有传递那么默认list传递则由父组件的数据
    list: {
      type: Array,
      default: () => [] //default默认值如果父组件没有传递那么默认list
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {
    // 打开页面就加载下拉事件
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        

        const { results } = data.data
        this.list.push(...results)
        // 将文章的总数量添加给父组件
        this.$emit('onload-success', data.data)
        this.loading = false

        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>

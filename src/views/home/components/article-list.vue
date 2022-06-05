<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="SuccessText"
      success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 组件 文章列表 -->
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
        <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: '',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: null,
      isLoading: false,
      SuccessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 发起请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 获取数据
        // 将数据追加到list中
        const { results } = data.data
        this.list.push(...results)
        // // 关闭加载loadding状态

        this.loading = false
        // // 判断是否还有数据，有将时间戳更新，没有则关闭finished

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {

      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.SuccessText = `刷新成功，没有数据了`
        }
        this.isLoading = false
        this.SuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.SuccessText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;

  // 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow-y: auto;
}
</style>

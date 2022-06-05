<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <!-- 文字区域 title -->
    <div slot="title" class="title">{{article.title}}</div>
    <!-- 底部区域 slot=label -->
    <div slot="label">
      <!-- 3张图片区域 -->
      <div class="cover-wrap" v-if="article.cover.type===3">
        <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image class="cover-item-img" fit="cover" :src="img"></van-image>
        </div>
      </div>
      <!-- 底部评论时间区域 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧单张图片区域 -->
    <van-image
      v-if="article.cover.type===1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    article: {
      type: Object,
      requiret: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 垂直布局
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 右侧布局
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 100%;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>

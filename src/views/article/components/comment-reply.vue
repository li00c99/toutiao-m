<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` :'暂无回复'">
      <van-icon  @click="$emit('close')" slot="left" name="cross"></van-icon>
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 评论列表组件 -->
      <comment-item :comment="comment"></comment-item>
      <!-- 回复 -->
      <van-cell title="全部回复" />
      <!-- 回复列表 -->
      <comment-list :list="commentlist" :source="comment.com_id" :type="'c'"></comment-list>
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" round @click="isPostShow = true">写评论</van-button>
    </div>
     <!-- 回复评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post @post-success="onPostSuccess" :target="comment.com_id"></comment-post>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import commentPost from './comment-post'

export default {
  name: '',
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentlist: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //
    onPostSuccess(data) {
      // 回复数量加1
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将数据追加到数组中
      this.commentlist.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #dd88dd;
  .write-btn {
    width: 60%;
  }
}
</style>

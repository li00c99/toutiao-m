<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" @click-left="$router.back()" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="lodding">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 内容区域 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 关注按钮 -->
          <!-- 封装的关注按钮组件 -->
          <!-- v-model="article.is_followed"   子组件接收需要用value接收-->
          <!-- @input 需要用@input事件来修改数据，这种方式就不必再将子组件方法传递给父组件修改数据 -->
          <follow-user v-model="article.is_followed" :user-id="article.aut_id" class="follow-btn"></follow-user>

          <!-- <van-button
            v-if="article.is_followed"
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
          >关注</van-button>-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论区域 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        ></comment-list>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- 收藏组件 -->
          <collect-article v-model="article.is_collected" :article-id="article.art_id"></collect-article>
          <!-- 点赞组件 -->
          <like-article class="btn-item" v-model="article.attitude" :article-id="article.art_id"></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>

        <!-- 发布评论弹层 -->
        <van-popup v-model="isPostShow"  position="bottom">
          <!-- 发布评论组件 -->
          <comment-post @post-success="onPostSuccess" :target="article.art_id"></comment-post>
        </van-popup>
      </div>

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
    </div>

    <!-- 评论回复弹层 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '100%' }">
      <comment-reply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow = false"></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commentList from './components/comment-list'
import commentPost from './components/comment-post'
import commentReply from './components/comment-reply'

export default {
  name: '',
  components: {
    followUser, //关注
    collectArticle, //收藏
    likeArticle, //点赞
    commentList, //评论
    commentPost,
    commentReply
  },
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: [],
      lodding: true,
      errStatus: 0,
      totalCommentCount: 0, //评论总数
      isPostShow: false, //控制发布评论
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      // 发起请求开启lodding
      this.lodding = true
      try {
        const { data } = await getArticleById(this.articleId)

        this.article = data.data

        // 图片预览组件需要异步调用
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status == 404) {
          this.errStatus = 404
        }
      }
      this.lodding = false
    },
    // 图片预览效果
    previewImage() {
      // 获取所有的dom
      const elment = this.$refs['article-content']

      // 拿到所有的img标签
      const imgs = elment.querySelectorAll('img')

      // 准备空数组
      const images = []

      imgs.forEach(img => {
        // 将所有的img.src追加到images中
        images.push(img.src)
        // 图片点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: 0
          })
        }
      })
    },
    // 子组件传递的评论发布
    onPostSuccess(data) {
      // 关闭弹层
      this.isPostShow = false
      // 将数据追加到评论列表组件 commenList是从子组件中得到的数据
      this.commentList.unshift(data.new_obj)

      this.totalCommentCount++
    },
    // 评论回复事件
    onReplyClick(comment) {
      console.log(comment)
      // 传递过来的评论数据赋值再传递
      this.currentComment = comment

      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .page-nav-bar {
    /deep/ .van-nav-bar__arrow {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        @click="onMyChannelClick(channel,index)"
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
      >
        <!-- 图标 -->
        <van-icon v-show="isEdit && !fiexdChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <!-- 文字 -->
        <span
          slot="text"
          :class="{active:index === active? 'active' : ''}"
          class="text"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        @click="onAddChannel(channel)"
        icon="plus"
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: '',
  components: {},
  props: {
    myChannels: {
      trpe: Object,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, //编辑状态
      fiexdChannels: [0]
    }
  },
  computed: {
    recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(mychannle => {
          return channel.id == mychannle.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    },
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 获取全部列表
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // 获取全部
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 点击全部频道添加到我的频道
    async onAddChannel(channel) {
      this.myChannels.push(channel)

      // 有tokten，那么发起网络请求添加频道更新
      // 数据持久化
      if (this.user) {
        try {
          const { data } = await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 没有登入则将频道数据存为本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击我的频道跳转或者删除
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        //  第0项固定频道不允许删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 编辑状态删除
        console.log(index)

        this.myChannels.splice(index, 1)
        // 当index比active小或等于的时候让active去减1
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.deleteChannel(channel.id)
      } else {
        // 非编辑则跳转
        this.$emit('update-active', index, false)
      }
    },
    // 删除方法
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
          this.$toast('删除成功')
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 42px;
    color: #333333;
    margin-top: 15px;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    margin-top: 20px;
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

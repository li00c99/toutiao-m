<template>
  <div class="updata-name">
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成"  @click-left="$emit('close')" @click-right="onConfirm" />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="locaName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      locaName: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const locaName = this.locaName
        if (locaName.trim().length == 0) {
          this.$toast('昵称不能为空')
          return
        }

        await updateUserProfile({
          name: locaName
        })
        this.$emit('input', locaName)
        this.$emit('close')
        this.$toast('修改成功')
      } catch (err) {
        this.$toast('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>

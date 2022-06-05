<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
  name: '',
  components: {},
  props: {
    value: {
      trpe: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast('修改成功')
      } catch (err) {
        this.$toast('修改失败')
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less">
</style>

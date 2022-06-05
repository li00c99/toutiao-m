<template>
  <div class="login_container">
    <van-nav-bar class="page-nav-bar" title="登入">
      <van-icon class="back" slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

    <!-- 登入表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="Number"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <!-- 左侧图标。作用域插槽的方式 -->
        <i slot="left-icon" class="toutiao- toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="Number"
        name="code"
        placeholder="请输入密码"
        :rules="userFormRules.code"
      >
        <!-- 左侧图标。作用域插槽的方式 -->
        <i slot="left-icon" class="toutiao- toutiao-yanzhengma"></i>
        <!-- 插入右侧按钮 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow == true"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            round
            size="small"
            type="dufault"
            class="send-sms-btn"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登入</van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
import { login, sendSms } from '@/api/user'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 获取数据
      // 验证数据
      // 必须写成this.$toast
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 发起请求
      try {
        const { data: res } = await login(this.user)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登入成功')
        this.$router.push('/')
      } catch (err) {
        console.log(err);
        
      }
      // 根据请求结构处理后续操作
    },
    // 发送验证码
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        console.log('验证失败', err)
      }
      // 通过后的操作
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁失败')
        }
        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  .toutiao- {
    font-size: 37px; //图标字体
  } //按钮样式
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: none;
  } //登入按钮样式
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .page-nav-bar{
    .back{
      color: #ffffff;
    }
  }
}
</style>

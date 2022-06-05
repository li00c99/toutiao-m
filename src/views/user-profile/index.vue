<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- /导航栏 -->
    <van-cell class="photo-cell" title="头像" is-link>
      <van-image class="avatar" fit="cover" @click="$refs.file.click()" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" @click="isUpdateNameShow = true" :value="user.name" is-link center></van-cell>
    <van-cell
      title="性别"
      @click="isUpdateGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      center
    ></van-cell>
    <van-cell title="生日" @click="isUpdateBirthdayShow = true" :value="user.birthday" is-link center></van-cell>

    <!-- 昵称弹层层 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" :style="{ height: '100%' }">
      <update-name v-if="isUpdateNameShow" v-model="user.name" @close="isUpdateNameShow = false"></update-name>
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      ></update-gender>
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></update-birthday>
    </van-popup>
    <!-- 图片弹层 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%;">
      <update-photo
        v-if="isUpdatePhotoShow"
        @update-photo="user.photo = $event"
        :img="img"
        @close="isUpdatePhotoShow = false"
      ></update-photo>
    </van-popup>
  </div>

  <!-- 编辑性别弹层 -->
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'

export default {
  name: '',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      img: null,
      isUpdatePhotoShow: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示弹层层
      this.isUpdatePhotoShow = true
      // 清空img
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>

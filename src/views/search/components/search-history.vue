<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteShow = true" name="delete"></van-icon>
    </van-cell>
    <van-cell
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item,index)"
      :title="item"
    >
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    searchHistories: {
      trpe: Object,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchItemClick(item, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 跳转状态搜索结果
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>

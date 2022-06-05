<template>
  <div class="search-contaniner">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></search-suggestion>
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @clear-search-histories="searchHistories = []"
    ></search-history>
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'

export default {
  name: '',
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      // 存放历史记录的数组
      searchHistories: JSON.parse(window.localStorage.getItem('TOUTIAO_SEARCH_HISTORIES')) || []
    }
  },
  computed: {},
  watch: {
    searchHistories(value) {
      window.localStorage.setItem('TOUTIAO_SEARCH_HISTORIES', JSON.stringify(value))
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 搜索事件
    onSearch(val) {
      // 联想建议的text 给 searchText赋值
      this.searchText = val
      // 打开搜索结果
      this.isResultShow = true
      // 不允许有重复的
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    // 取消事件
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-contaniner {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>

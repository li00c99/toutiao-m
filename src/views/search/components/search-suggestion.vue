<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index) in suggestions" :key="index" :title="text" @click="$emit('search',text)" icon="search"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载ladash插件 调用debounce 函数
import { debounce } from 'lodash'
export default {
  name: '',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // 防抖
    searchText: {
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
        console.log(123)
      }, 200),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('查询结果失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>

<template>
  <div>
    <div class="search-result-container">
        <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed>
        </van-nav-bar>
    </div>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false">
        <ArticleItme
        v-for="item in list"
        :key="item.id"
        :artObj="item"
        :isShow="false"
        @click.native="ArticleDetail(item.art_id)"
        >
        </ArticleItme>
    </van-list>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import ArticleItme from '@/components/ArticleItme'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1,
      list: [],
      finished: false,
      loading: false
    }
  },
  methods: {
    async onLoad () {
      const ref = await searchResultAPI({
        page: this.page,
        keyworde: this.$route.params.kw
      })
      this.list.push(...ref.data.data.results)
      this.page++
      this.loading = false
      if (ref.data.data.results.length === 0) {
        this.finished = true
      }
    },
    ArticleDetail (id) {
      this.$router.push({
        name: 'articledetail',
        query: {
          artId: id
        }
      })
    }
  },
  async created () {
    const ref = await searchResultAPI({
      page: this.page,
      keyworde: this.$route.params.kw
    })
    this.list = ref.data.data.results
    this.page++
    console.log(ref)
  },
  components: {
    ArticleItme
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
    padding-top: 46px;
}
</style>

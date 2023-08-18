<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中"
      @load="onLoad"
      :immediate-check = "false"
      >
      <ArticleItem
      v-for="item in list"
      :key="item.art_id"
      :artObj='item'
      @click="ArticleDetail(item.art_id)"
      ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItme'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: (new Date()).getTime(),
      newList: []
    }
  },
  methods: {
    ArticleDetail (id) {
      this.$router.push({
        name: 'articledetail',
        query: {
          artId: id
        }
      })
    },
    async onRefresh () {
      const ref = await getArticleAPI({
        channel_id: this.id,
        timestamp: (new Date()).getTime()
      })
      this.list = ref.data.data.results
      this.timestamp = ref.data.data.pre_timestamp
      this.isLoading = false
      // console.log(this.isLoading)
    },
    async onLoad () {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      const ref = await getArticleAPI({
        channel_id: this.id,
        timestamp: this.timestamp
      })
      this.newList = ref.data.data.results
      this.list.push(...this.newList)
      this.timestamp = ref.data.data.pre_timestamp
      this.loading = false
      if (ref.data.data.pre_timestamp === null) {
        this.finished = true
      }
    }
  },
  async created () {
    const ref = await getArticleAPI({
      channel_id: this.id,
      timestamp: this.timestamp
    })
    this.list = ref.data.data.results
    console.log(this.list)
    this.timestamp = ref.data.data.pre_timestamp
  },
  props: {
    id: Number
  }
}
</script>

<style>

</style>

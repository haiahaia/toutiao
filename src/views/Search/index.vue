<template>
  <div>
    <div class="search-header">
        <van-icon
        name="arrow-left"
        color="#fff"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
        />
        <van-search
        v-fofo
        class="search-input"
        @input="inputFn(value)"
        v-model="value"
        shape="round"
        background="#007bff"
        placeholder="请输入搜索关键词"
        @search="searchFn(value)"
        >
        </van-search>
    </div>
    <div v-if="value.length !== 0" class="sugg-list">
        <!-- <van-cell v-for="(item,index) in suggestList" :key="index" :title="lightFn(item,value)" /> -->
        <van-cell  v-for="(item,index) in suggestList" :key="index" >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span @click="suggestFn(item)" class="custom-title" v-html="lightFn(item,value)"></span>
          </template>
        </van-cell>
    </div>
    <div v-if="value.length === 0">
      <div class="history-header">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span>搜索历史</span>
        </template>
        <template #right-icon>
          <van-icon @click="clear" name="delete" />
        </template>
      </van-cell>
    </div>
    <div class="history-list">
      <span @click="historyFn(item)" class="history-items" v-for="(item,index) in history" :key="index">{{item}}</span>
    </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      timer: null,
      suggestList: [],
      history: JSON.parse(localStorage.getItem('his')) || []
    }
  },
  methods: {
    inputFn (value) {
      if (value.length === 0) {
        this.suggestList = []
        clearTimeout(this.timer)
      } else {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const ref = await suggestListAPI({
            keywords: value
          })
          this.suggestList = ref.data.data.options
        }, 300)
      }
    },
    lightFn (originStr, target) {
      if (!originStr) return
      return originStr.replaceAll(target, `<span style="color: red">${target}</span>`)
    },
    searchFn (value) {
      if (!value) return
      if (this.history.indexOf(value) === -1) {
        this.history.push(value)
      }
      localStorage.setItem('his', JSON.stringify(this.history))
      this.$router.push({
        name: 'searchresult',
        params: {
          kw: value
        }
      })
    },
    suggestFn (value) {
      if (!value) return
      if (this.history.indexOf(value) === -1) {
        this.history.push(value)
      }
      localStorage.setItem('his', JSON.stringify(this.history))
      this.$router.push({
        name: 'searchresult',
        params: {
          kw: value
        }
      })
    },
    historyFn (value) {
      this.$router.push({
        name: 'searchresult',
        params: {
          kw: value
        }
      })
    },
    clear () {
      this.history = []
    }
  }
}
</script>

<style lang="less" scoped>
.search-header{
    height: 46px;
    display: flex;
    align-items: center;
    background-color: #007bff;
    overflow: hidden;
    .goback{
        margin-left: 5px;
    }
    .search-input{
        flex-grow: 1
    }
}
.history-list {
  padding: 0 10px;
  .history-items {
    display: inline-block;
    background-color: #efefef;
    font-size: 12px;
    padding: 8px 14px;
    margin: 10px 3px 0px 8px;
    border-radius: 10px;
  }
}

</style>

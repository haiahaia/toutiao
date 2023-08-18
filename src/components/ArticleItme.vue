<template>
  <div>
    <van-cell @click="addevent">
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
        <div class="title-box thumb-box">
            <!-- 标题 -->
            <span> {{artObj.title}} </span>
            <!-- 单图 -->
            <img v-if='artObj.cover.type === 1' class="thumb" :src="artObj.cover.images[0]" alt="">
        </div>
        <!-- 多图 -->
        <div>
            <div class="thumb-box" v-if='artObj.cover.type > 1'>
                <img
                class="thumb"
                v-for='(imgURL,index) in artObj.cover.images'
                :key='index'
                :src="imgURL">

            </div>
        </div>
    </template>
    <template #label>
        <div class="bottom">
          <div>
          <span> {{artObj.aut_name}} </span>
          <span> {{artObj.comm_count}}评论 </span>
          <span> {{formatTime(artObj.pubdate)}}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon v-if="isShow" @click.stop="show = true" name="cross" size="0.2rem"/>
        </div>
    </template>
    </van-cell>
    <van-action-sheet
    v-model="show"
    :actions="actions"
    @select="onSelect"
    get-container="body"
    cancel-text="取消"
    close-on-click-action />
    <van-action-sheet
    v-model="show_1"
    :actions="actions_1"
    @select="onSelect_1"
    get-container="body"
    cancel-text="返回"
    @cancel="onCancel"
    close-on-click-action />
  </div>
</template>

<script>
// import { getToken } from '@/utils/token'
import { Notify } from 'vant'
import { timeAgo } from '@/utils/date.js'
import { dislikeArticleAPI, reportsArticleAPI } from '@/api'
export default {
  name: 'ArticleItem',
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      show_1: false,
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }],
      actions_1: [{ name: '其他问题' }, { name: '标题夸张' }, { name: '低俗色情' }, { name: '错别字多' }, { name: '旧闻重复' }, { name: '内容不实' }, { name: '侵权' }, { name: '广告' }, { name: '涉嫌违法犯罪' }]
    }
  },
  methods: {
    addevent () {
      this.$emit('click')
    },
    formatTime: timeAgo,
    async onSelect (item) {
      this.show = false
      // console.log(item)
      if (item.name === '反馈垃圾内容') {
        this.show_1 = true
        // this.actions = this.actions_1
      } else {
        try {
          await dislikeArticleAPI({
            artID: this.artObj.art_id
          })
          Notify({ type: 'success', message: '反馈成功' })
        } catch (err) {
          // console.log('失败了')
          // console.log(getToken)
          Notify({ type: 'danger', message: '请登录账号' })
        }
      }
    },
    async onSelect_1 (item) {
      this.show_1 = false
      await reportsArticleAPI({
        artID: this.artObj.art_id,
        artType: item.name,
        artOther: '没有描述'
      })
      Notify({ type: 'success', message: '反馈成功' })
    },
    onCancel () {
      this.show = true
    }
  },
  mounted () {
    // console.log(this.artObj)
  }
}
</script>

<style scoped>
.custom-title {
        margin-right: 4px;
        vertical-align: middle;
    }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
  .thumb {
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }
  .thumb-box {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
    <div>
      <van-nav-bar fixed>
        <template #right>
          <van-icon name="search" size="0.48rem" color='#fff' @click="search"/>
        </template>
      </van-nav-bar>
    <div class="main">
      <van-tabs  v-model="active" sticky animated offset-top = '1.226667rem'>
        <van-tab v-for="item in userChannelList" :key='item.id' :title="item.name" :name='item.id'>
          <ArticleList :id='item.id'></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="0.373333rem" class="moreChannels" @click="showPopup"/>
    </div>
    <van-popup
    v-model="show" position="right" :style="{ height: '100%',width: '100%' }"  closeable @click-close-icon="closePopup">
    <ChannelEdit/>
    </van-popup>
    </div>
</template>

<script>
import { getUserChannelAPI } from '@/api'
import ArticleList from './components/ArticleList'
import ChannelEdit from './ChannelEdit'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      userChannelList: [],
      articleList: [],
      show: false
    }
  },
  methods: {
    changeChannel () {},
    showPopup () {
      this.show = true
    },
    async closePopup () {
      this.$store.commit('CHANGDEEDTE')
      const ref = await getUserChannelAPI()
      this.userChannelList = ref.data.data.channels
    },
    search () {
      this.$router.push({ name: 'search' })
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  async created () {
    const ref = await getUserChannelAPI()
    this.userChannelList = ref.data.data.channels
  }
}
</script>

<style scoped lang='less'>
.main{
  // position: relative;
  padding-top: 46px;
  padding-bottom: 40px ;
  .moreChannels{
    position: fixed;
    top: 62px;
    right: 8px;
    z-index: 999;
  }
}
/deep/ .van-tabs__wrap {
  padding-right: 25px;
  background-color: #fff;
}
</style>

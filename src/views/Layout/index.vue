<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" @change="changeNav">
            <!-- change携带的参数用于表示点击的元素防止出现反复跳转同一个路由 -->
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  },
  created () {
    if (this.$route.name === 'user') {
      this.active = 1
    }
    console.log(this.active)
  },
  methods: {
    changeNav () {
      if (this.active === 1) {
        this.$router.push({ name: 'user' })
      } else if (this.active === 0) {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style>

</style>

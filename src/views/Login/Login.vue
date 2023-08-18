<template>
<div>
  <van-nav-bar title="黑马头条-登录" />
  <van-form @submit="onSubmit">
    <van-field
      required
      v-model="user.mobile"
      name="mobail"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请填11位手机号', pattern: /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/}]"
    />
    <van-field
      required
      v-model="user.code"
      type="password"
      name="code"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码'}]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" :loading='isload' loading-text="加载中..."
        >登录</van-button
      >
    </div>
  </van-form>
</div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  name: 'Login',
  data () {
    return {
      isload: false,
      user: {
        mobile: '', // 手机号
        code: '' // 验证码(本项目不使用验证码，本项使用密码：246810)
      }
    }
  },
  methods: {
    async onSubmit (values) {
      // 把按钮的状态变为加载状态
      this.isload = true
      try {
        const ref = await loginAPI(this.user)
        console.log(ref)
        setToken(ref.data.data.token)
        Notify({ type: 'success', message: '登陆成功' })
        this.$router.replace('layout')
      } catch (err) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      // console.log('submit', values)
      // console.log('submit', this.user)
      // 当请求完成不管成功与否把按钮状态调为非加载
      this.isload = false
    }
  }
}
</script>

<style lang='less' scoped>
</style>

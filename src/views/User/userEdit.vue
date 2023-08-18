<template>
    <div class="user-edit-container">
      <!-- Header 区域 -->
      <van-nav-bar
        title="编辑资料"
        @click-left="$router.back()"
        left-arrow
        fixed
      />

      <!-- 用户资料 -->
      <van-cell-group class="action-card">
        <van-cell title="头像" is-link center>
          <template #default>
            <van-image
              round
              class="avatar"
              :src="userData.photo"
              @click="imageClickFn"
            />
            <!-- file 选择框 -->
            <input
              v-fofo
              type="file"
              ref="iptFile"
              v-show="false"
              accept="image/*"
              @change="onFileChange"
            />
          </template>
        </van-cell>
        <!-- 姓名部分 -->
        <van-cell
          title="名称"
          is-link
          :value="userData.name"
          @click = 'changeNameFn'
        />
        <van-cell
          @click="birthdanSetFn"
          title="生日"
          is-link
          :value="userData.birthday"
        />
      </van-cell-group>
      <!-- 修改用户名称的对话框 -->
      <van-dialog
        v-model="nameIsshow"
        title="修改名称"
        :before-close = 'beforeCloseFn'
        show-cancel-button
      >
        <!-- 输入框 -->
        <van-field
          input-align="center"
          v-model ="userName"
          maxlength="7"
          placeholder="请输入名称"
          v-fofo
        />
      </van-dialog>

      <!-- 修改时间 -->
      <van-popup
        v-model="dateShow"
        position="bottom"
        style="height: 50%"
        round
      >
        <!-- 日期选择控件 -->
        <van-datetime-picker
          v-model="currentDate"
          @confirm="changeBirthdayFn"
          @cancel="cancelChangeFn"
          type="date"
          title="选择出生日期"
          :min-date="minDate"
          :max-date="maxDate"
          :show-toolbar="true"
        />
      </van-popup>
    </div>
</template>

<script>
// import { Dialog } from 'vant'
import { userProfileAPI, updataUserPhotoAPA, editUSerInfoAPI } from '@/api'
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data () {
    return {
      userData: {},
      nameIsshow: false,
      userName: '',
      minDate: new Date(1949, 9, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      dateShow: false
    }
  },
  async created () {
    const ref = await userProfileAPI()
    this.userData = ref.data.data
    console.log(this.currentDate)
  },
  methods: {
    async changeBirthdayFn (value) {
      console.log(value)
      const date = new Date(value)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const birthday = `${year}-${month}-${day}`
      const res = await editUSerInfoAPI({ birthday: birthday })
      this.userData.birthday = birthday
      this.currentDate = new Date(this.userData.birthday)
      console.log(res)
      this.dateShow = false
    },
    cancelChangeFn () {
      this.dateShow = false
    },
    birthdanSetFn () {
      this.currentDate = new Date(this.userData.birthday)
      console.log(this.currentDate)
      this.dateShow = true
    },
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      const theFd = new FormData()
      console.log(e.target.files)
      theFd.append('photo', e.target.files[0])
      const res = await updataUserPhotoAPA(theFd)
      console.log(res)
      this.userData.photo = res.data.data.photo
      this.$store.commit('SET_USERPHOTO', this.userData.photo)
    },
    imageClickFn () {
      this.$refs.iptFile.click()
    },
    changeNameFn () {
      console.log(1)
      this.nameIsshow = true
      console.log(this.nameIsshow)
    },
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        const reg = /^[\u4e00-\u9fa50-9]{1,7}$/
        if (reg.test(this.userName) === true) {
          const res = await editUSerInfoAPI({ name: this.userName })
          console.log(res)
          this.userData.name = this.userName
          done()
        } else {
          Notify({ type: 'warning', message: '用户名只能是1-7为中文或数字' })
          done(false)
        }
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
padding-top: 46px;
.avatar {
    width: 50px;
    height: 50px;
}
}
</style>

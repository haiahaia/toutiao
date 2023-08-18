import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEdit: false,
    userPhoto: 'https://tupian.qqw21.com/article/UploadPic/2020-4/20204823154758937.jpg'
  },
  getters: {
  },
  mutations: {
    CHANGDEEDTE () {
      // console.log(this)
      this.state.isEdit = false
    },
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})

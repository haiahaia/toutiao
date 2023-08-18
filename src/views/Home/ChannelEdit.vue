<template>
  <div>
    <div>
        <van-nav-bar title="频道管理" >
        </van-nav-bar>
    </div>
    <div>
        <div class="myChannels">
            <div class="box_1">
                <div>
                    <span class="title">我的频道</span>
                    <span class="small_title">点击{{ $store.state.isEdit ? '删除' : '进入'}}频道</span>
                </div>
                <span class="edit" @click="editFn">{{ $store.state.isEdit ? '完成': '编辑' }}</span>
            </div>
            <div class="channels">
                <van-row type="flex">
                    <van-badge v-for="item in myChannelsList" :key="item.id">
                    <div class="channel" @click="deleteChannels(item)">{{item.name}}</div>
                    <template #content >
                        <van-icon v-show="$store.state.isEdit && item.id !== 0" name="cross"  color="#bcb4bc" class="badge-icon" size="0.3rem"/>
                    </template>
                    </van-badge>
                </van-row>
            </div>
        </div>
        <div class="addChannels">
            <div class="box_1">
                <div class="title">点击添加更多:</div>
            </div>
            <div class="channels">
                <van-row type="flex">
                    <van-badge v-for="item in otherChannelsList" :key="item.id">
                    <div class="channel"  @click="addChannels(item)">{{item.name}}</div>
                    </van-badge>
                </van-row>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getUserChannelAPI, getAllChannelsAPI, updataChannelsAPI } from '@/api'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannelsList: [],
      myChannelsList: [],
      isEdit: false
    }
  },
  async mounted () {
    const ref = await getUserChannelAPI()
    this.myChannelsList = ref.data.data.channels
    const ref_1 = await getAllChannelsAPI()
    this.allChannelsList = ref_1.data.data.channels
    console.log(this.$store)
  },
  computed: {
    otherChannelsList () {
      return this.allChannelsList.filter((item) => {
        return this.list.indexOf(item.name) === -1
      })
    },
    list () {
      return this.myChannelsList.map((item) => {
        return item.name
      })
    }
  },
  methods: {
    addChannels (item) {
      if (this.$store.state.isEdit) {
        this.myChannelsList.push(item)
        // console.log(this.myChannelsList)
        const channels = this.myChannelsList
        updataChannelsAPI({ channels })
      }
    },
    deleteChannels (item) {
      if (this.$store.state.isEdit && item.id !== 0) {
        console.log(item)
        const index = this.myChannelsList.indexOf(item)
        this.myChannelsList.splice(index, 1)
        console.log(this.myChannelsList)
        const channels = this.myChannelsList
        updataChannelsAPI({ channels })
      }
    },
    editFn () {
      console.log(this.$store)
      this.$store.state.isEdit = !this.$store.state.isEdit
    }
  }
}
</script>

<style lang="less" scoped>
  .box_1{
    display: flex;
    justify-content: space-between;
    .title{
        font-size: 16px;
        margin: 0 5px;
    }
    .small_title {
        font-size: 8px;
        color: #bcb4bc;
    }
    .edit {
        margin-right: 5px;
        font-size: 18px;
    }
  }
  .channels{
        padding-left: 5px;
        .channel{
            border: 1px solid #bcb4bc;
            height: 30px;
            width: 22vw;
            border-radius: 5px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            margin: 3px 1vw;
            background-color: #f6f0f6;
        }
    }
    /deep/.van-badge__wrapper{
        position: relative;
        .badge-icon{
            position:absolute;
            top: 3px;
            right: 14px;
        }
    }
</style>

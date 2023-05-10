import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // article publish这2个路由都需要用到 哪里调用这个函数呢？
  // 答案是：共同的父路由 = layout
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }
}

export default ChannelStore
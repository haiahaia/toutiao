// 统一封装接口方法
// 每个方法负责请求一个url地址
import axios from '../utils/request'
// import { getToken } from '@/utils/token'

// 获取所有频道
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 获取用户频道
export const getUserChannelAPI = () => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'GET'
    // 在请求拦截器中给所有请求统一加上了headers对象所以在此可以省略
    // headers: {
    //   Authorization: `Bearer ${getToken}`
    // }
  })
}

// 更新覆盖频道
export const updataChannelsAPI = ({ channels }) => axios({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 获取推荐文章
export const getArticleAPI = ({ channel_id, timestamp }) => {
  // console.log(getToken)
  return axios({
    url: '/v1_0/articles',
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${getToken}`
    // },
    params: {
      channel_id,
      timestamp
    }
  })
}

// 获取登录数据
export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 获取不喜欢文章数据
export const dislikeArticleAPI = ({ artID }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  // headers: {
  //   Authorization: `Bearer ${getToken}`
  // },
  data: {
    target: artID
  }
})

// 获取举报文章数据
export const reportsArticleAPI = ({ artID, artType, artOther }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  // headers: {
  //   Authorization: `Bearer ${getToken}`
  // },
  data: {
    target: artID,
    type: artType,
    remark: artOther
  }
})

// 获取文章详情
export const ArticleDetailAPI = ({ artId }) => axios({
  // 方法一
  url: `/v1_0/articles/${artId}`,
  method: 'GET'

  // 方法二(此方法不可用可能是我写错)
  // url: '/v1_0/articles/:artId',
  // method: 'GET',
  // params: {
  //   artId: artId
  // }
})

// 搜索的联想菜单
export const suggestListAPI = ({ keywords }) => {
  // console.log(keywords)
  return axios({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keywords
    }
  })
}

// 搜索结果
export const searchResultAPI = ({ page = 1, pre_page = 10, keyworde }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    q: keyworde,
    page,
    pre_page
  }
})

// 关注用户
export const followingsAPI = ({ userId }) => axios({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})

// 取消关注用户
export const unfollowingsAPI = ({ userId }) => axios({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
})

// 获取用户个人资料
export const userProfileAPI = () => axios({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 获取用户个人信息
export const grtUserInfo = () => axios({
  url: '/v1_0/user',
  method: 'GET'
})

// 对文章点赞
export const likeArticleAPI = ({ artId }) => axios({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 取消文章的点赞
export const removeLikeArticleAPI = ({ artId }) => axios({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})

// 回复评论
export const commentSendAPI = ({ commentContent, artId = null, commentId }) => {
  const obj = {
    target: commentId,
    content: commentContent
  }
  if (artId === null) {
    return axios({
      url: '/v1_0/comments',
      method: 'POST',
      data: obj
    })
  } else {
    obj.art_id = artId
    return axios({
      url: '/v1_0/comments',
      method: 'POST',
      data: obj
    })
  }
}

// 取消评论
export const commentDisLikingAPI = ({ commentId }) => axios({
  url: `/v1_0/comment/likings/${commentId}`,
  method: 'DELETE'
})

// 评论点赞
export const commentLikingAPI = ({ commentId }) => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: commentId
  }
})

// 对文章评论
export const commentsListAPI = ({ type = 'a', commentId, offset = null, limit = 10 }) => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type,
    source: commentId,
    offset,
    limit
  }
})

// 更新用户头像
export const updataUserPhotoAPA = (fd) => axios({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd
})

// 编辑用户信息
export const editUSerInfoAPI = (obj) => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}

import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: ` /app/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 获取用户个人资料
export const getUserProfile = target=>{
  return request({
    method:'GET',
    url:'/v1_0/user/profile'
  })
}
// 编辑用户昵称
export const updateUserProfile = data =>{
  return request({
    method:'PATCH',
    url:'/v1_0/user/profile',
    data
  })
}

// 头像
export const updateUserPhoto = data =>{
  return request({
    method:'PATCH',
    url:'/v1_0/user/photo',
    data
  })
}
import * as user from './action-type'

export const actions = {
  // 保存用户消息
  saveUserInfo: function(userInfo) {
    return {
      type: user.SAVE_USERINFO,
      userInfo
    };
  },
  // 修改用户信息
  modifyUserInfo: function(key, value) {
    return {
      type: user.MODIFY_USERINFO,
      key,
      value
    };
  },
  // 修改属性信息
  saveAttrInfo: function(datatype, value) {
    return {
      type: user.SAVE_ATTRINFO,
      datatype,
      value
    };
  },
  // 设置Fetch Flag
  setFetch: function(isFetching) {
    return {
      type: user.SET_FETCH,
      isFetching
    };
  },
}


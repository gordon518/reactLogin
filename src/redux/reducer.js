import * as user from './action-type'

let defaultState = {
  isFetching: false,  //If in the process of fetch
  addressList: [],   // addr list
  addressName: '',   // addr choosed
  temMessage: '',   // temporary message
  hasAddressList: [], // addr list already has 
  operate: 'edit',
  userInfo: {},
  geohash: []
}

// user message
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SET_FETCH:
      return {
        ...state, 
        isFetching: action.isFetching
      };
    case user.SAVE_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case user.SAVE_ATTRINFO:
      return {...state, ...{[action.datatype]: action.value}};
    case user.MODIFY_USERINFO:
      return {...state, userInfo: {...state.userInfo, [action.key]: action.value}};
    default:
      return state
  }
}

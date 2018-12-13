import { combineReducers } from 'redux'
// 引入常量模块
import {
  CONFIRM_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_FRIENDS,
  ERROR_FRIENDS,
  RECEIVE_CHAT_MSG,
  READ_MSG,
  RECEIVE_CHAT_LIST
} from './action-type'

// 初始化user的state
const initUser = {
  username: '',
  msg: '',
  applyFriends: [],
  Friends: [],
  redirectTo: ''//需要自动跳转的路由
}
// 处理user的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case CONFIRM_SUCCESS:
      // 如果客户没有更新信息，就到/update，更新了直接到main中的路由/message去
      const redirectTo = action.data.header ? '/message' : '/update'
      return { ...action.data, redirectTo }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return { ...initUser, msg: action.data }
    default:
      return state
  }
}
//处理friends的reducer
const initFriends = {}
function friends(state = initFriends, action) {
  switch (action.type) {
    case RECEIVE_FRIENDS:
      return action.data
    case ERROR_FRIENDS:
      return { msg: action.data }
    default:
      return state
  }
}

//处理chatmsg
const initChat = {
  chatMsgs: [],
  count: 0
}
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_CHAT_LIST:
      return {
        chatMsgs:action.data
      }
    case RECEIVE_CHAT_MSG:
      return {
        chatMsgs:[...state.chatMsgs,action.data]
      }
    case READ_MSG:
    const {count,myid,fdid} = action.data
    state.chatMsgs.forEach(msg=>{
      if(msg.myid===fdid && msg.fdid ===myid && !msg.read){
        msg.read = true
      }
    })
      return {
        chatMsgs:state.chatMsgs,
        count
      }
    default:
      return state
  }
}
export default combineReducers({
  user,
  friends,
  chat
})
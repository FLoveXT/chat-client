/**
 * 包含所有的同步，异步actions
 */
//引入socketio
import io from 'socket.io-client'
//  引入常量模块
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

// 引入api接口
import {
  reqLogin,
  reqRegister,
  reqUpdate,
  reqUser,
  reqFriends,
  reqApplys,
  applyConfirm,
  reqChatFds,
  reqReadChatMsg,
  reqChatMsgs
} from '../api'

/**
 * user同步action
 */
// 同步成功
const confirmSuccess = (user) => ({ type: CONFIRM_SUCCESS, data: user })
//同步错误消息
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//同步接收用户信息数据
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
//同步重置客户
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

/**
 * friends同步action
 */
const receiveFriends = (user) => ({ type: RECEIVE_FRIENDS, data: user })
//同步接收错误信息
const errorFriends = (msg) => ({ type: ERROR_FRIENDS, data: msg })
/**
 * chatmsg同步action
 */

//接收消息的同步action
const receiveChatMsg = (chatMsg) => ({ type: RECEIVE_CHAT_MSG, data: chatMsg })
//点击该用户，进入聊天界面后，修改消息为已读
const readMsg = (count,myid,fdid) => ({ type: READ_MSG, data:{count,myid,fdid} })
//接收个user有关的所有聊天的信息列表
const receiveChatList = (chatMsgs) => ({type:RECEIVE_CHAT_LIST,data:chatMsgs})

/**
 * 初始化客户端socketio
 */
function initIO(dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', (chatMsg) => {
      // console.log(chatMsg )
      if (chatMsg.myid === userid || chatMsg.fdid === userid) {
        dispatch(receiveChatMsg(chatMsg, chatMsg.fdid === userid))
      }
    })
  }
}


/**
 * 异步action
 */
//异步接收user的所有聊天信息
async function receiveMsgList (dispatch,userid) {
  initIO(dispatch, userid)
    const res = await reqChatMsgs()
    const result = res.data
    if(result.code === 0){
      dispatch(receiveChatList(result.data))
  }
}


// 异步发送消息
export const sendMsg = ({ myid, fdid, content }) => {
  return dispatch => {
    // console.log({ myid, fdid, content })
     io.socket.emit('sendMessage', { myid, fdid, content })
  }
}
//异步读取消息的异步action
export const readMsgs = (fdid,myid) => {
  return async dispatch => {
    const res = await reqReadChatMsg({fdid})
    const result = res.data
    if (result.code === 0) {
      const count = result.data
      dispatch(readMsg(count,myid,fdid))
    }
  }
}
// 异步注册
export function register({ username, password, password2, sex, }) {
  if (!username || !password || !password2 || !sex) {
    return errorMsg('请全部填写')
  }
  if (password !== password2) {
    return errorMsg('两次密码不一样')
  }
  return async dispatch => {
    const res = await reqRegister({ username, password, sex })
    const result = res.data
    // 成功
    if (result.code === 0) {
      receiveMsgList(dispatch,result.data._id)
      dispatch(confirmSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步登录
export function login({ username, password }) {
  if (!username || !password) {
    return errorMsg('请正确输入用户名和密码')
  }
  return async dispatch => {
    const res = await reqLogin({ username, password })
    const result = res.data
    
    //登录成功
    if (result.code === 0) {
      receiveMsgList(dispatch,result.data._id)
      dispatch(confirmSuccess(result.data))
    } else {
      //失败
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步完善
export function updateUser(user) {
  return async dispatch => {
    const res = await reqUpdate(user)
    const result = res.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

//异步获取用户
export function getUser() {
  return async dispatch => {
    const res = await reqUser()
    const result = res.data
    if (result.code === 0) {
      // getMsgs(dispatch,result.data._id)
      dispatch(receiveUser(result.data))
      receiveMsgList(dispatch,result.data._id)
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 异步获取查找用户信息
export function getFriends(username) {
  return async dispatch => {
    const res = await reqFriends(username)
    const result = res.data
    if (result.code === 0) {
      dispatch(receiveFriends(result.data))
    } else {
      dispatch(errorFriends(result.msg))
    }
  }
}

// 异步处理发过来的申请
export function updateApplys(user) {
  return async dispatch => {
    const res = await reqApplys(user)
    const result = res.data
    if (result.code === 0) {
      dispatch(errorMsg(result.msg))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步处理通过
export function confirmApplys(itemIndex) {
  return async dispatch => {
    const res = await applyConfirm(itemIndex)
    const result = res.data
    if (result.code === 0) {
      dispatch(errorMsg(result.msg))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

//异步处理点击发送
export function postChatFriends({ fdid, nickname, header }) {
  return async dispatch => {
    const res = await reqChatFds({ fdid, nickname, header })
    const result = res.data
    if (result.code === 0) {
      dispatch(errorMsg(result.msg))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}
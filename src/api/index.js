/**
 * n个接口请求函数的模块
 */

 import ajax from './ajax'

 //注册
 export const reqRegister = (user) => ajax('/register',user,'POST')

 //登录
 export const reqLogin = (user) => ajax('/login',user,'POST')
 
 //完善用户信息
 export const reqUpdate = (user) => ajax('/update',user,'POST')

 //请求用户数据
 export const reqUser = () => ajax('/user')

 //查找朋友数据
 export const reqFriends = (username) => ajax('/find',username,'POST')

 //获得来申请人组成的一个数组
 export const reqApplys = (user) => ajax('/apply',user,'POST')

 //点击通过朋友，
 export const applyConfirm = (itemIndex) => ajax('/applyconfirm',itemIndex,'POST')

 //点击发送，把对方互相添加到聊天朋友数组
 export const reqChatFds = (fd)=>ajax('/postchatfriend',fd,'POST')

 //获取当前用户的所有聊天记录
 export const reqChatMsgs = () => ajax('/chatmsg')

//点击进入和该用户的聊天界面时，指定该聊天信息为已读
export const reqReadChatMsg = (fdid) => ajax('/readchatmsg',fdid,'POST')
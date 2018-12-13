import React, { Component } from 'react'
import { List, SearchBar, Badge } from 'antd-mobile';
import { connect } from 'react-redux'
import moment from 'moment'
import { readMsgs } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item;
const Brief = Item.Brief;

/**
 * 组成一个新的数组，用来遍历朋友消息列表
 * @param {所有聊天的朋友} chatFds 
 * @param {*所有发给我的信息} chatMsgs 
 * @param {*我的userid} userid 
 */
function lastNewMsg(chatFds,chatMsgs,userid){
  const lastNewMsg = []
  chatFds.map(chatFd=>{
    //找出发fdid发给myid的所有消息
    const newChatMsgs = chatMsgs.filter(msg => { return msg.chat_id === (chatFd.fdid + '_' + userid) })
    const newChatMsg = newChatMsgs[newChatMsgs.length-1]//找出最新收到的消息
    lastNewMsg.push({chatFd,newChatMsg})
  })
  return lastNewMsg
}


class Message extends Component {

   //去聊天界面
   goToChat = (fdid)=>{
    this.props.history.push(`/chat/${fdid}`)
    const myid = this.props.user._id
    this.props.readMsgs(fdid,myid)
  }
  render() {
    const { chatFriends } = this.props.user
    const userid = this.props.user._id
    const { chatMsgs } = this.props.chat
    //调用函数，形成新的数组
    const lastNewMsgArr = lastNewMsg(chatFriends,chatMsgs,userid)
    
   
    return (
      <div className='message'>
        <SearchBar placeholder="Search" maxLength={8} />
        <List style={{paddingBottom:50}}>
        <QueueAnim delay={300} className="queue-simple">
          {
            lastNewMsgArr.map(cfd => {
              return (
                <Item key={cfd.chatFd.fdid}
                extra={cfd.newChatMsg?moment(cfd.newChatMsg.create_time).format('hh:mm:ss'):null} align="top"
                onClick={() => { this.goToChat(cfd.chatFd.fdid) }} 
                thumb={
                  cfd.newChatMsg&&cfd.newChatMsg.read===false? (<Badge dot>
                  <img src={require(`../../assets/images/header/${cfd.chatFd.header}.jpg`)} alt="header" />
                </Badge>):<img src={require(`../../assets/images/header/${cfd.chatFd.header}.jpg`)} alt="header" />} multipleLine>
                  {cfd.chatFd.nickname} <Brief>{cfd.newChatMsg?cfd.newChatMsg.content:null}</Brief>
                </Item>
              )
            })
          }
            </QueueAnim>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {readMsgs}
)(Message)
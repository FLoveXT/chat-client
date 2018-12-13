import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { postChatFriends, sendMsg, getUser,readMsgs } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
class Chat extends Component {

  state = {
    content: '',
    chatMsgs: []
  }
  componentDidMount() {
    //初始化列表到底部
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate() {
    //更新显示列表在底部
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount(){
    const fdid = this.props.match.params.id
    const myid = this.props.user._id
    this.props.readMsgs(fdid,myid)
  }
  handleSend = (_id, nickname, header) => {

    const myid = this.props.user._id
    const fdid = _id
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({ myid, fdid, content })
      this.setState({ content: '' })
    }
    if (JSON.stringify(this.props.user.chatFriends).indexOf(JSON.stringify({ fdid, nickname, header })) === -1) {
      //判断聊天朋友数据中没有该朋友，没有则添加
      this.props.postChatFriends({ fdid, nickname, header }).then(() => {
        this.props.getUser()
      })
    } else {
      console.log('已经有了')
    }
  }
  render() {
    const fdid = this.props.match.params.id
    const { Friends } = this.props.user
    const userid = this.props.user._id
    const myheader = this.props.user.header
    const friend = Friends.filter(fd => { return fd._id === fdid })//注意这里拿出来的是数组
    const { _id, nickname, header } = friend[0]
    const { chatMsgs } = this.props.chat
    const newChatMsgs = chatMsgs.filter(msg => { return msg.chat_id === (userid + '_' + fdid) || msg.chat_id === (fdid + '_' + userid) })
    
    if (!userid) {
      return null
    }
    return (
      <div className='chat-container'>
        <NavBar
          className='navbar'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >{nickname}</NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
        <QueueAnim delay={300} className="queue-simple">
          {
            newChatMsgs.map((msg, index) => {
              if (msg.chat_id === fdid + '_' + userid) {
                return (
                  <Item
                    key={index}
                    thumb={require(`../../assets/images/header/${header}.jpg`)}
                  >
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item
                    key={index}
                    className='my-chat'
                    thumb={require(`../../assets/images/header/${myheader}.jpg`)}
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
          </QueueAnim>
        </List>
        <div className='am-tab-bar-bar'>
          <InputItem
            placeholder='请输入'
            value={this.state.content}
            onChange={val => this.setState({ content: val })}

            extra={
              <span onClick={() => this.handleSend(_id, nickname, header)}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { postChatFriends, sendMsg, getUser,readMsgs }
)(Chat)
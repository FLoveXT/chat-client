import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { reqChatMsgs } from '../../api'
import PropTypes from 'prop-types'
const Item = List.Item
export default class ChatList extends Component {
  static propTypes = {
    fdid: PropTypes.string.isRequired,
    userid: PropTypes.string.isRequired,
    myheader: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    chatMsg: PropTypes.object.isRequired
  }
  state = {
    chatMsgs: []
  }

  componentDidMount() {
    const fdid = this.props.fdid
    if (fdid) {
      reqChatMsgs({ fdid }).then((data) => {
        this.setState({
          chatMsgs: data.data.data
        }, () => {
          console.log(this.state.chatMsgs)
        })
      })
    }
  }

  componentDidUpdate() {
    //更新显示列表在底部
    window.scrollTo(0, document.body.scrollHeight)
  }
  // componentWillReceiveProps(nextprops) {
  //   if (nextprops !== this.props) {
  //     if (Object.keys(nextprops.chatMsg).length !== 0) {
        
        
  //     }
  //   }
  // }
    // }
    render() {
      const fdid = this.props.fdid
      const userid = this.props.userid
      const myheader = this.props.myheader
      const header = this.props.header
      const initChatMsg = this.state.chatMsgs
      const chatMsg = this.props.chatMsg
      const newChatMsg = initChatMsg.push(chatMsg)
      return (
        <List style={{ marginTop: 50, marginBottom: 50 }}>

          {
            newChatMsg.map((msg, index) => {
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
        </List>
      )
    }
  }
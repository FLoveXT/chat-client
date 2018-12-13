import React, { Component } from 'react'
import { List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {

  logOut = () =>{
    Modal.alert('退出','确认退出登录',[
      {
        text:'取消'
      },
      {
        text:'确认',
        onPress:()=>{
          Cookies.remove('userid')
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const { username, nickname, company, job, sex,header } = this.props.user
    return (
      <div className='personal'>
        <List>
          <Item
            arrow="horizontal"
            thumb={require(`../../assets/images/header/${header}.jpg`)}
            multipleLine
          >
            {nickname} <Brief>用户名：{username}</Brief>
          </Item>
          <WhiteSpace />
          <Item extra={sex} arrow="horizontal" onClick={() => { }}>性别</Item>
          <Item extra={company} arrow="horizontal" onClick={() => { }}>公司</Item>
          <Item extra={job} arrow="horizontal" onClick={() => { }}>职位</Item>
        </List>
        <WhiteSpace />
        <Button type='warning' onClick={this.logOut}>退出登录</Button>
        <WhiteSpace />
        <Button type='primary' onClick={()=>{this.props.history.replace('/update')}}>设置</Button>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { resetUser }
)(Personal)
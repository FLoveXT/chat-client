import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'

// 组件
import User from '../user/user'
import Message from '../message/message'
import Friends from '../friends/friends'
import Discover from '../discover/discover'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import AddFriends from '../../containers/addfriends/addfriends'
import Chat from '../../containers/chat/chat'

import { getUser } from '../../redux/actions'
import { NavBar } from '../../../node_modules/antd-mobile';


class Main extends Component {

  //navfooter组件的属性
  navList = [
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'msg',
      text: '消息'
    },
    {
      path: '/friends',
      component: Friends,
      title: '通讯录',
      icon: 'friends',
      text: '通讯录'
    },
    {
      path: '/discover',
      component: Discover,
      title: '发现',
      icon: 'discover',
      text: '发现'
    },
    {
      path: '/personal',
      component: Personal,
      title: '我',
      icon: 'personal',
      text: '我'
    }
  ]
  componentDidMount() {
    const userid = Cookies.get('userid')
    const { user } = this.props
    if (userid && !user._id) {
      this.props.getUser()
    }
  }
  render() {
    //得到当前请求的path
    const pathname = this.props.location.pathname
    //如果浏览器中没有保存的userid，直接跳转到Login
    const userid = Cookies.get('userid')
    if (!userid) {
      return <Redirect to='/login' />
    }
    //如果有userid，则判断redux中有没有用户的数据
    const { user } = this.props

    if (!user._id) {
      //说明没有登录
      return <Redirect to='/login' />
    }

    //提醒有几个朋友申请
    const applyNum = this.props.user.applyFriends.length

    //得到当前的nav
    const currentNav = this.navList.find(nav => nav.path === pathname)
    return (
      <div>
        {currentNav ? <NavBar className="navbar">{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/update' component={User} />
          <Route path='/message' component={Message} />
          <Route path='/friends' component={Friends} />
          <Route path='/discover' component={Discover} />
          <Route path='/personal' component={Personal} />
          <Route path='/addfriends' component={AddFriends} />
          <Route path='/chat/:id' component={Chat} />
          <Route component={NotFound} />
        </Switch>
        {currentNav ? <NavFooter applyNum={applyNum} navList={this.navList} /> : null}
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)
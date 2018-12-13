import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    sex: 'man'
  }
  onHandleChange = (type, val) => {
    this.setState({ [type]: val })
    this.props.user.msg = null
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  register = () => {
    this.props.register(this.state)
  }
  render() {
    const { redirectTo, msg } = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo />
        <List>
        {msg ? <p className='error-msg demo-thead'>{msg}</p> : null}
          <InputItem
            placeholder="请输入用户名"
            onChange={val => this.onHandleChange('username', val)}
          >
            用户名：
        </InputItem>
          <InputItem
            type='password'
            placeholder='请输入密码'
            onChange={val => this.onHandleChange('password', val)}
          >
            密&nbsp;&nbsp;&nbsp;码：
        </InputItem>
          <InputItem
            type='password'
            placeholder='请再次输入密码'
            onChange={val => this.onHandleChange('password2', val)}
          >
            确认密码：
        </InputItem>
          <List.Item>
            <span style={{ marginRight: 20 }}>用户性别：</span>
            <Radio
              style={{ marginRight: 20 }}
              checked={this.state.sex === 'man'}
              onClick={() => this.onHandleChange('sex', 'man')}
            >男</Radio>
            <Radio
              checked={this.state.sex === 'women'}
              onClick={() => this.onHandleChange('sex', 'women')}
            >女</Radio>
          </List.Item>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={() => this.register()}>注册</Button><WhiteSpace />
          <Button onClick={() => this.toLogin()}>登录</Button><WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)
import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { NavBar, WhiteSpace, WingBlank, InputItem, List, Button } from 'antd-mobile'
import {login} from '../../redux/actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


 class Login extends Component {
  state = {
    'username':'',
    'password':''
  }
  onHandleChange = (type,val)=>{
    this.setState({[type]:val})
    this.props.user.msg = null
  }
  toRegister = () => {
    this.props.history.replace('/register')
  }
  login = () => {
    this.props.login(this.state)
  }
  render() {
    const {msg,redirectTo}= this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>用户登录</NavBar>
        <Logo />
        <List>
        {msg ? <p className='error-msg demo-thead'>{msg}</p> : null}
          <InputItem
            placeholder="请输入用户名"
            onChange={val => this.onHandleChange('username',val)}
          >
            用户名：
        </InputItem>
          <InputItem
            type='password'
            placeholder='请输入密码'
            onChange={val => this.onHandleChange('password',val)}
          >
            密&nbsp;&nbsp;&nbsp;码：
        </InputItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={()=>this.login()}>登录</Button><WhiteSpace />
          <Button onClick={()=>this.toRegister()}>注册</Button><WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {login}
)(Login)
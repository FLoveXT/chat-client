import React,{Component} from 'react'
import {Button,NavBar} from 'antd-mobile'


export default class NotFound extends Component{
  render(){
    return (
      <div className='not-found' >
      <NavBar type='primary'>发生错误</NavBar>
        <img src={require(`../../assets/images/notfound/notfound.png`)} alt="notfound"/>
        <Button type='primary' onClick={()=>this.props.history.replace('/message')}>返回首页</Button>
      </div>
    )
  }
}
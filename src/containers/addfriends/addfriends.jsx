import React, { Component } from 'react'
import { SearchBar, List, WhiteSpace, NavBar, Icon, Button,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { getFriends, updateApplys,getUser } from '../../redux/actions'

const Item = List.Item


class AddFriends extends Component {

  state = {
    username: '',
    rightContent:'添加'
  }
  onhandleChange = (val) => {
    this.setState({
      username:val
    },()=>{
      this.props.getFriends(this.state)
    })
  }
  add = (user,nickname,header, _id) => {

    //判断朋友里面有没有这个人，有的话就不执行，没有就执行
    if(JSON.stringify(this.props.user.Friends).indexOf(JSON.stringify({_id,nickname,header}))===-1){
      //判断聊天朋友数据中没有该朋友，没有则添加
      this.props.updateApplys(user).then(()=>{
        this.props.getUser()
      })
    }else{
      Toast.info('已经添加这个朋友 !!!', 1);
    }
  }
  componentWillUnmount(){
    this.props.getUser()
    this.props.friends.nickname = null
  }
  render() {
    const { nickname, header, msg, _id } = this.props.friends
    const user = this.props.user
    const friendID = { friendID: _id }
    const newuser = Object.assign(user, friendID)
    return (
      <div>
        {msg ? <div className='error-msg'>{msg}</div> : null}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { this.props.history.goBack() }}
        >NavBar</NavBar>
        <SearchBar placeholder="用户名" maxLength={20}
          onChange={val => this.onhandleChange(val)}
          
        />
        <WhiteSpace size="xl" />
        {nickname ? (<div>

          <List>
            <Item
              thumb={require(`../../assets/images/header/${header}.jpg`)}
              extra={<Button type="primary" size="small" inline onClick={() => { this.add(newuser,nickname, header, _id) }}>{this.state.rightContent}</Button>}
            >{nickname}</Item>
          </List>
        </div>) : null}
      </div>
    )
  }
}

export default connect(
  state => ({ friends: state.friends, user: state.user }),
  { getFriends, updateApplys,getUser }
)(AddFriends)
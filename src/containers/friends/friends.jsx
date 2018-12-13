import React, { Component } from 'react'
import { SearchBar, List, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { confirmApplys,getUser } from '../../redux/actions'


const Item = List.Item

class Friends extends Component {
 
  
  confirm = (obj)=>{
    this.props.confirmApplys(obj)
    this.props.getUser()
  }

  componentWillUnmount(){
    this.props.getUser()
  }
  
  render() {
    const { applyFriends, Friends } = this.props.user
    return (
      <div className='friends-container'>
        <SearchBar placeholder="Search" maxLength={8} />
        <WhiteSpace />
        <List>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { this.props.history.push('/addfriends') }}
          >新的朋友</Item>
        </List>
        <WhiteSpace />
        <List renderHeader={() => '等待确定添加的朋友'}>
          {
            applyFriends.map((user, index) => {
              return (
                <Item
                  key={index}
                  thumb={require(`../../assets/images/header/${user.header}.jpg`)}
                  extra={<Button type="primary" size="small" inline
                    onClick={() => { this.confirm({itemIndex:index,friendID:user._id}) }}>
                    通过</Button>}
                // this.props.confirmApplys({itemIndex:index})
                >{user.nickname}</Item>
              )
            })
          }
        </List>
        <WhiteSpace size="xl" />
        <List renderHeader={() => '你的朋友'}>
          {
            Friends.map((user, index) => {
              return (
                <Item
                  key = {index}
                  thumb={require(`../../assets/images/header/${user.header}.jpg`)}
                  arrow="horizontal"
                  onClick={() => { this.props.history.push(`/chat/${user._id}`) }}
                >{user.nickname}
          </Item>
              )
            })
          }

        </List>

      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { confirmApplys,getUser }
)(Friends)






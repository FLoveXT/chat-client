import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component{
  static propTypes = {
    navList:PropTypes.array.isRequired,
    applyNum:PropTypes.number.isRequired
  }
  render(){
    const {pathname} = this.props.location
    const navList = this.props.navList
    const applyNum = this.props.applyNum
    return (
      <TabBar>
        {
          navList.map((nav)=>(
            <Item
            icon={{ uri: require(`../../assets/images/navbar/${nav.icon}.png`)  }}
            selectedIcon={{ uri: require(`../../assets/images/navbar/${nav.icon}-selected.png`) }}
            title={nav.text}
            key={nav.path}
            badge={nav.path ==='/friends' ? applyNum : 0}
            selected={pathname === nav.path}
            onPress={() => {
              this.props.history.replace(nav.path)
            }}
          >
          </Item>
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)
import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'


export default class Header extends Component{
  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }
  state = {
    icon:null
  }
  constructor(props){
    super(props)
    this.headerList = []
    for(var i = 0; i<30; i++){
      const text = `header${i+1}`
      this.headerList.push({text,icon:require(`../../assets/images/header/${text}.jpg`)})
    }
  }
  selectHeader = ({icon,text}) => {
    this.setState({icon})
    this.props.setHeader(text)
  }
  render(){
    const {icon} = this.state
    const seletedHeader = icon ? <p>选择的头像：<img src={icon} alt="header"/></p> : '请选择头像'
    return(
      <List renderHeader={()=>seletedHeader}>
      <Grid 
      data={this.headerList}
      columnNum={5}
      onClick = {this.selectHeader}
       />
      </List>
    )
  }
}
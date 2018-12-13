/**
 * 用户信息完善组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import Header from '../../components/header/header'
import CitySelect from '../../components/cityselect/cityselect'

class User extends Component {
  state = {
    header: "",
    nickname: "",
    job: "",
    company: "",
    city: []
  }
  setHeader = (header) => {
    this.setState({ header })
  }
  setCity = (city) => {
    this.setState({ city })
  }
  handleChange = (name, val) => {
    this.setState({ [name]: val })
  }
  render() {
    const { user } = this.props
    if (user.header) {
      return <Redirect to='/message' />
    }
    return (
      <div>
        <NavBar>用户信息完善</NavBar>
        <Header setHeader={this.setHeader}></Header>
        <InputItem onChange={val => this.handleChange('nickname', val)}>昵称：</InputItem>
        <InputItem onChange={val => this.handleChange('company', val)}>公司：</InputItem>
        <InputItem onChange={val => this.handleChange('job', val)}>职业：</InputItem>
        <InputItem onChange={val => this.handleChange('city', val)}>城市：</InputItem>
        <CitySelect setCity={this.setCity}></CitySelect>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={() => this.props.updateUser(this.state)}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(User)
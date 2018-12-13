import React,{Component} from 'react'
import { Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import { district } from 'antd-mobile-demo-data';
import PropTypes from 'prop-types'

class ShowCity extends Component{
  static propTypes = {
    city:PropTypes.array.isRequired
  }
  render(){
    const { getFieldProps } = this.props.form
    const city = this.props.city
    const provice = city[0].toString()
    const provice1 = district.provice
    return(
      <List>
        <List>
            <List.Item arrow="horizontal" onClick={console.log(provice1)}></List.Item>
        </List>
      </List>
    )
  }
}
export default createForm()(ShowCity)
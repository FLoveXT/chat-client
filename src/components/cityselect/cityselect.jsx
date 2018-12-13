import React,{Component} from 'react'
import { Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import { district } from 'antd-mobile-demo-data';
import PropTypes from 'prop-types'

class CitySelect extends Component{
  static propTypes = {
    setCity:PropTypes.func.isRequired
  }
  render(){
    const { getFieldProps } = this.props.form
    return(
      <List>
        <List>
          <Picker extra="请选择"
            data={district}
            title="Areas"
            {...getFieldProps('district', {
              initialValue: ['340000', '341500', '341502'],
            })}
            onOk={e => this.props.setCity(e)}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal">城市：</List.Item>
          </Picker>
        </List>
      </List>
    )
  }
}
export default createForm()(CitySelect)
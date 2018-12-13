import React,{Component} from 'react'
import logo from './logo.png'
import './logo.less'

export default class Logo extends Component{
  render(){
    return(
      <div className='logo'>
        <img src={logo} className="logo-img" alt='logo'/>
      </div>
    )
  }
}
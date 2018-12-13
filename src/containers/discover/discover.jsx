import React, { Component } from 'react'
import { List, WhiteSpace } from 'antd-mobile'

const Item = List.Item
export default class Discover extends Component {
  //页面功能没有写，暂时放在容器组件中
  render() {
    return (
      <div className="discover-container">
        <WhiteSpace />
        <List>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { }}
          >朋友圈
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { }}
          >扫一扫
          </Item>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { }}
          >摇一摇
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { }}
          >看一看
          </Item>
          <Item
            thumb={require(`../../assets/images/other/add.png`)}
            arrow="horizontal"
            onClick={() => { }}
          >搜一搜
          </Item>
        </List>
      </div>
    )
  }
}
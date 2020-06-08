import * as React from 'react'
import { Dropdown, Menu } from 'antd'
import { LoginManager, ELoginType } from '@qn-pandora/app-sdk'
import { account } from '../../../package.json'

import './style.css'

interface IUserInfoState {
  userInfo: { username: string }
}
export default class UserInfo extends React.Component<{}, IUserInfoState> {
  loginManager = new LoginManager(ELoginType.PANDORA)

  state = {
    userInfo: { username: '' }
  }
  handleLoginout = () => {
    this.loginManager.logout()
    this.setState({ userInfo: { username: '' } })
  }

  async componentDidMount() {
    await this.loginManager.login(account)
    this.setState({ userInfo: await this.loginManager.getUserInfo() })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="logout">
          <a onClick={this.handleLoginout}>退出登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} className="userinfo-dropdown">
        <a className="userinfo-username" onClick={e => e.preventDefault()}>
          {this.state.userInfo.username}
        </a>
      </Dropdown>
    )
  }
}

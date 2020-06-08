import React from 'react'
import { Layout } from 'antd'
import { SearchManager } from '@qn-pandora/app-sdk'
import pandoraIcon from './resource/pandora2.0.svg'
import Chart from './components/Chart'
import SearchBar from './components/SearchBar'
import UserInfo from './components/UserInfo'

import 'liquidFill/dist/index.css'
import 'antd/dist/antd.css'
import './index.css'

interface IAppState {
  loading: boolean
  error: string
}
class App extends React.Component<{}, IAppState> {
  state = {
    loading: false,
    error: ''
  }

  searchManager = new SearchManager({
    option: {
      task: {
        result: true
      }
    }
  })

  setIsLoading = (loading: boolean) => {
    this.setState({
      loading
    })
  }

  setError = (error: string) => {
    this.setState({ error })
  }

  render() {
    return (
      <Layout>
        <Layout.Header>
          <img src={pandoraIcon} />
          <UserInfo />
        </Layout.Header>
        <Layout.Content>
          <SearchBar
            searchManager={this.searchManager}
            {...this.state}
            setIsLoading={this.setIsLoading}
            setError={this.setError}
          />
          <Chart
            searchManager={this.searchManager}
            {...this.state}
            setIsLoading={this.setIsLoading}
            setError={this.setError}
          />
        </Layout.Content>
      </Layout>
    )
  }
}

export default App

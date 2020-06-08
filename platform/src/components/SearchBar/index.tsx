import * as React from 'react'
import { Input, Button, Card } from 'antd'
import { DateTimePicker, ITime, Time } from '@qn-pandora/pandora-component'
import { SearchManager } from '@qn-pandora/app-sdk'

import './style.css'

interface ISearchBarProps {
  searchManager: SearchManager
  loading: boolean
  error: string
  setIsLoading: (loading: boolean) => void
  setError: (error: string) => void
}

interface ISearchBarState {
  queryString: string
  time: ITime
}
export default class SearchBar extends React.Component<
  ISearchBarProps,
  ISearchBarState
> {
  ref: null | HTMLElement = null

  state = {
    queryString: '',
    time: {
      preset: 'm5'
    }
  }

  setRef = (ref: null | HTMLElement) => {
    this.ref = ref
  }

  setQueryString = (e: any) => {
    this.setState({
      queryString: e.target.value
    })
  }

  setTime = (time: ITime) => {
    this.setState({
      time: time
    })
  }

  handleSearch = async () => {
    if (!this.state.queryString) {
      this.props.setError('请填写搜索条件')
      return
    }
    try {
      this.props.setIsLoading(true)
      const time = new Time(this.state.time)
      const date = time.toDate()
      // 将搜索条件存入localStorage
      localStorage.setItem('pandora-search', JSON.stringify(this.state))
      await this.props.searchManager.search({
        queryString: this.state.queryString,
        time: {
          start: date.start && date.start.valueOf(),
          end: date.end && date.end.valueOf()
        } as any
      })
    } catch (e) {
      this.props.setIsLoading(false)
      this.props.setError(e.Message)
    }
  }

  handlePressEnter = (e: any) => {
    if (e.shiftKey) {
      return
    }
    e.preventDefault()
    this.handleSearch()
  }

  componentDidMount() {
    const searchCondition = localStorage.getItem('pandora-search')
    if (searchCondition) {
      this.setState({ ...JSON.parse(searchCondition) })
    }
  }

  render() {
    return (
      <Card className="searchbar-card">
        <div ref={this.setRef} className="searchbar">
          <Input.TextArea
            className="searchbar-search-input"
            autoSize={{ minRows: 1 }}
            value={this.state.queryString}
            onChange={this.setQueryString}
            onPressEnter={this.handlePressEnter}
            disabled={this.props.loading}
          />
          <div className="searchbar-datetimepicker">
            <DateTimePicker
              getPopupContainer={() => this.ref!}
              value={this.state.time}
              onChange={this.setTime}
              disableToggle={this.props.loading}
            />
          </div>
          <Button
            type="primary"
            className="searchbar-search-button"
            onClick={this.handleSearch}
            disabled={this.props.loading}
          >
            搜索
          </Button>
        </div>
        {this.props.error && (
          <div className="searchbar-error">{this.props.error}</div>
        )}
      </Card>
    )
  }
}

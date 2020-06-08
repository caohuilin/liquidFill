import * as React from 'react'
import { Card, Spin } from 'antd'
import { get } from 'lodash'
import VisualizationStore from 'liquidFill'
import { SearchManager, EEventName } from '@qn-pandora/app-sdk'
import { OutputMode, IKeyValues } from '@qn-pandora/visualization-sdk'
import { IJobResult } from '@qn-pandora/app-sdk/lib/apis/job'

import './style.css'

interface IChartProps {
  searchManager: SearchManager
  loading: boolean
  setIsLoading: (loading: boolean) => void
  setError: (error: string) => void
}

export default class Chart extends React.Component<IChartProps, {}> {
  _first: boolean = true
  _data: IJobResult = { fields: [], rows: [] }
  visualizationStore = new VisualizationStore('#custom-chart')

  get data() {
    const params = this.visualizationStore.getInitialDataParams()
    if (params) {
      const { outputMode, count } = params
      const { rows, fields } = this._data
      const data = rows.slice(0, count)
      const fieldNames = fields.map(field => ({
        name: field.name
      }))
      switch (outputMode) {
        case OutputMode.JsonRows:
          return {
            fields: fieldNames,
            rows: data.map(series => {
              return series.map(sery => get(sery, 0))
            })
          }
        case OutputMode.JsonCols:
          return {
            fields: fieldNames,
            rows: fieldNames.map((_, index) => {
              return data.map(series => get(series, [index, 0]))
            })
          }
        case OutputMode.Json:
          return {
            fields: fieldNames,
            rows: data.map(series => {
              const data: IKeyValues = {}
              fieldNames.forEach((field, index) => {
                data[field.name] = get(series, [index, 0])
              })
              return data
            })
          }
      }
    }
    return this._data
  }

  setRef = (element: HTMLElement | null) => {
    if (element) {
      this.visualizationStore.setElement(element)
    }
  }

  handleData = (data: { result: IJobResult }) => {
    this.props.setIsLoading(false)
    const result = data.result
    this._data = result
    this.visualizationStore.setCurrentData(result)
    this.updateView()
  }

  handleError = (e: any) => {
    this.props.setError(e)
  }

  updateView = () => {
    if (this._first) {
      this.visualizationStore.setupView()
      this._first = false
    }
    try {
      this.visualizationStore.updateView(
        this.visualizationStore.formatData(this.data, {}),
        {}
      )
    } catch (e) {
      console.error('updateView error: ', e)
    }
  }

  handleResize = () => {
    this.visualizationStore.reflow()
    this.updateView()
  }

  componentDidMount() {
    this.props.searchManager.on(EEventName.DONE, this.handleData)
    this.props.searchManager.on(EEventName.ERROR, this.handleError)
    document.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.handleResize)
    this.visualizationStore.setElement(null)
    this.visualizationStore.remove()
  }

  render() {
    return (
      <Card className="chart-card">
        {this.props.loading ? (
          <Spin />
        ) : (
          <div id="custom-chart" ref={this.setRef}></div>
        )}
      </Card>
    )
  }
}

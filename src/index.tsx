// import * as React from "react";
// import * as ReactDom from "react-dom";
import {
  VisualizationBase,
  IKeyValues,
  OutputMode
} from '@qn-pandora/visualization-sdk'

import style from './styles.less'

export default class VisualizationStore extends VisualizationBase {
  getInitialDataParams() {
    return {
      outputMode: OutputMode.JsonCols,
      count: 10000
    }
  }

  updateView(dataset: any, config: IKeyValues) {
    // 根据 dataset 数据 和 config 实现可视化逻辑
    console.log('updateView', dataset, config)
    /**
     * react 方式渲染dom
     */
    // ReactDom.render(<div className={style.view}>view</div>, this.element);
    /**
     * 原生js渲染dom
     */
    const chartDom = document.createElement('div')
    chartDom.className = style.view
    const newContent = document.createTextNode('view!')
    chartDom.appendChild(newContent)
    this.element.appendChild(chartDom)
  }
}

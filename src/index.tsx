import * as React from "react";
import * as ReactDom from "react-dom";
import {
  VisualizationBase,
  IKeyValues,
  OutputMode
} from "@qn-pandora/visualization-sdk";
import "echarts-liquidfill";

import { LiquidFill } from "./LiquidFill";

export default class VisualizationStore extends VisualizationBase {
  getInitialDataParams() {
    return {
      outputMode: OutputMode.JsonCols,
      count: 10000
    };
  }

  updateView(dataset: any, config: IKeyValues) {
    // 根据 dataset 数据 和 config 实现可视化逻辑
    console.log("updateView", dataset, config);
    
    /**
     * react 方式渲染dom
     */
    ReactDom.render(
      <LiquidFill/>,
      this.element
    );
  }
}

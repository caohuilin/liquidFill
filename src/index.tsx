import * as React from "react";
import * as ReactDom from "react-dom";
import ReactEcharts from "echarts-for-react";
import {
  VisualizationBase,
  IKeyValues,
  OutputMode
} from "@qn-pandora/visualization-sdk";
import "echarts-liquidfill";

import style from "./styles.less";

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
    const option = {
      backgroundColor: "#050038",
      title: {
        text: "",
        textStyle: {
          fontWeight: "normal",
          fontSize: 25,
          color: "rgb(97, 142, 205)"
        }
      },
      series: [
        {
          type: "liquidFill",
          radius: "45%",
          center: ["50%", "50%"],
          data: [0.5, 0.5, 0.5], // data个数代表波浪数
          backgroundStyle: {
            borderWidth: 1,
            color: "rgb(255,0,255,0.1)"
          },
          label: {
            normal: {
              formatter: (0.5 * 100).toFixed(2) + "%",
              textStyle: {
                fontSize: 50
              }
            }
          },
          outline: {
            show: false
          }
        },
        {
          type: "pie",
          center: ["50%", "50%"],
          radius: ["50%", "52%"],
          hoverAnimation: false,
          data: [
            {
              name: "",
              value: 500,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: "#5886f0"
              }
            },
            {
              //画中间的图标
              name: "",
              value: 4,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: "#ffffff",
                normal: {
                  color: "#5886f0",
                  borderColor: "#5886f0",
                  borderWidth: 20
                  // borderRadius: '100%'
                }
              },
              label: {
                borderRadius: "100%"
              }
            },
            {
              // 解决圆点过大后续部分显示明显的问题
              name: "",
              value: 4.5,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: "#5886f0"
              }
            },
            {
              //画剩余的刻度圆环
              name: "",
              value: 88,
              itemStyle: {
                color: "#050038"
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          ]
        }
      ]
    };
    /**
     * react 方式渲染dom
     */
    ReactDom.render(
      <ReactEcharts
        option={option}
        theme="pandora-light"
        notMerge={true}
        className={style.echarts}
      />,
      this.element
    );
  }
}

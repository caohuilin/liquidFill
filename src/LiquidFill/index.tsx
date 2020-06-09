import  * as  React from 'react'
import ReactEcharts from 'echarts-for-react'
import  './style.less'
export class LiquidFill extends React.Component{
    getOption(){
        const option= {
            series: [{
                type: 'liquidFill',
                radius: '90%',
                backgroundStyle: {
                    borderWidth: 1,
                    color: 'rgb(255,0,255,0.1)'
                },
                label: {
                    normal: {
                        formatter: (0.8 * 100).toFixed(2) + '%',
                        textStyle: {
                            fontSize: 50
                        }
                    }
                },
                data: [0.6, 0.5, 0.4, 0.3],
                tooltip: {
                    show: true
                }
            }]
        }
      return option
    }
   render(){
       return <ReactEcharts
       className="liquidFill"
       option={this.getOption()}
       theme="pandora-light"
       notMerge={true}
     />
   }
}
/*
* PoliceSituationToCaseCount.js 智慧案管大屏----警情转化案件数量Line
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';
import title from 'echarts/lib/component/title';
import tooltip from 'echarts/lib/component/tooltip';

let myChart;

export default class PoliceSituationToCaseCount extends PureComponent {
  componentDidMount() {
    this.showEchart();
    this.getPoliceSituationToCaseCount();
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.timeList !== nextProps.timeList) {
        this.getPoliceSituationToCaseCount(nextProps.timeList);
      }
    }
  }

  // 获取行政处罚数量
  getPoliceSituationToCaseCount = (timeList) => {
    const xData = [];
    const lineData1 = [];
    const lineData2 = [];
    const lineData3 = [];
    let time = [];
    let dataList = timeList ? timeList : this.props.timeList;
    let num = 0;
    for (let i = 0; i < dataList.length; i++) {
      time.push(dataList[i].time);
      lineData1.push(dataList[i].count1);
      lineData2.push(dataList[i].count2);
      lineData3.push(dataList[i].count3);
      num = num + parseInt(dataList[i].count1) + parseInt(dataList[i].count2);
    }
    myChart.setOption({
      xAxis: {
        type : 'category',
        axisLabel: {
          textStyle: {
          },
            color: '#fff',
        },
        boundaryGap : false,
        data : time
      },
      series: [
        {
          name:'重点人员',
          type:'line',
          stack: '重点人员人数',
          areaStyle: {},
          data:lineData1,
        },
        {
          name:'疑似病例',
          type:'line',
          stack: '疑似病例人数',
          areaStyle: {},
          data:lineData2,
        },
        {
          name:'确诊病例',
          type:'line',
          stack: '确诊病例人数',
          areaStyle: {},
          data:lineData3,
        },
      ],
    });
  };

  showEchart = () => {
    myChart = echarts.init(document.getElementById('PoliceSituationToCaseCount'));

    const option = {
      title: {
        text: ' ',
        textStyle: {
          color: '#66ccff',
          fontSize: 20,
        },
      },
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data:[]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : []
        }
      ],
      yAxis : [
        {
          type : 'value',
          axisLabel: {
            textStyle: {
              color: '#68CCFE'
            },
          },
          splitLine:{
            lineStyle: {
              color:'#fff'
            }
          },
        }
      ],
      series: [
        {
          name: '重点人员',
          type: 'line',
          stack: '重点人员人数',
          symbol: 'circle',
          areaStyle: {},
          smooth: false, //平滑曲线显示
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#4971ff', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#9798ff', // 100% 处的颜色
                }
              ]
            },
          }
        },
        {
          name: '疑似病例',
          type: 'line',
          stack: '疑似病例人数',
          symbol: 'circle',
          areaStyle: {},
          smooth: false, //平滑曲线显示
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#ff8713', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#ffc254', // 100% 处的颜色
                }
              ]
            },
          }
        },
        {
          name: '确诊病例',
          type: 'line',
          stack: '确诊病例人数',
          symbol: 'circle',
          areaStyle: {},
          smooth: false, //平滑曲线显示
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#ff191f', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#ff5f61', // 100% 处的颜色
                }
              ]
            },
          }
        }
      ],
    };


    myChart.setOption(option);
  };

  render() {
    return <div id="PoliceSituationToCaseCount" style={{ height: '100%', width: '100%' }} />;
  }
}

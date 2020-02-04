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
      if (this.props.currentDateType !== nextProps.currentDateType|| this.props.org !== nextProps.org) {
        // this.getPoliceSituationToCaseCount();
      }
    }
  }

  // 获取行政处罚数量
  getPoliceSituationToCaseCount = () => {
    const xData = [];
    const lineData1 = [];
    const lineData2 = [];
    const dataList = [
      { count1: Math.floor(Math.random()*(500 - 1) + 1), count2:3,count3:5,time: '2020-02-04' },
      { count1: Math.floor(Math.random()*(500 - 1) + 1), count2:4,count3:5,time: '2020-02-05' },
      { count1: Math.floor(Math.random()*(500 - 1) + 1), count2:3,count3:5, time: '2020-02-06' },
      { count1: Math.floor(Math.random()*(500 - 1) + 1), count2:3,count3:5, time: '2020-02-07' },
      { count1: Math.floor(Math.random()*(500 - 1) + 1), count2:3,count3:5, time: '2020-02-08' },
    ];
    let num = 0;

    for (let i = 0; i < dataList.length; i++) {
      lineData1.push(dataList[i].count1);
      num = num + parseInt(dataList[i].count1) + parseInt(dataList[i].count2);
    }
    myChart.setOption({
      xAxis: {
        type : 'category',
        axisLabel: {
          textStyle: {
            color: '#fff',
          },
        },
        boundaryGap : false,
        data : ['2020-02-04','2020-02-05','2020-02-06','2020-02-07','2020-02-08']
      },
      series: [
        {
          name:'数量',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:lineData1,

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
          data : ['2020-02-04','2020-02-05','2020-02-08']
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
          name: '数量',
          type: 'line',
          stack: '总量',
          symbol: 'none',
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
        }
      ],
    };


    myChart.setOption(option);
  };

  render() {
    return <div id="PoliceSituationToCaseCount" style={{ height: '100%', width: '100%' }} />;
  }
}

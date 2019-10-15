/*
* PoliceSituationToCaseCount.js 智慧案管大屏----警情转化案件数量Line
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';
import title from 'echarts/lib/component/title';

let myChart;

export default class PoliceSituationToCaseCount extends PureComponent {
  componentDidMount() {
    this.showEchart();
    this.getPoliceSituationToCaseCount();
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (
        nextProps.selectDate !== null &&
        (this.props.selectDate !== nextProps.selectDate ||
          this.props.orgCode !== nextProps.orgCode ||
          this.props.org !== nextProps.org ||
          this.props.orglist !== nextProps.orglist)
      ) {
        this.getPoliceSituationToCaseCount(
          nextProps.selectDate[0],
          nextProps.selectDate[1],
          nextProps.org,
          nextProps.orgCode,
          nextProps.orglist
        );
      }
    }
  }

  // 获取行政处罚数量
  getPoliceSituationToCaseCount = (startTime, endTime, org, orgCode, orglist) => {
    console.log(startTime, endTime);
    const xData = [];
    const lineData1 = [];
    const lineData2 = [];
    const dataList = [
      { count1: '101', jjdw_mc: '入库' },
      { count1: '23', jjdw_mc: '调取' },
      { count1: '176', jjdw_mc: '处理' },
    ];
    let num = 0;

    for (let i = 0; i < dataList.length; i++) {
      xData.push(dataList[i].jjdw_mc);
      lineData1.push(dataList[i].count1);
      lineData2.push(dataList[i].count2);
      num = num + parseInt(dataList[i].count1) + parseInt(dataList[i].count2);
    }
    myChart.setOption({
      xAxis: {
        data: xData,
      },
      series: [
        {
          data: lineData1,
        },
        {
          data: lineData2,
        },
      ],
    });
  };

  showEchart = () => {
    myChart = echarts.init(document.getElementById('PoliceSituationToCaseCount'));

    const option = {
      title: {
        text: '涉案财物数量',
        textStyle: {
          color: '#66ccff',
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'category',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            rotate: 20,
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: '#01E7CA',
            },
          },
          axisTick: {
            inside: true,
            length: 3,
            lineStyle: {
              width: 2,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#68CCFE',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#334553',
            },
          },
        },
      ],
      series: [
        {
          name: '行政案件转化',
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
                },
              ],
            },
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
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
                  color: '#6f0573', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#c6306c', // 100% 处的颜色
                },
              ],
            },
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return <div id="PoliceSituationToCaseCount" style={{ height: '100%', width: '100%' }} />;
  }
}

/*
* PoliceSituationFrom.js 智慧案管大屏----警情来源统计bar
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import title from 'echarts/lib/component/title';
import tooltip from 'echarts/lib/component/tooltip';

let myChart;
const colors = ['#ff3386', '#00b7e0', '#6880ff', '#5393d3', '#6d81d8', '#896ddc', '#9d60df'];

export default class PoliceSituationFrom extends PureComponent {
  componentDidMount() {
    const { selectDate, org, orgCode, orglist } = this.props;
    this.showEchart();
    this.getPoliceSituationFrom(selectDate[0], selectDate[1], org, orgCode, orglist);
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.currentDateType !== nextProps.currentDateType || this.props.org !== nextProps.org){
        this.getPoliceSituationFrom();
      }
    }
  }

  // 获取警情来源数据
  getPoliceSituationFrom = () => {
    let data = {
      list: [
        { name: '违反流程', count: Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '001' },
        { name: '男女混关', count: Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '002' },
        { name: '滞留超期', count: Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '003' },
        { name: '无人看管', count: Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '004' },
      ],
    };
    const xData = [];
    const barData = [];
    let bigestNum = 0;
    let num = 0;
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].name !== '全部') {
        xData.push(data.list[i].name);
        const obj = {
          name: data.list[i].name,
          value: data.list[i].count,
          code: data.list[i].jjly_dm,
          itemStyle: {
            color: colors[i],
          },
        };
        bigestNum = data.list[i].count > bigestNum ? data.list[i].count : bigestNum;
        num = num + parseInt(data.list[i].count);
        barData.push(obj);
      }
      myChart.setOption({
        xAxis: {
          data: xData,
        },
        series: [
          {
            data: barData,
          },
        ],
      });
    }
  };

  showEchart = () => {
    myChart = echarts.init(document.getElementById('PoliceSituationFrom'));

    const option = {
      title: {
        text: '办案区告警数',
        textStyle: {
          color: '#66ccff',
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: [
        {
          type: 'category',
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
          data: [],
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
          type: 'bar',
          barWidth: '60%',
          data: [],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return <div id="PoliceSituationFrom" style={{ height: '100%', width: '100%' }} />;
  }
}

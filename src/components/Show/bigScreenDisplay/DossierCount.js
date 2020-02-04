/*
* DossierCount.js 智慧案管大屏----卷宗数量bar
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import title from 'echarts/lib/component/title';
import tooltip from 'echarts/lib/component/tooltip';
import styles from './bigScreenDisplay.less';

let myChart;

export default class DossierCount extends PureComponent {
  state={
    // tabList:['讯/询问室总数','候问室总数'],
    idx: 0,
  }
  componentDidMount() {
    this.showEchart();
    this.getDossierCount();
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.currentDateType !== nextProps.currentDateType|| this.props.org !== nextProps.org) {
        this.getDossierCount(this.state.idx);
      }
    }
  }

  // 获取卷宗数量
  getDossierCount = (idx) => {
    let num = 0;
    const xData = [];
    const barData1 = [];
    const barData2 = [];
    const barData3 = [];
    let dataList = this.props.listBar;
    // let dataList = [
    //   { name: '大鹏镇', count1: 4,count2: 5, count3: 2 },
    //   {name:"大新镇", count1: 3,count2: 5, count3: 2},
    //   {name:"寺面镇", count1: 2,count2: 5, count3: 2},
    //   {name:"马练瑶族乡", count1: 1,count2: 5, count3: 2},
    //   {name:"大安镇", count1: 5,count2: 5, count3: 2},
    //   {name:"官成镇", count1:  6,count2: 5, count3: 2},
    //   {name:"思旺镇", count1: 1,count2: 5, count3: 2},
    //   {name:"安怀镇", count1: 1,count2: 5, count3: 2},
    //   {name:"上渡镇", count1: 1,count2: 5, count3: 2},
    //   {name:"平南镇", count1: 1,count2: 5, count3: 2},
    //   {name:"六陈镇", count1: 1,count2: 5, count3: 2},
    //   {name:"同和镇", count1: 1,count2: 5, count3: 2},
    //   {name:"国安瑶族乡", count1: 1,count2: 5, count3: 2},
    //   {name:"平山镇", count1: 1,count2: 5, count3: 2},
    //   {name:"大洲镇",count1: 0,count2: 5, count3: 2},
    //   {name:"丹竹镇", count1: 0,count2: 5, count3: 2},
    //   {name:"思界乡", count1: 2,count2: 5, count3: 2},
    //   {name:"武林镇", count1: 2,count2: 5, count3: 2},
    //   {name:"东华乡", count1: 0,count2: 5, count3: 2},
    //   {name:"镇隆镇", count1: 2,count2: 5, count3: 2},
    //   {name:"大坡镇", count1: 2,count2: 5, count3: 2}
    // ];
    // if(idx&&idx === 1){
    //   dataList = [
    //     { name: '候问室', count1: 3, count2:5 },
    //   ];
    // }

    for (let i = 0; i < dataList.length; i++) {
      xData.push(dataList[i].name);
      barData1.push(dataList[i].count1 ? dataList[i].count1 : 0);
      barData2.push(dataList[i].count2 ? dataList[i].count2 : 0);
      barData3.push(dataList[i].count3 ? dataList[i].count3 : 0);
      // num = num + parseInt(dataList[i].count1) + parseInt(dataList[i].count2)+ parseInt(dataList[i].count3);
    }
    myChart.setOption({
      xAxis: {
        data: xData,
      },
      series: [
        {
          data: barData1,
        },
        {
          data: barData2,
        },
        {
          data: barData3,
        },
      ],
    });
  };
  getTab = (idx) =>{
    this.getDossierCount(idx);
    this.setState({
      idx:idx,
    });
  }

  showEchart = () => {
    myChart = echarts.init(document.getElementById('DossierCount'));

    const option = {
      title: {
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
          name: '重点人员',
          type: 'bar',
          itemStyle: {
            color: ['#7106c1'],
          },
          data: [],
        },
        {
          name: '疑似病例',
          type: 'bar',
          itemStyle: {
            color: ['#ff9800'],
          },
          data: [],
        },
        {
          name: '确诊病例',
          type: 'bar',
          itemStyle: {
            color: ['#fe0032'],
          },
          data: [],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return <div  style={{ height: '100%', width: '100%',position:'relative' }}>
      <div id="DossierCount" style={{ height: '100%', width: '100%' }} />
    </div>
  }
}

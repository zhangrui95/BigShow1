/*
* PoliceSituationToCaseCount.js 智慧案管大屏----警情转化案件数量Line
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import { Button } from 'antd';
import echarts from 'echarts/lib/echarts';
import styles from './bigScreenDisplay.less';

import map from 'echarts/lib/chart/map';
import effectScatter from 'echarts/lib/chart/effectScatter';
import geo from 'echarts/lib/component/geo';
import title from 'echarts/lib/component/title';
import visualMap from 'echarts/lib/component/visualMap';
import china from '../mapData/china';
import mudanjiang from '../mapData/mudanjiangNew';
import hulunbeier from '../mapData/hulunbeier';
import baishan from '../mapData/baishan';
import pingnan from '../mapData/pingnan';
import hebi from '../mapData/hebi';
import erduosi from '../mapData/erduosi';
import guiLin from '../mapData/gui_lin';
import liaoning from '../mapData/liaoning';
import tooltip from 'echarts/lib/component/tooltip';
let myChart;
let MapData;
let cityName;
let cityPosition;
let renderFlag = 0;
let intervalId;
let count = 0; // 轮播索引

// 市区数据
const mapCityName = 'pingnan';
MapData = pingnan;
cityName = [
  {name:"大新镇", code: '150302',cp:[]},
  {name:"寺面镇", code: '150303',cp:[]},
  {name:"马练瑶族乡", code: '150304',cp:[]},
  {name:"大安镇", code: '150305',cp:[]},
  {name:"官成镇", code: '150306',cp:[]},
  {name:"思旺镇", code: '150307',cp:[]},
  {name:"安怀镇", code: '150308',cp:[]},
  {name:"上渡镇", code: '150309',cp:[]},
  {name:"平南镇", code: '150310',cp:[]},
  {name:"六陈镇", code: '150311',cp:[]},
  { name: '大鹏镇', code: '150301',cp:[] },
  {name:"同和镇", code: '150312',cp:[]},
  {name:"国安瑶族乡", code: '150313',cp:[]},
  {name:"平山镇", code: '150314',cp:[]},
  {name:"大洲镇", code: '150315',cp:[]},
  {name:"丹竹镇", code: '150316',cp:[]},
  {name:"思界乡", code: '150317',cp:[]},
  {name:"武林镇", code: '150318',cp:[]},
  {name:"东华乡", code: '150319',cp:[]},
  {name:"镇隆镇", code: '150320',cp:[]},
  {name:"大坡镇", code: '150321',cp:[]}
];
export default class ChinaMap extends PureComponent {
  state = {
    caseCountNum: 0,
    warningCountNum: 0,
    criminalNum: 0,
    illegalPersonNum: 0,
    publicTransportation: 0, // 交通
    economicalInvestigation: 0, // 经侦
    criminalInvestigation: 0, // 刑侦
    foodMedicine: 0, // 食药环
    drug: 0, // 禁毒
    mapIntervalTime: this.props.mapLoopTime * 1000,
    mapDataArry: [],
    shadeColors: [
      '#330000',
      '#660000',
      '#990000',
      '#cc0000',
      '#ff0000',
      '#cc3300',
      '#cc3333',
      '#cc6600',
      '#ff6600',
      '#cc9933',
      '#ff9100',
      '#fea500',
      '#fdb60c',
      '#ffcc00',
      '#ffcc66',
      '#cccc00',
      '#FFFF33',
      '#FFFF66',
      '#FFFFCC',
    ],
  };

  componentDidMount() {
    myChart = echarts.init(document.getElementById('ChinaMap'));
    this.showEchart(MapData);
    this.getMapData(this.props.selectDate[0], this.props.selectDate[1], MapData);
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (!renderFlag && this.props !== nextProps) {
        const propsArry = Object.values(this.props);
        if (propsArry.includes('ajzs') || propsArry.includes('gjzs')) {
          this.getCaseAndWarningCount(this.props.selectDate[0], this.props.selectDate[1], '');
          renderFlag = 1;
        }
      }
      if(nextProps.mapData !== this.props.mapData){
        this.getMapData(this.props.selectDate[0], this.props.selectDate[1], MapData,nextProps.mapData);
      }
      if (
        nextProps.selectDate !== null &&
        (this.props.selectDate !== nextProps.selectDate ||
          this.props.orgCode !== nextProps.orgCode ||
          this.props.org !== nextProps.org)
      ) {
        const propsArry = Object.values(this.props);
        if (propsArry.includes('ajzs') || propsArry.includes('gjzs')) {
          this.getCaseAndWarningCount(
            nextProps.selectDate[0],
            nextProps.selectDate[1],
            nextProps.org
          );
        }
      }
    }
  }

  // 获取案件、告警总数
  getCaseAndWarningCount = (startTime, endTime, orgCode) => {
    this.setState({
      caseCountNum: 10,
      warningCountNum: 31,
      criminalNum: 24,
      illegalPersonNum: 35,
    });
  };
  // 轮播地图
  loopMap = arry => {
    const that = this;
    intervalId && clearInterval(intervalId);
    intervalId = setInterval(function() {
      if (count === arry.length) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        });
        that.props.setAreaCode('');
        count = 0;
      } else {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        });
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: count,
        });
        // myChart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: count,
        // });
        that.props.setAreaCode(arry[count]&&arry[count].code ? arry[count].code : '');
        that.props.setAreaName(arry[count]&&arry[count].name ? arry[count].name : '');
        count++;
      }
    }, this.props.mapLoopTime * 1000);
  };
  // 停止轮播地图
  stopLoopMap = () => {
    clearInterval(intervalId);
  };
  // 重置地图
  resetMap = () => {
    const { mapDataArry } = this.state;
    if (mapDataArry.length > 0) {
      this.stopLoopMap();
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      });
      this.props.setAreaCode('');
      count = 0;
      this.loopMap(mapDataArry);
    }
  };
  // 获取地图数据
  getMapData = (startTime, endTime, dataMap,mapData) => {
    let data = mapData ? mapData : this.props.mapData;
    let arry = [];
    for (let i in dataMap.features) {
      let obj = null;
      arry.push({
        name: dataMap.features[i].properties.name,
        value: data[i]&&data[i].count ? data[i].count : 0,
        value1: data[i]&&data[i].count1 ? data[i].count1 : 0,
        value2: data[i]&&data[i].count2 ? data[i].count2 : 0,
        code: dataMap.features[i]&&dataMap.features[i].id ? dataMap.features[i].id : Math.floor(Math.random()*(9999 - 1) + 1),
        click: dataMap.features[i]&&dataMap.features[i].id ? true : false,
        cp: dataMap.features[i]&&dataMap.features[i].properties.cp ? dataMap.features[i].properties.cp : '',
        ...obj,
      });
    }
    // 先排序
    arry = arry.sort(function(a, b) {
      return b.value - a.value;
    });
    // 根据排序添加颜色：数据由大到小
    // for(let i in  arry){
    //     arry[i] = {
    //         ...arry[i],
    //         itemStyle:{
    //             areaColor: this.state.shadeColors[i],
    //         },
    //     }
    // }
    // const res = this.convertData(arry.slice(0, 3))
    myChart.setOption({
      visualMap: {
        left: 'right',
        inRange: {
          color: [
              '#61d156',
              '#fd7921',
              '#d70400',
          ],
        },
        min: arry[arry.length - 1].value,
        max: arry[0].value, // 文本，默认为数值文本
        calculable: false, // 是否展示右侧示例拖拽手柄
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          data: arry,
        },
        // {
        //     data: res,
        // },
      ],
    });
    this.setState({ mapDataArry: arry });
    const that = this;
    // let dataLength = arry.length;
    this.loopMap(arry);
    myChart.on('click', function(params) {
      that.stopLoopMap();
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
    myChart.on('mouseout', function(params) {
      that.loopMap(arry);
    });
  };
  // 根据城市编码获取城市名称
  getCityNameByCode = code => {
    for (let i = 0; i < cityName.length; i++) {
      if (code === cityName[i].code) return cityName[i].name;
    }
  };
  // 根据城市编码获取值
  getCityValueByCode = (code, data) => {
    for (let i = 0; i < data.length; i++) {
      if (code === data[i].org){
        return data[i].count;
      }
    }
    return 0;
  };
  // 根据位置显示数据
  handleCountNumPosition = type => {
    const { caseCountNum, warningCountNum, criminalNum, illegalPersonNum } = this.state;
    if (type === 'ajzs') {
      return (
        <div className={styles.countType}>
          <h4>案件总数</h4>
          <h2>{caseCountNum}</h2>
        </div>
      );
    } else if (type === 'gjzs') {
      return (
        <div className={styles.countType}>
          <h4>告警总数</h4>
          <h2>{warningCountNum}</h2>
        </div>
      );
    } else if (type === 'fzrys') {
      return (
        <div className={styles.countType}>
          <h4>犯罪人员数</h4>
          <h2>{criminalNum}</h2>
        </div>
      );
    } else if (type === 'wfrys') {
      return (
        <div className={styles.countType}>
          <h4>违法人员数</h4>
          <h2>{illegalPersonNum}</h2>
        </div>
      );
    } else {
      return null;
    }
  };
  convertData = data => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      // let geoCoord = cityPosition[data[i].name];
      // if (geoCoord) {
      //     res.push({
      //         name: data[i].name,
      //         value: geoCoord.concat(data[i].value),
      //         symbolSize: 10,
      //     });
      // }
      res.push({
        name: data[i].name,
        value: [...data[i].cp, data[i].value],
        // value: data[i].value,
        symbolSize: 15,
      });
    }
    return res;
  };

  showEchart = data => {
    myChart.clear();
    echarts.registerMap('MapData', data);
    const option = {
      // tooltip:{},
      tooltip : {
        formatter(params) {
            return  "重点人员:" +JSON.stringify(params.data.value1)+'<br/>'+"疑似病例:" +JSON.stringify(params.data.value2)+'<br/>'+"确诊病例:" +JSON.stringify(params.data.value);
        }
      },
      legend: {
        left: 'left',
        data: ['强', '中', '弱'],
        textStyle: {
          color: '#ccc',
        },
      },
      geo: {
        map: 'MapData',
        show: false,
        roam: 'scale',
        zoom: 1,
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: '#000033',
            borderColor: '#1773c3',
            shadowColor: '#1773c3',
            shadowBlur: 20,
          },
        },
      },
      series: [
        {
          type: 'map',
          map: 'MapData',
          // name: '案件总数',
          zoom: 1.2,
          geoIndex: 1,
          aspectScale: 1.5, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          top: 60,
          // tooltip: {
          //     formatter: function (params) {
          //         if(params && params.data) return '当前选中城市：' + params.data.name;
          //     },
          // },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#000',
                fontSize: 24,
                fontWeight: 'bolder',
              },
              // formatter:'{a}:{b}',
            },
          },
          roam: 'scale',
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              // color: '#ddb926',
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                // colorStops: [
                  // {
                  //   offset: 0,
                  //   color: '#6f05c3', // 0% 处的颜色
                  // },
                  // {
                  //   offset: 1,
                  //   color: '#c6306c', // 100% 处的颜色
                  // },
                // ],
              },
              borderWidth: 0,
            },
          },
          data: [],
        },
      ],
    };
    myChart.setOption(option);
    let that = this;
    myChart.off('click');
    myChart.on('click', function(params) {
      that.props.setAreaCode(params.data.code);
      // if (params.data && params.data.click) {
      //   let myData = require('../mapData/' + params.data.code);
      //   that.showEchart(myData);
      //   that.getMapData(that.props.selectDate[0], that.props.selectDate[1], myData);
      // } else {
      //   // that.showEchart(MapData);
      //   // that.getMapData(that.props.selectDate[0], that.props.selectDate[1], MapData);
      //   that.props.getMap(false);
      // }
    });
  };

  render() {
    const { position8, position9, position10, position11 } = this.props;
    const {
      publicTransportation,
      economicalInvestigation,
      criminalInvestigation,
      foodMedicine,
      drug,
    } = this.state;
    return (
      <div className={styles.mapArea}>
        <div id="ChinaMap" style={{ height: '100%', width: '100%' }} />
        <div className={styles.countNumberArea}>
          {this.handleCountNumPosition(position8)}
          {this.handleCountNumPosition(position9)}
          {this.handleCountNumPosition(position10)}
          {this.handleCountNumPosition(position11)}
        </div>
        {/*<div onClick={this.resetMap} className={styles.resetMapButton}>全局</div>*/}
      </div>
    );
  }
}

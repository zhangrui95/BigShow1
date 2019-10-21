/*
* PoliceDataView.js 警情数据展示
* author：lyp
* 20181113
* */
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment/moment';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import pie from 'echarts/lib/chart/pie';
import line from 'echarts/lib/chart/line';
import title from 'echarts/lib/component/title';
import legend from 'echarts/lib/component/legend';
import tooltip from 'echarts/lib/component/tooltip';
import styles from './dataView.less';
import { getDefaultDaysForMonth, getTimeDistance } from '../../utils/utils';

let policeEchartBar;
let policeEchartRingPie;
let policeEchartLine;
let policeThreePie1;
let policeThreePie2;
let sJCountEchartBar;
let scqkCountEchartBar;
const colors1 = [
  '#259DF4',
  '#40537E',
  '#EDB59C',
  '#FED501',
  '#3074B5',
  '#72C4B8',
  '#3FC228',
  '#FFD205',
  '#FB1241',
  '#6465FD',
  '#FF6600',
];

export default class AudioDataView extends PureComponent {
  state = {
    currentType: 'today',
    nowData: 0,
    lastData: 0,
    beforeLastData: 0,
    selectedDateData: 0, // 头部统计警情总数——手动选择日期
    dayType: ['today', 'lastDay', 'beforeLastDay'],
    weekType: ['week', 'lastWeek', 'beforeLastWeek'],
    monthType: ['month', 'lastMonth', 'beforeLastMonth'],
    dateType: {
      today: '0',
      lastDay: '1',
      beforeLastDay: '2',
      week: '3',
      lastWeek: '4',
      beforeLastWeek: '5',
      month: '6',
      lastMonth: '7',
      beforeLastMonth: '8',
    },
    jqzkNoData: false, // 警情状况无数据
    jqslNoData: false, // 警情数量无数据
  };

  componentDidMount() {
    const { jjdw, searchType } = this.props;
    this.showPoliceEchartBar();
    this.getPoliceSituationCount(jjdw, searchType);
    this.showPoliceEchartRingPie();
    this.getHandleResult(jjdw, searchType);
    this.showSJCountEchartBar();
    this.getSJCount(jjdw, searchType);
    this.showScqkCountEchartBar();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props !== nextProps) {
        const { jjdw, searchType } = nextProps;
        this.getPoliceSituationCount(jjdw, searchType);
        this.getHandleResult(jjdw, searchType);
        this.getSJCount(jjdw, searchType);
        this.showScqkCountEchartBar();
      }
    }
  }

  getTime = type => {
    const time = getTimeDistance(type);
    const startTime = time[0] === '' ? '' : moment(time[0]).format('YYYY-MM-DD');
    const endTime = time[1] === '' ? '' : moment(time[1]).format('YYYY-MM-DD');
    return [startTime, endTime];
  };

  // 警情数量
  getPoliceSituationCount = (jjdw, searchType) => {
    let barData;
    const xData = ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12'];
    let dataShadow = [40, 210, 338, 221, 156, 321, 109, 98, 15, 95, 0,0];
    if (jjdw === '150621000000') {
      if (searchType === 'day') {
        barData = [0, 100, 98, 15, 85, 101, 50, 70, 28, 5, 0, 0];
        dataShadow = [40, 210, 138, 221, 156, 321, 109, 70, 28, 0, 0,0];
      } else {
        barData = [0, 320, 168, 115, 485, 311, 255, 100, 98, 15, 0, 0];
        dataShadow = [0, 70, 28, 5, 35, 61, 18,0, 100, 98, 0, 0];
      }
    } else {
      if (searchType === 'day') {
        barData = [0, 70, 28, 5, 35, 61, 18,0, 100, 98, 0, 0];
        dataShadow = [0, 100, 98, 15, 85, 101, 50, 70, 28, 5, 0, 0];
      } else {
        barData = [40, 210, 138, 221, 156, 321, 109, 70, 28, 5, 0, 0];
        dataShadow = [0, 100, 98, 15, 85, 101, 50, 70, 28, 5,  0, 0];
      }
    }

    policeEchartBar.setOption({
      xAxis: {
        data: xData,
      },
      series: [
        {
          data: dataShadow,
        },
        {
          data: barData,
        },
      ],
    });
  };
  getSJCount = (jjdw, searchType) => {
    let barData;
    const xData = ['上传超期预警', '上传超期告警'];
    let dataShadow = [67, 81];
    if (jjdw === '150621000000') {
      if (searchType === 'day') {
        barData = [34, 53];
        dataShadow = [23, 51];
      } else {
        barData = [66, 97];
        dataShadow = [45, 71];
      }
    } else {
      if (searchType === 'day') {
        barData = [19, 12];
        dataShadow = [20, 5];
      } else {
        barData = [32, 51,23];
        dataShadow = [7, 23];
      }
    }

    sJCountEchartBar.setOption({
      xAxis: {
        data: xData,
      },
      series: [
        {
          data: dataShadow,
        },
        {
          data: barData,
        },
      ],
    });
  };
  // 处置结果
  getHandleResult = (jjdw, searchType) => {
    const legendData = ['国保大队', '治安大队', '经侦大队', '刑警大队'];
    let pieData;
    if (jjdw === '150621000000') {
      if (searchType === 'day') {
        pieData = [
          {
            name: '国保大队',
            value: '30',
            itemStyle: {
              color: colors1[0],
            },
          },
          {
            name: '治安大队',
            value: '59',
            itemStyle: {
              color: colors1[1],
            },
          },
          {
            name: '经侦大队',
            value: '19',
            itemStyle: {
              color: colors1[2],
            },
          },
          {
            name: '刑警大队',
            value: '70',
            itemStyle: {
              color: colors1[3],
            },
          },
        ];
      } else {
        pieData = [
          {
            name: '国保大队',
            value: '433',
            itemStyle: {
              color: colors1[0],
            },
          },
          {
            name: '治安大队',
            value: '859',
            itemStyle: {
              color: colors1[1],
            },
          },
          {
            name: '经侦大队',
            value: '671',
            itemStyle: {
              color: colors1[2],
            },
          },
          {
            name: '刑警大队',
            value: '170',
            itemStyle: {
              color: colors1[3],
            },
          },
        ];
      }
    } else {
      if (searchType === 'day') {
        pieData = [
          {
            name: '国保大队',
            value: '5',
            itemStyle: {
              color: colors1[0],
            },
          },
          {
            name: '治安大队',
            value: '0',
            itemStyle: {
              color: colors1[1],
            },
          },
          {
            name: '经侦大队',
            value: '0',
            itemStyle: {
              color: colors1[2],
            },
          },
          {
            name: '刑警大队',
            value: '0',
            itemStyle: {
              color: colors1[3],
            },
          },
        ];
      } else {
        pieData = [
          {
            name: '国保大队',
            value: '54',
            itemStyle: {
              color: colors1[0],
            },
          },
          {
            name: '治安大队',
            value: '0',
            itemStyle: {
              color: colors1[1],
            },
          },
          {
            name: '经侦大队',
            value: '0',
            itemStyle: {
              color: colors1[2],
            },
          },
          {
            name: '刑警大队',
            value: '0',
            itemStyle: {
              color: colors1[3],
            },
          },
        ];
      }
    }

    let countData = 0;
    for (let i = 0; i < pieData.length; i++) {
      countData += parseInt(pieData[i].value);
    }
    policeEchartRingPie.setOption({
      legend: {
        data: legendData,
        formatter: function(name) {
          let formatStr = '';
          for (let i = 0; i < pieData.length; i++) {
            if (name === pieData[i].name) {
              formatStr = `${name} ${pieData[i].value}`;
              break;
            }
          }
          return formatStr;
        },
      },
      series: [
        {
          data: pieData,
          label: {
            normal: {
              formatter: `${countData}`,
            },
          },
        },
      ],
    });
  };

  // 警情数量柱状图
  showPoliceEchartBar = () => {
    const that = this;
    policeEchartBar = echarts.init(document.getElementById('jqsl'));
    const option =  {
      title: {
        text: '预警告警趋势分析',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'告警',
          type:'line',
          stack: '总量',
          data:[120, 132, 101, 134, 90, 230, 210, 234, 290, 330, 310]
        },
        {
          name:'预警',
          type:'line',
          stack: '总量',
          data:[220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90]
        },
      ]
    };
    ;
    policeEchartBar.setOption(option);
  };
  // 警情数量柱状图
  showSJCountEchartBar = () => {
    const that = this;
    sJCountEchartBar = echarts.init(document.getElementById('sjsl'));
    const option = {
      legend: {},
      tooltip: {},
      title: {
        text: '上传超期预警、上传超期告警',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
        padding: 8,
      },
      dataset: {
        source: [
          ['product', '接处警音视频', '询（讯）问音视频'],
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
        {type: 'bar',      itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
              ]),
            },
          },
        },
        {type: 'bar',itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#fed501' },
              ]),
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#fec300' },
              ]),
            },
          },},
      ]
    }
    sJCountEchartBar.setOption(option);
  };
  // 警情数量柱状图
  showScqkCountEchartBar = () => {
    const that = this;
    scqkCountEchartBar = echarts.init(document.getElementById('scqk'));
    const option = {
      title: {
        text: '音视频上传情况',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
        padding: 8,
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['已上传总数','未上传总数','总数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis : [
        {
          type: 'category',
          data : ['八类案件', '侵财案件', '两抢一盗']
        }
      ],
      xAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'已上传总数',
          type:'bar',
          data:[Math.floor(Math.random()*(100 - 1) + 1), Math.floor(Math.random()*(100 - 1) + 1),  Math.floor(Math.random()*(100 - 1) + 1)],
          itemStyle: {
            color: '#fed501',
          }
        },
        {
          name:'未上传总数',
          type:'bar',
          data:[ Math.floor(Math.random()*(100 - 1) + 1),  Math.floor(Math.random()*(100 - 1) + 1),  Math.floor(Math.random()*(100 - 1) + 1)],
          itemStyle: {
            color: '#188df0',
          }
        },
        {
          name:'总数',
          type:'bar',
          data:[ Math.floor(Math.random()*(200 - 100) + 100),  Math.floor(Math.random()*(200 - 100) + 100),  Math.floor(Math.random()*(200 - 100) + 100)],
          itemStyle: {
            color: '#40537e',
          }
        },

      ]
    };
    scqkCountEchartBar.setOption(option);
  };

  //处置结果环形饼状图
  showPoliceEchartRingPie = () => {
    policeEchartRingPie = echarts.init(document.getElementById('czjg'));
    const option = {
      title: {
        text: '单位上传超期预警统计',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
        padding: 8,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: '8%',
        top: '15%',
        show: true,
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        selectedMode: true, // 点击
        textStyle: {
          color: '#000',
          fontSize: 16,
          lineHeight: 24,
        },
        data: [],
      },
      series: [
        {
          name: '处置结果',
          type: 'pie',
          center: ['30%', '50%'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '22',
                color: '#66ccff',
              },
            },
            emphasis: {
              show: true,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [],
        },
      ],
    };
    policeEchartRingPie.setOption(option, true);
  };

  render() {
    const rowLayout = { md: 8, xl: 16, xxl: 24 };
    const colLayout = { sm: 24, lg: 12 };
    const { searchType, selectedDateVal, showDataView } = this.props;
    const {
      currentType,
      beforeLastData,
      lastData,
      nowData,
      jqzkNoData,
      jqslNoData,
      selectedDateData,
    } = this.state;
    return (
      <div
        className={styles.policeDataView}
        style={showDataView === '0' ? {} : { display:'none' }}
      >
        <Row gutter={rowLayout} className={styles.listPageRow}>
          <Col {...colLayout}>
            <div id="sjsl" className={styles.cardBox} />
          </Col>
          <Col {...colLayout}>
            <div id="czjg" className={styles.cardBox} />
          </Col>
        </Row>
        <Row gutter={rowLayout} className={styles.listPageRow}>
          <Col span={24}>
            <div id="jqsl" className={styles.cardBox} />
          </Col>
        </Row>
        <Row gutter={rowLayout} className={styles.listPageRow}>
          <Col span={24}>
            <div id="scqk" className={styles.cardBox} />
          </Col>
        </Row>
      </div>
    );
  }
}

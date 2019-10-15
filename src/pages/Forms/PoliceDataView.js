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
const colors1 = ['#259DF4', '#40537E', '#EDB59C', '#FED501', '#3074B5', '#72C4B8', '#3FC228', '#FFD205', '#FB1241', '#6465FD', '#FF6600'];

export default class PoliceDataView extends PureComponent {
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
            'today': '0',
            'lastDay': '1',
            'beforeLastDay': '2',
            'week': '3',
            'lastWeek': '4',
            'beforeLastWeek': '5',
            'month': '6',
            'lastMonth': '7',
            'beforeLastMonth': '8',
        },
        jqzkNoData: false, // 警情状况无数据
        jqslNoData: false, // 警情数量无数据
    };

    componentDidMount() {
        const {jjdw, searchType} = this.props;
        this.showPoliceEchartBar();
        this.getPoliceSituationCount(jjdw, searchType);
        this.showPoliceEchartRingPie();
        this.getHandleResult(jjdw, searchType);
        this.showSJCountEchartBar();
        this.getSJCount(jjdw, searchType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if(this.props !== nextProps){
                console.log('this.props--------', this.props)
                console.log('nextProps--------', nextProps)
                const {jjdw, searchType} = nextProps;
                this.getPoliceSituationCount(jjdw, searchType);
                this.getHandleResult(jjdw, searchType);
                this.getSJCount(jjdw, searchType);
            }
        }
    }


    getTime = (type) => {
        const time = getTimeDistance(type);
        const startTime = time[0] === '' ? '' : moment(time[0]).format('YYYY-MM-DD');
        const endTime = time[1] === '' ? '' : moment(time[1]).format('YYYY-MM-DD');
        return [startTime, endTime];
    };


    // 警情数量
    getPoliceSituationCount = (jjdw, searchType) => {

        let barData;
        const xData = ['现场调解', '报立普通刑事案件', '受理为其他行政案件', '报立经侦刑事案件', '报立涉毒刑事案件', '受理为治安案件', '其他案件'];
        const dataShadow = [500,500,500,500,500,500,500];
        if(jjdw === '150621000000') {
            if(searchType === 'day'){
                barData = [0,100,98,15,85,101,50];
            } else {
                barData = [0,320,168,115,485,311,255];
            }
        }else {
            if(searchType === 'day'){
                barData = [0,70,28,5,35,61,18];
            } else {
                barData = [40,210,138,221,156,321,109];
            }
        }

        policeEchartBar.setOption({
            xAxis: {
                data: xData,
            },
            series: [{
                data: dataShadow,
            }, {
                data: barData,
            }],
        });
    };
    getSJCount = (jjdw, searchType) => {
        let barData;
        const xData = ['案件审结数', '遗留数'];
        const dataShadow = [1500,1500];
        if(jjdw === '150621000000') {
            if(searchType === 'day'){
                barData = [200,87];
            } else {
                barData = [1103,789];
            }
        }else {
            if(searchType === 'day'){
                barData = [143,62];
            } else {
                barData = [960,674];
            }
        }

        sJCountEchartBar.setOption({
            xAxis: {
                data: xData,
            },
            series: [{
                data: dataShadow,
            }, {
                data: barData,
            }],
        });
    }
    // 处置结果
    getHandleResult = (jjdw, searchType) => {
        const legendData = ['盗窃案督办反馈', '抢劫案督办反馈', '醉驾案督办反馈', '其他案件督办反馈'];
        let pieData;
        if(jjdw === '150621000000') {
            if(searchType === 'day'){
                pieData = [
                    {
                        name: '盗窃案督办反馈',
                        value: '30',
                        itemStyle: {
                            color: colors1[0],
                        },
                    },
                    {
                        name: '抢劫案督办反馈',
                        value: '59',
                        itemStyle: {
                            color: colors1[1],
                        },
                    },
                    {
                        name: '醉驾案督办反馈',
                        value: '19',
                        itemStyle: {
                            color: colors1[2],
                        },
                    },
                    {
                        name: '其他案件督办反馈',
                        value: '70',
                        itemStyle: {
                            color: colors1[3],
                        },
                    },
                ];
            } else {
                pieData = [
                    {
                        name: '盗窃案督办反馈',
                        value: '433',
                        itemStyle: {
                            color: colors1[0],
                        },
                    },
                    {
                        name: '抢劫案督办反馈',
                        value: '859',
                        itemStyle: {
                            color: colors1[1],
                        },
                    },
                    {
                        name: '醉驾案督办反馈',
                        value: '671',
                        itemStyle: {
                            color: colors1[2],
                        },
                    },
                    {
                        name: '其他案件督办反馈',
                        value: '170',
                        itemStyle: {
                            color: colors1[3],
                        },
                    },
                ];
            }
        }else {
            if(searchType === 'day'){
                pieData = [
                    {
                        name: '盗窃案督办反馈',
                        value: '15',
                        itemStyle: {
                            color: colors1[0],
                        },
                    },
                    {
                        name: '抢劫案督办反馈',
                        value: '26',
                        itemStyle: {
                            color: colors1[1],
                        },
                    },
                    {
                        name: '醉驾案督办反馈',
                        value: '8',
                        itemStyle: {
                            color: colors1[2],
                        },
                    },
                    {
                        name: '其他案件督办反馈',
                        value: '34',
                        itemStyle: {
                            color: colors1[3],
                        },
                    },
                ];
            } else {
                pieData = [
                    {
                        name: '盗窃案督办反馈',
                        value: '89',
                        itemStyle: {
                            color: colors1[0],
                        },
                    },
                    {
                        name: '抢劫案督办反馈',
                        value: '138',
                        itemStyle: {
                            color: colors1[1],
                        },
                    },
                    {
                        name: '醉驾案督办反馈',
                        value: '96',
                        itemStyle: {
                            color: colors1[2],
                        },
                    },
                    {
                        name: '其他案件督办反馈',
                        value: '378',
                        itemStyle: {
                            color: colors1[3],
                        },
                    },
                ];
            }
        }

        let countData = 0;
        for(let i=0;i<pieData.length;i++){
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
            series: [{
                data: pieData,
                label: {
                    normal: {
                        formatter: `${countData}`,
                    },
                },
            }],
        });

    };

    // 警情数量柱状图
    showPoliceEchartBar = () => {
        const that = this;
        policeEchartBar = echarts.init(document.getElementById('jqsl'));
        const option = {
            color: ['#3398DB'],
            title: {
                text: '警情分配结果占比',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                },
                padding: 8,
            },
            xAxis: {
                type: 'category',
                axisLine: { show: false },
                data: [],
                axisTick: {
                    alignWithLabel: true,
                    interval: 0,
                },
                axisLabel: {
                    interval: 0,
                },
            },
            yAxis: {
                taxisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                },
            },
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(0,0,0,0)' },
                        emphasis: { color: 'rgba(0,0,0,0.05)' },
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: [],
                    animation: false,
                },
                {
                    type: 'bar',
                    // barWidth: '60%',
                    data: [],
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            textStyle: {
                                fontSize: 16,
                                color: '#000',
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' },
                                ],
                            ),
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' },
                                ],
                            ),
                        },
                    },
                },
            ],
        };
        policeEchartBar.setOption(option);
    };
    // 警情数量柱状图
    showSJCountEchartBar = () => {
        const that = this;
        sJCountEchartBar = echarts.init(document.getElementById('sjsl'));
        const option = {
            color: ['#3398DB'],
            title: {
                text: '案件审结数、遗留数',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                },
                padding: 8,
            },
            xAxis: {
                type: 'category',
                axisLine: { show: false },
                data: [],
                axisTick: {
                    alignWithLabel: true,
                    interval: 0,
                },
                axisLabel: {
                    interval: 0,
                },
            },
            yAxis: {
                taxisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                },
            },
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(0,0,0,0)' },
                        emphasis: { color: 'rgba(0,0,0,0.05)' },
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: [],
                    animation: false,
                },
                {
                    type: 'bar',
                    // barWidth: '60%',
                    data: [],
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            textStyle: {
                                fontSize: 16,
                                color: '#000',
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' },
                                ],
                            ),
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' },
                                ],
                            ),
                        },
                    },
                },
            ],
        };
        sJCountEchartBar.setOption(option);
    };
    //处置结果环形饼状图
    showPoliceEchartRingPie = () => {
        policeEchartRingPie = echarts.init(document.getElementById('czjg'));
        const option = {
            title: {
                text: '督办反馈',
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
        const { searchType, selectedDateVal } = this.props;
        const { currentType, beforeLastData, lastData, nowData, jqzkNoData, jqslNoData, selectedDateData } = this.state;
        return (
            <div className={styles.policeDataView}>
                <Row gutter={rowLayout} className={styles.listPageRow}>
                    <Col {...colLayout}>
                        <div id="sjsl" className={styles.cardBox}></div>
                    </Col>
                    <Col {...colLayout}>
                        <div id="czjg" className={styles.cardBox}></div>
                    </Col>
                </Row>
                <Row gutter={rowLayout} className={styles.listPageRow}>
                    <Col span={24}>
                        <div id="jqsl" className={styles.cardBox}></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

// 数据统计
import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Tabs,
  Select,
  Table,
  Form,
  Input,
  DatePicker,
  Button,
  Tag,
  Tooltip,
  Radio,
} from 'antd';
import classNames from 'classnames';
import { gaoJingGuanLi } from './test';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
import {
  G2,
  Chart,
  Geom,
  Axis,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import { Pie } from '../../components/Charts';
const { Line } = Guide;
import { DataView } from '@antv/data-set';

const da1 = [
  {
    '星期一.': 10,
    '星期二.': 6,
    '星期三.': 14,
    '星期四.': 5,
    '星期五.': 8,
    '星期六.': 19,
    '星期日.': 17,
    name: '入库',
  },
  {
    '星期一.': 5,
    '星期二.': 6,
    '星期三.': 9,
    '星期四.': 5,
    '星期五.': 10,
    '星期六.': 2,
    '星期日.': 20,
    name: '出库',
  },
];
const da2 = ['星期一.', '星期二.', '星期三.', '星期四.', '星期五.', '星期六.', '星期日.'];
const da3 = [
  {
    month: '星期一',
    city: '出库',
    revenue: 5,
  },
  {
    month: '星期一',
    city: '入库',
    revenue: 10,
  },
  {
    month: '星期二',
    city: '出库',
    revenue: 6,
  },
  {
    month: '星期二',
    city: '入库',
    revenue: 14,
  },
  {
    month: '星期三',
    city: '出库',
    revenue: 9,
  },
  {
    month: '星期三',
    city: '入库',
    revenue: 5,
  },
  {
    month: '星期四',
    city: '出库',
    revenue: 5,
  },
  {
    month: '星期四',
    city: '入库',
    revenue: 8,
  },
  {
    month: '星期五',
    city: '出库',
    revenue: 10,
  },
  {
    month: '星期五',
    city: '入库',
    revenue: 19,
  },
  {
    month: '星期六',
    city: '出库',
    revenue: 2,
  },
  {
    month: '星期六',
    city: '入库',
    revenue: 12,
  },
  {
    month: '星期日',
    city: '出库',
    revenue: 20,
  },
  {
    month: '星期日',
    city: '入库',
    revenue: 17,
  },
];
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
@Form.create()
class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'zhe',
      time: da2,
      zhuData: da1,
      dataList: da3,
      rediovalue: 'a',
    };
  }

  onChange = e => {
    let dataList = [];
    let time = [];
    let zhuData = [];
    if (e.target.value === 'a') {
      if (this.state.type === 'zhe') {
        dataList = [
          {
            month: '星期一',
            city: '出库',
            revenue: 5,
          },
          {
            month: '星期一',
            city: '入库',
            revenue: 10,
          },
          {
            month: '星期二',
            city: '出库',
            revenue: 6,
          },
          {
            month: '星期二',
            city: '入库',
            revenue: 14,
          },
          {
            month: '星期三',
            city: '出库',
            revenue: 9,
          },
          {
            month: '星期三',
            city: '入库',
            revenue: 5,
          },
          {
            month: '星期四',
            city: '出库',
            revenue: 5,
          },
          {
            month: '星期四',
            city: '入库',
            revenue: 8,
          },
          {
            month: '星期五',
            city: '出库',
            revenue: 10,
          },
          {
            month: '星期五',
            city: '入库',
            revenue: 19,
          },
          {
            month: '星期六',
            city: '出库',
            revenue: 2,
          },
          {
            month: '星期六',
            city: '入库',
            revenue: 12,
          },
          {
            month: '星期日',
            city: '出库',
            revenue: 20,
          },
          {
            month: '星期日',
            city: '入库',
            revenue: 17,
          },
        ];
      } else {
        zhuData = [
          {
            '星期一.': 10,
            '星期二.': 6,
            '星期三.': 14,
            '星期四.': 5,
            '星期五.': 8,
            '星期六.': 19,
            '星期日.': 17,
            name: '入库',
          },
          {
            '星期一.': 5,
            '星期二.': 6,
            '星期三.': 9,
            '星期四.': 5,
            '星期五.': 10,
            '星期六.': 2,
            '星期日.': 20,
            name: '出库',
          },
        ];
        time = ['星期一.', '星期二.', '星期三.', '星期四.', '星期五.', '星期六.', '星期日.'];
      }
    } else if (e.target.value === 'b') {
      if (this.state.type === 'zhe') {
        dataList = [
          {
            month: '1',
            city: '出库',
            revenue: 5,
          },
          {
            month: '1',
            city: '入库',
            revenue: 10,
          },
          {
            month: '2',
            city: '出库',
            revenue: 6,
          },
          {
            month: '2',
            city: '入库',
            revenue: 14,
          },
          {
            month: '3',
            city: '出库',
            revenue: 9,
          },
          {
            month: '3',
            city: '入库',
            revenue: 5,
          },
          {
            month: '4',
            city: '出库',
            revenue: 5,
          },
          {
            month: '4',
            city: '入库',
            revenue: 8,
          },
          {
            month: '5',
            city: '出库',
            revenue: 10,
          },
          {
            month: '5',
            city: '入库',
            revenue: 19,
          },
          {
            month: '6',
            city: '出库',
            revenue: 2,
          },
          {
            month: '6',
            city: '入库',
            revenue: 12,
          },
          {
            month: '7',
            city: '出库',
            revenue: 20,
          },
          {
            month: '7',
            city: '入库',
            revenue: 17,
          },
          {
            month: '8',
            city: '出库',
            revenue: 9,
          },
          {
            month: '8',
            city: '入库',
            revenue: 16,
          },
          {
            month: '9',
            city: '出库',
            revenue: 15,
          },
          {
            month: '9',
            city: '入库',
            revenue: 14,
          },
          {
            month: '10',
            city: '出库',
            revenue: 13,
          },
          {
            month: '10',
            city: '入库',
            revenue: 10,
          },
          {
            month: '11',
            city: '出库',
            revenue: 6,
          },
          {
            month: '11',
            city: '入库',
            revenue: 6,
          },
          {
            month: '12',
            city: '出库',
            revenue: 9,
          },
          {
            month: '12',
            city: '入库',
            revenue: 22,
          },
          {
            month: '13',
            city: '出库',
            revenue: 5,
          },
          {
            month: '13',
            city: '入库',
            revenue: 10,
          },
          {
            month: '14',
            city: '出库',
            revenue: 6,
          },
          {
            month: '14',
            city: '入库',
            revenue: 14,
          },
          {
            month: '15',
            city: '出库',
            revenue: 9,
          },
          {
            month: '15',
            city: '入库',
            revenue: 5,
          },
          {
            month: '16',
            city: '出库',
            revenue: 5,
          },
          {
            month: '16',
            city: '入库',
            revenue: 8,
          },
          {
            month: '17',
            city: '出库',
            revenue: 10,
          },
          {
            month: '17',
            city: '入库',
            revenue: 19,
          },
          {
            month: '18',
            city: '出库',
            revenue: 2,
          },
          {
            month: '18',
            city: '入库',
            revenue: 12,
          },
          {
            month: '19',
            city: '出库',
            revenue: 20,
          },
          {
            month: '19',
            city: '入库',
            revenue: 17,
          },
          {
            month: '20',
            city: '出库',
            revenue: 9,
          },
          {
            month: '20',
            city: '入库',
            revenue: 16,
          },
          {
            month: '21',
            city: '出库',
            revenue: 15,
          },
          {
            month: '21',
            city: '入库',
            revenue: 14,
          },
          {
            month: '22',
            city: '出库',
            revenue: 13,
          },
          {
            month: '22',
            city: '入库',
            revenue: 10,
          },
          {
            month: '23',
            city: '出库',
            revenue: 6,
          },
          {
            month: '23',
            city: '入库',
            revenue: 6,
          },
          {
            month: '24',
            city: '出库',
            revenue: 9,
          },
          {
            month: '24',
            city: '入库',
            revenue: 22,
          },
          {
            month: '25',
            city: '出库',
            revenue: 10,
          },
          {
            month: '25',
            city: '入库',
            revenue: 19,
          },
          {
            month: '26',
            city: '出库',
            revenue: 2,
          },
          {
            month: '26',
            city: '入库',
            revenue: 12,
          },
          {
            month: '27',
            city: '出库',
            revenue: 20,
          },
          {
            month: '27',
            city: '入库',
            revenue: 17,
          },
          {
            month: '28',
            city: '出库',
            revenue: 9,
          },
          {
            month: '28',
            city: '入库',
            revenue: 16,
          },
          {
            month: '29',
            city: '出库',
            revenue: 15,
          },
          {
            month: '29',
            city: '入库',
            revenue: 14,
          },
          {
            month: '30',
            city: '出库',
            revenue: 13,
          },
          {
            month: '30',
            city: '入库',
            revenue: 10,
          },
          {
            month: '31',
            city: '出库',
            revenue: 6,
          },
          {
            month: '31',
            city: '入库',
            revenue: 6,
          },
        ];
      } else {
        zhuData = [
          {
            '1.': 5,
            '2.': 6,
            '3.': 8,
            '4.': 12,
            '5.': 14,
            '6.': 6,
            '7.': 4,
            '8.': 9,
            '9.': 15,
            '10.': 7,
            '11.': 9,
            '12.': 1,
            '13.': 4,
            '14.': 13,
            '15.': 17,
            '16.': 24,
            '17.': 14,
            '18.': 3,
            '19.': 15,
            '20.': 27,
            '21.': 22,
            '22.': 2,
            '23.': 7,
            '24.': 3,
            '25.': 1,
            '26.': 17,
            '27.': 21,
            '28.': 11,
            '29.': 9,
            '30.': 12,
            '31.': 4,
            name: '入库',
          },
          {
            '1.': 3,
            '2.': 14,
            '3.': 6,
            '4.': 25,
            '5.': 2,
            '6.': 12,
            '7.': 7,
            '8.': 8,
            '9.': 3,
            '10.': 11,
            '11.': 27,
            '12.': 3,
            '13.': 4,
            '14.': 19,
            '15.': 24,
            '16.': 5,
            '17.': 16,
            '18.': 22,
            '19.': 19,
            '20.': 2,
            '21.': 11,
            '22.': 5,
            '23.': 17,
            '24.': 2,
            '25.': 1,
            '26.': 1,
            '27.': 18,
            '28.': 22,
            '29.': 1,
            '30.': 17,
            '31.': 3,
            name: '出库',
          },
        ];
        time = [
          '1.',
          '2.',
          '3.',
          '4.',
          '5.',
          '6.',
          '7.',
          '8.',
          '9.',
          '10.',
          '11.',
          '12.',
          '13.',
          '14.',
          '15.',
          '16.',
          '17.',
          '18.',
          '19.',
          '20.',
          '21.',
          '22.',
          '23.',
          '24.',
          '25.',
          '26.',
          '27.',
          '28.',
          '29.',
          '30.',
          '31.',
        ];
      }
    } else if (e.target.value === 'c') {
      if (this.state.type === 'zhe') {
        dataList = [
          {
            month: '1月',
            city: '出库',
            revenue: 5,
          },
          {
            month: '1月',
            city: '入库',
            revenue: 10,
          },
          {
            month: '2月',
            city: '出库',
            revenue: 6,
          },
          {
            month: '2月',
            city: '入库',
            revenue: 14,
          },
          {
            month: '3月',
            city: '出库',
            revenue: 9,
          },
          {
            month: '3月',
            city: '入库',
            revenue: 5,
          },
          {
            month: '4月',
            city: '出库',
            revenue: 5,
          },
          {
            month: '4月',
            city: '入库',
            revenue: 8,
          },
          {
            month: '5月',
            city: '出库',
            revenue: 10,
          },
          {
            month: '5月',
            city: '入库',
            revenue: 19,
          },
          {
            month: '6月',
            city: '出库',
            revenue: 2,
          },
          {
            month: '6月',
            city: '入库',
            revenue: 12,
          },
          {
            month: '7月',
            city: '出库',
            revenue: 20,
          },
          {
            month: '7月',
            city: '入库',
            revenue: 17,
          },
          {
            month: '8月',
            city: '出库',
            revenue: 9,
          },
          {
            month: '8月',
            city: '入库',
            revenue: 16,
          },
          {
            month: '9月',
            city: '出库',
            revenue: 15,
          },
          {
            month: '9月',
            city: '入库',
            revenue: 14,
          },
          {
            month: '10月',
            city: '出库',
            revenue: 13,
          },
          {
            month: '10月',
            city: '入库',
            revenue: 10,
          },
          {
            month: '11月',
            city: '出库',
            revenue: 6,
          },
          {
            month: '11月',
            city: '入库',
            revenue: 6,
          },
          {
            month: '12月',
            city: '出库',
            revenue: 9,
          },
          {
            month: '12月',
            city: '入库',
            revenue: 22,
          },
        ];
      } else {
        zhuData = [
          {
            '1月.': 21,
            '2月.': 5,
            '3月.': 11,
            '4月.': 18,
            '5月.': 12,
            '6月.': 18,
            '7月.': 21,
            '8月.': 1,
            '9月.': 11,
            '10月.': 18,
            '11月.': 17,
            '12月.': 21,
            name: '入库',
          },
          {
            '1月.': 14,
            '2月.': 2,
            '3月.': 1,
            '4月.': 1,
            '5月.': 18,
            '6月.': 5,
            '7月.': 17,
            '8月.': 12,
            '9月.': 9,
            '10月.': 12,
            '11月.': 18,
            '12月.': 2,
            name: '出库',
          },
        ];
        time = [
          '1月.',
          '2月.',
          '3月.',
          '4月.',
          '5月.',
          '6月.',
          '7月.',
          '8月.',
          '9月.',
          '10月.',
          '11月.',
          '12月.',
        ];
      }
    }
    this.setState({
      dataList,
      time,
      zhuData,
      rediovalue: e.target.value,
    });
  };
  ontypeChange = e => {
    this.setState({
      type: e.target.value,
    });
    if (e.target.value === 'zhe') {
      this.setState({
        dataList: da3,
        rediovalue: 'a',
      });
    } else {
      this.setState({
        zhuData: da1,
        time: da2,
        rediovalue: 'a',
      });
    }
  };
  render() {
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    // 种类数据
    let dataPie1 = [
      {
        x: '一般物品',
        y: 55,
      },
      {
        x: '毒品违禁品',
        y: 12,
      },
      {
        x: '涉案车辆',
        y: 17,
      },
    ];
    // 案件类型
    let dataPie2 = [
      {
        x: '刑事案件',
        y: 52,
      },
      {
        x: '行政案件',
        y: 32,
      },
    ];
    // 财物状态
    let dataPie3 = [
      {
        x: '在库',
        y: 44,
      },
      {
        x: '出库',
        y: 40,
      },
    ];
    // 柱状图
    const data = this.state.zhuData;
    const dv = new DataView();
    if (data && data.length > 0) {
      dv.source(data).transform({
        type: 'fold',
        fields: this.state.time,
        // 展开字段集
        key: '时间',
        // key字段
        value: '数量', // value字段
      });
    }
    let defaultColors = ['#3AA0FF', '#36CBCB'];
    return (
      <div>
        <Row gutter={{ md: 44, lg: 44, xl: 44 }} type="flex" style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Row
              style={{
                textAlign: 'center',
                fontSize: '24px',
                background: '#975fe4',
                color: '#fff',
              }}
            >
              <p />
              <p>本月入库</p>
              <p>317</p>
            </Row>
          </Col>
          <Col span={8}>
            <Row
              style={{
                textAlign: 'center',
                fontSize: '24px',
                background: '#975fe4',
                color: '#fff',
              }}
            >
              <p />
              <p>本月出库</p>
              <p>285</p>
            </Row>
          </Col>
          <Col span={8}>
            <Row
              style={{
                textAlign: 'center',
                fontSize: '24px',
                background: '#975fe4',
                color: '#fff',
              }}
            >
              <p />
              <p>存储数量</p>
              <p>32</p>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginBottom: 24 }}>
          <Row style={{ background: '#fff', padding: '24px 20px' }}>
            <Radio.Group onChange={this.ontypeChange} value={this.state.type}>
              <Radio.Button value="zhe">折线图</Radio.Button>
              <Radio.Button value="zhu">柱状图</Radio.Button>
            </Radio.Group>
          </Row>
          <Card
            title={'物品出入库情况'}
            extra={
              <Radio.Group onChange={this.onChange} value={this.state.rediovalue}>
                <Radio.Button value="a">本周</Radio.Button>
                <Radio.Button value="b">本月</Radio.Button>
                <Radio.Button value="c">本年</Radio.Button>
              </Radio.Group>
            }
          >
            {this.state.type === 'zhe' ? (
              <Chart height={300} data={this.state.dataList} scale={cols} forceFit>
                <Legend
                  textStyle={{
                    fontSize: '16', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                  }}
                />
                <Axis name="month" />
                <Axis
                  name="revenue"
                  label={{
                    formatter: val => `${val}`,
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom type="line" position="month*revenue" size={2} color={'city'} />
                <Geom
                  type="point"
                  position="month*revenue"
                  size={4}
                  shape={'circle'}
                  color={'city'}
                  style={{
                    stroke: '#fff',
                    lineWidth: 1,
                  }}
                />
              </Chart>
            ) : (
              <Chart height={300} data={dv} forceFit>
                <Axis name="时间" />
                <Axis name="数量" />
                <Legend
                  textStyle={{ fill: '#404040', fontSize: '16', fontWeight: '500' }}
                  offsetY={150}
                />
                <Tooltip
                // crosshairs={{
                //     type: "月均降雨量"
                // }}
                />
                <Geom
                  type="interval"
                  position="时间*数量"
                  // color={['#3AA0FF', '#36CBCB', '#F2637B']}
                  color={['name', defaultColors]}
                  adjust={[
                    {
                      type: 'dodge',
                      // marginRatio: 1 / 32,
                    },
                  ]}
                />
              </Chart>
            )}
          </Card>
        </Row>
        <Row gutter={{ md: 24, lg: 24, xl: 24 }} type="flex">
          <Col span={8}>
            <Card title={'财物种类情况'}>
              <Row style={{ height: 200 }}>
                <Pie
                  hasLegend
                  title={this.props.title}
                  subTitle={this.props.title}
                  total={dataPie1.reduce((pre, now) => now.y + pre, 0)}
                  data={dataPie1}
                  // valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                  height={200}
                  colors={
                    this.props.pieType == 'EQ'
                      ? ['#3AA0FF', '#36CBCB', '#F2637B', '#975FE4']
                      : ['#3AA0FF', '#36CBCB', '#F2637B']
                  }
                />
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={'案件类型情况'}>
              <Row style={{ height: 200 }}>
                <Pie
                  hasLegend
                  title={this.props.title}
                  subTitle={this.props.title}
                  total={dataPie2.reduce((pre, now) => now.y + pre, 0)}
                  data={dataPie2}
                  // valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                  height={200}
                  colors={
                    this.props.pieType == 'EQ'
                      ? ['#3AA0FF', '#36CBCB', '#F2637B', '#975FE4']
                      : ['#3AA0FF', '#36CBCB', '#F2637B']
                  }
                />
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={'财物状态情况'}>
              <Row style={{ height: 200 }}>
                <Pie
                  hasLegend
                  title={this.props.title}
                  subTitle={this.props.title}
                  total={dataPie3.reduce((pre, now) => now.y + pre, 0)}
                  data={dataPie3}
                  // valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                  height={200}
                  colors={
                    this.props.pieType == 'EQ'
                      ? ['#3AA0FF', '#36CBCB', '#F2637B', '#975FE4']
                      : ['#3AA0FF', '#36CBCB', '#F2637B']
                  }
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Error;

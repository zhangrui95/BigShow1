// 数据统计
import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect, } from 'dva';
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
  Radio
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

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
@Form.create()
class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [{
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
      },],
    }
  }


  onChange = (e) => {
    let dataList = [];
    if (e.target.value === 'a') {
      dataList = [{
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
      },]
    } else if (e.target.value === 'b') {
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
    } else if (e.target.value === 'c') {
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
    }
    this.setState({
      dataList,
    });
  }
  render () {

    const cols = {
      month: {
        range: [0, 1],
      },
    };
    // 种类数据
    let dataPie1 = [
      {
        x: "一般物品",
        y: 55
      },
      {
        x: "毒品违禁品",
        y: 12
      },
      {
        x: "涉案车辆",
        y: 17
      },
    ]
    // 案件类型
    let dataPie2 = [
      {
        x: "刑事案件",
        y: 52
      },
      {
        x: "行政案件",
        y: 32
      },

    ]
    // 财物状态
    let dataPie3 = [
      {
        x: "在库",
        y: 44
      },
      {
        x: "出库",
        y: 40
      },

    ]
    return (
      <div>
        <Row
          gutter={{ md: 44, lg: 44, xl: 44 }}
          type="flex"
          style={{ marginBottom: 24 }}
        >
          <Col span={8} >
            <Row style={{ textAlign: 'center', fontSize: '24px', background: '#975fe4', color: '#fff' }}>
              <p />
              <p>本月入库</p>
              <p>317</p>
            </Row>
          </Col>
          <Col span={8}>
            <Row style={{ textAlign: 'center', fontSize: '24px', background: '#975fe4', color: '#fff' }}>
              <p />
              <p>本月出库</p>
              <p>285</p>
            </Row>
          </Col>
          <Col span={8}>
            <Row style={{ textAlign: 'center', fontSize: '24px', background: '#975fe4', color: '#fff' }}>
              <p />
              <p>存储数量</p>
              <p>32</p>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginBottom: 24 }}>
          <Card title={'卷宗出入柜趋势图'}
            extra={
              <Radio.Group onChange={this.onChange} defaultValue="a">
                <Radio.Button value="a">本周</Radio.Button>
                <Radio.Button value="b">本月</Radio.Button>
                <Radio.Button value="c">本年</Radio.Button>

              </Radio.Group>
            }
          >
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
                  formatter: val => `${val}本`,
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
          </Card>
        </Row>
        <Row
          gutter={{ md: 24, lg: 24, xl: 24 }}
          type="flex"
        >
          <Col span={8}>
            <Card
              title={'财物种类情况'}
            >
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
            <Card
              title={'案件类型情况'}
            >
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
            <Card
              title={'财物状态情况'}
            >
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


// 卷宗-数据统计 by zhangying
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Row, Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
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
const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    //  折线图的数据
    const data = [
      {
        month: '1月',
        city: '出柜',
        revenue: 5,
      },
      {
        month: '1月',
        city: '入柜',
        revenue: 10,
      },
      {
        month: '2月',
        city: '出柜',
        revenue: 6,
      },
      {
        month: '2月',
        city: '入柜',
        revenue: 14,
      },
      {
        month: '3月',
        city: '出柜',
        revenue: 9,
      },
      {
        month: '3月',
        city: '入柜',
        revenue: 5,
      },
      {
        month: '4月',
        city: '出柜',
        revenue: 5,
      },
      {
        month: '4月',
        city: '入柜',
        revenue: 8,
      },
      {
        month: '5月',
        city: '出柜',
        revenue: 10,
      },
      {
        month: '5月',
        city: '入柜',
        revenue: 19,
      },
      {
        month: '6月',
        city: '出柜',
        revenue: 2,
      },
      {
        month: '6月',
        city: '入柜',
        revenue: 12,
      },
      {
        month: '7月',
        city: '出柜',
        revenue: 20,
      },
      {
        month: '7月',
        city: '入柜',
        revenue: 17,
      },
      {
        month: '8月',
        city: '出柜',
        revenue: 9,
      },
      {
        month: '8月',
        city: '入柜',
        revenue: 16,
      },
      {
        month: '9月',
        city: '出柜',
        revenue: 15,
      },
      {
        month: '9月',
        city: '入柜',
        revenue: 14,
      },
      {
        month: '10月',
        city: '出柜',
        revenue: 13,
      },
      {
        month: '10月',
        city: '入柜',
        revenue: 10,
      },
      {
        month: '11月',
        city: '出柜',
        revenue: 6,
      },
      {
        month: '11月',
        city: '入柜',
        revenue: 6,
      },
      {
        month: '12月',
        city: '出柜',
        revenue: 9,
      },
      {
        month: '12月',
        city: '入柜',
        revenue: 22,
      },
    ];
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    // 卷宗柜使用情况 饼状图
    const dataPie1 = [
      {
        x: '使用中',
        y: 40,
      },
      {
        x: '空闲',
        y: 21,
      },
    ];
    const dataPie2 = [
      {
        x: '已使用卷柜',
        y: 40,
      },
      {
        x: '未使用卷柜',
        y: 21,
      },
      {
        x: '卷柜总数',
        y: 61,
      },
    ];
    return (
      <div>
        <Row>
          <Card title={'卷宗出入柜趋势图'}>
            <Chart height={300} data={data} scale={cols} forceFit>
              <Legend />
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
          <Row
            gutter={{ md: 24, lg: 24, xl: 24 }}
            type="flex"
            justify="space-around"
            style={{ marginTop: 24 }}
          >
            <Col span={12}>
              <Card title={'卷宗柜使用与空闲情况'}>
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
              </Card>
            </Col>
            <Col span={12}>
              <Card title={'卷宗柜使用情况'}>
                <Row style={{ height: 200 }}>
                  <Pie
                    hasLegend
                    title={this.props.title}
                    subTitle={this.props.title}
                    // total={dataPie1.reduce((pre, now) => now.y + pre, 0)}
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
          </Row>
        </Row>
      </div>
    );
  }
}

export default BasicProfile;

import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Card, Carousel, Tooltip, Icon, Row, Col, List, Radio, Badge } from 'antd';
import { ChartCard, Pie, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import styles from './BasicList.less';

@connect()
class UsageSituation extends Component {
  state = {
    rightDateGroup: 'rightWeek',
  };


  componentDidMount() {
    this.scrollPx = 0;
    this.timetr = setInterval(() => {
      this.scrollPx += 1;

      const { scrollHeight } = this.refs.refList;
      if (this.scrollPx + 138 > scrollHeight) {
        this.refs.refList.scrollTo(0, 0);
        this.scrollPx = 0;
      } else {
        this.refs.refList.scrollTo(0, this.scrollPx);
      }
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.timetr);
  }

  renderContent = (item) => (
    <div>
      <div>姓名：{item.name}</div>
      <div>房间：{item.room}</div>
      <div>性别：男</div>
      <div>办案民警：{item.policeName}</div>
    </div>
  )

  // 单选日期改变时间
  radioChange = (e) => {
    const target = e.target.value;
    this.setState({
      rightDateGroup: target,
    });
  }

  render() {
    const data1 = [
      {
        name: '王东京',
        room: '询问室1',
        policeName: '张华、黎明'
      },
      {
        name: '孙立建',
        room: '询问室2',
        policeName: '张华、黎明'

      },
      {
        name: '刘利刚',
        room: '询问室3',
        policeName: '张华、黎明'

      },
      {
        name: '苏培科',
        room: '询问室4',
        policeName: '张华、黎明'

      },
      {
        name: '李青',
        room: '询问室3',
        policeName: '张华、黎明'

      },
      {
        name: '周明义',
        room: '询问室4',
        policeName: '张华、黎明'

      },
    ];

    const data2 = [
      {
        name: '程式实',
        room: '讯问室1',
        policeName: '张华、黎明'

      },
      {
        name: '陈建福',
        room: '讯问室2',
        policeName: '张华、黎明'

      },
      {
        name: '马忠平',
        room: '讯问室1',
        policeName: '张华、黎明'

      },
      {
        name: '宁陕',
        room: '讯问室2',
        policeName: '张华、黎明'

      },
      {
        name: '罗振宇',
        room: '讯问室1',
        policeName: '张华、黎明'

      },
      {
        name: '王占阳',
        room: '讯问室2',
        policeName: '张华、黎明'

      },
    ];

    const data3 = [
      {
        name: '何广文',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '周行检',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '刘振华',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '曹建伟',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '吴志峰',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '杨子云',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '钱雪峰',
        room: '候问室1',
        policeName: '张华、黎明'

      },
      {
        name: '沈青',
        room: '候问室1',
        policeName: '张华、黎明'

      },
    ];

    const { rightDateGroup } = this.state;
    const count = rightDateGroup === 'rightMonth' ? 145 : rightDateGroup === 'rightyear' ? 1250 : 12;
    const count2 = rightDateGroup === 'rightMonth' ? 137 : rightDateGroup === 'rightyear' ? 1236 : 10;
    const data4 = [
      '张德利入区',
      '李明进入人身安全检查室',
      '张小龙进入讯问室1',
      '李立伟离区',
      '张明入区',
      '凌淑华入区',
      '张夏荣离区',
      '李玉峰进入候问室',
      '李科离区',
    ];
    return (
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <Card title="空闲情况" bordered={false}>
              <Row>
                <Col span={8}>
                  <Pie
                    percent={25}
                    color="#68D288"
                    subTitle="候问室"
                    total="8/12"
                    height={140}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    percent={25}
                    color="#3AA0FE"
                    subTitle="询问室"
                    total="6/8"
                    height={140}
                  />
                </Col>
                <Col span={8}> <Pie
                  percent={25}
                  color="#F37A8E"
                  subTitle="讯问室"
                  total="4/6"
                  height={140}
                />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8} className={styles.week}>
            <Card
              bodyStyle={{ paddingTop: '17px' }}
              title="办案区人员统计"
              extra={
                <div>
                  <Radio.Group defaultValue="rightWeek" onChange={this.radioChange}>
                    <Radio.Button value="rightWeek">本周</Radio.Button>
                    <Radio.Button value="rightMonth">本月</Radio.Button>
                    <Radio.Button value="rightyear">本年</Radio.Button>
                  </Radio.Group>
                </div>
              }
            >
              <ChartCard
                // style={{ border: 0 }}
                title="入区总人数"
                avatar={
                  // <img
                  //   style={{ width: 56, height: 56 }}
                  //   src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                  //   alt="indicator"
                  // />
                  <Icon type="home" theme="filled" style={{ fontSize: '60px', color: '#1890FF' }} />
                }
                total={count}
                footer={<Field label="离区总人数" value={count2} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="最新动态"
              extra={
                <div>
                  <div>今日值班值班：张福</div>
                  {/* <div>当前在区人数：6</div> */}
                </div>
              }
            >

              <div span={24} style={{ height: '138px', overflow: 'hidden', fontSize: '18px' }} ref="refList">
                {
                  data4.map((item) => (
                    <div>
                      <Badge status="processing" />{item}
                    </div>
                  ))
                }
                {/* <List
                  ref="refList"
                  style={{ height: '138px', overflow: 'auto', fontSize: '16px' }}
                  size="small"
                  bordered
                  dataSource={data4}
                  renderItem={item => <List.Item> <Badge status="processing" />{item}</List.Item>}
                /> */}
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title="询问室（6/8人）" style={{ marginTop: '24px' }}>
              <List
                grid={{
                  gutter: 16,
                  column: 12,
                }}
                dataSource={data1}
                renderItem={item => (
                  <List.Item style={{ marginBottom: '0px' }}>
                    <Tooltip placement="bottomLeft" title={this.renderContent(item)}>
                      <img src={require('@/assets/person.png')} alt="" style={{ width: '100%' }} />
                    </Tooltip>
                    <div style={{ textAlign: 'center' }}>
                      {item.name}
                      <div>{item.room}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="讯问室（4/6人）" style={{ marginTop: '24px' }}>
              <List
                grid={{
                  gutter: 16,
                  column: 12,
                }}
                dataSource={data2}
                renderItem={item => (
                  <List.Item style={{ marginBottom: '0px' }}>
                    <Tooltip placement="bottomLeft" title={this.renderContent(item)}>
                      <img src={require('@/assets/person.png')} alt="" style={{ width: '100%' }} />
                    </Tooltip>
                    <div style={{ textAlign: 'center' }}>
                      {item.name}
                      <div>{item.room}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="候问室（8/12人）" style={{ marginTop: '24px' }}>
              <List
                grid={{
                  gutter: 16,
                  column: 12,
                }}
                dataSource={data3}
                renderItem={item => (
                  <List.Item style={{ marginBottom: '0px' }}>
                    <Tooltip placement="bottomLeft" title={this.renderContent(item)}>
                      <img src={require('@/assets/person.png')} alt="" style={{ width: '100%' }} />
                    </Tooltip>
                    <div style={{ textAlign: 'center' }}>
                      {item.name}
                      <div>{item.room}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UsageSituation;

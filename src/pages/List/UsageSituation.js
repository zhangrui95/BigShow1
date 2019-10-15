import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Card, Carousel, Tooltip, Icon, Row, Col, List, Radio } from 'antd';
import { ChartCard, Pie, Field } from '@/components/Charts';
import Trend from '@/components/Trend';

@connect()
class UsageSituation extends Component {
  state = {
    rightDateGroup: 'rightWeek',
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

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
                    total="2/10"
                    height={140}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    percent={25}
                    color="#3AA0FE"
                    subTitle="询问室"
                    total="2/10"
                    height={140}
                  />
                </Col>
                <Col span={8}> <Pie
                  percent={25}
                  color="#F37A8E"
                  subTitle="讯问室"
                  total="2/10"
                  height={140}
                />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
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
            <Card title="最新动态">
              <div>当值值班：张福</div>
              <div>当前在区人数：6</div>

            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title="询问室（0/3人）" style={{ marginTop: '24px' }}>
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

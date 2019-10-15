import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Card, Carousel, Tooltip, Icon, Row, Col, List } from 'antd';
import { ChartCard } from '@/components/Charts';
import Trend from '@/components/Trend'

@connect()
class UsageSituation extends Component {

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {

    const data = [
      {
        title: 'Title 1',
        name: '张三',
        room: '讯问室1'
      },
      {
        title: 'Title 2',
        name: '李四',
        room: '讯问室2'
      }
    ];
    return (
      <div>
        <Row>
          <Col span={12}>
            <ChartCard
              title="销售额"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={20}
              // footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
              contentHeight={46}
            >
              <span>
                周同比
                <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                  12%
                </Trend>
              </span>
              <span style={{ marginLeft: 16 }}>
                日环比
                <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                  11%
                </Trend>
              </span>
            </ChartCard>
          </Col>
          <Col span={12}>1111</Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card title="询问室（0/3人）">
              <List
                grid={{
                  gutter: 8,
                  column: 6
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <div>
                      <img src={require('@/assets/person.jpg')} alt="" style={{ width: '100%' }} />
                      <div style={{ textAlign: 'center' }}>
                        {item.name}
                        <div>{item.room}</div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="讯问室（0/3人）">
              <List
                grid={{
                  gutter: 8,
                  column: 6
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <div>
                      <img src={require('@/assets/person.jpg')} alt="" style={{ width: '100%' }} />
                      <div style={{ textAlign: 'center' }}>
                        {item.name}
                        <div>{item.room}</div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Card title="候问室（2/10人）">
          <List
            grid={{
              gutter: 8,
              column: 12
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <div>
                  <img src={require('@/assets/person.jpg')} alt="" style={{ width: '100%' }} />
                  <div style={{ textAlign: 'center' }}>
                    {item.name}
                    <div>{item.room}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
      // <Card>

      //   {/* <div>
      //     <Carousel dotPosition='top' autoplay>
      //       <div>
      //         <img src={require('@/assets/notice1.jpg')} alt="" style={{ width: '300px' }} />
      //       </div>
      //       <div>
      //         <img src={require('@/assets/notice2.jpg')} alt="" style={{ width: '300px' }} />
      //       </div>
      //     </Carousel>
      //   </div> */}
      // </Card>
    );
  }
}

export default UsageSituation;

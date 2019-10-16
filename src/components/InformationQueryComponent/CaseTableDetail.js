/*
* PersonTableDetail 嫌疑人详情
* author：jhm
* 20191016
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Steps, Table, List } from 'antd';
import Ellipsis from '../Ellipsis';
import styles from './PersonTableDetail.less';

import { autoheight } from '../../utils/utils';

const { Step } = Steps;

const thing = [{ name: '刀', num: 1, dw: '把', wgy: '陈某', bamj: '李人' }];

const book = [
  {
    name: '证据材料卷',
    time: '2019-01-05',
    bookBottom: [
      { bookBottomName: '受立案文书', bookBottomTime: '2019-01-01' },
      { bookBottomName: '判决书', bookBottomTime: '2019-01-06' },
    ],
  },
];

export default class CaseTableDetail extends PureComponent {
  state = {};

  componentDidMount() {}

  Topdetail() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <span style={{ margin: '16px', display: 'block' }}>案件详情</span>
          </Col>
        </Row>
      </div>
    );
  }

  renderDetail() {
    // const { caseDetails, loading } = this.state;
    const { record } = this.props;
    const rowLayout = { md: 8, xl: 24, xxl: 48 };
    const sswpColumns = [
      {
        title: '物品名称',
        dataIndex: 'name',
        render: text => {
          return text ? (
            <Ellipsis length={20} tooltip>
              {text}
            </Ellipsis>
          ) : (
            ''
          );
        },
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '单位',
        dataIndex: 'dw',
      },
      {
        title: '物管员',
        dataIndex: 'wgy',
      },
      {
        title: '办案民警',
        dataIndex: 'bamj',
      },
    ];
    const colLayout = { sm: 24, md: 12, xl: 8 };
    return (
      <div style={{ padding: '24px 0', background: '#F0F2F5', height: '1600px' }}>
        <div id="capture1">
          <div>
            <Card title="人员信息" className={styles.cardCharts} bordered={false} id="capture1">
              <div style={{ padding: 16 }}>
                <Row>
                  <Col md={2} sm={24}>
                    <div>
                      <img
                        src="../../../public/images/nophoto.png"
                        alt="暂无图片显示"
                        width="100%"
                      />
                    </div>
                  </Col>
                  <Col md={22} sm={24} style={{ paddingLeft: '24px' }}>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 24 }}>
                      <Col md={4} sm={24}>
                        <div className={styles.break}>
                          姓名：
                          {record.sary}
                        </div>
                      </Col>
                      <Col md={4} sm={24}>
                        <div className={styles.break}>
                          年龄：
                          {record.age}
                        </div>
                      </Col>
                      <Col md={4} sm={24}>
                        <div className={styles.break}>
                          性别：
                          {record.sex}
                        </div>
                      </Col>
                      <Col md={6} sm={24}>
                        <div className={styles.break}>
                          证件号：
                          {record.zjhm}
                        </div>
                      </Col>
                      <Col md={6} sm={24}>
                        <div className={styles.break}>
                          现阶段强制措施：
                          {record.qzcs}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: '24px' }}>
                      <Col md={12} sm={24}>
                        <div className={styles.break}>
                          现住址：
                          {record.address}
                        </div>
                      </Col>
                      <Col md={12} sm={24}>
                        <div className={styles.break}>
                          联系电话：
                          {record.phone}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
          <div>
            <div className={styles.title}>案件信息</div>
            <div className={styles.message} style={{ padding: '24px' }}>
              <Row gutter={rowLayout}>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件编号：</div>
                  <div className={styles.Indextail}>{record.ajbh}</div>
                </Col>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件名称：</div>
                  <div className={styles.Indextail}>{record.ajmc}</div>
                </Col>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件类别：</div>
                  <div className={styles.Indextail}>{record.ajlb}</div>
                </Col>
              </Row>
              <Row gutter={rowLayout}>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案发时段：</div>
                  <div className={styles.Indextail}>
                    2019-05-05 07：05：05~2019-05-05：09：09：09
                  </div>
                </Col>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案发地点：</div>
                  <div className={styles.Indextail}>{record.address}</div>
                </Col>
              </Row>
              <Row gutter={rowLayout}>
                <Col md={24} sm={24}>
                  <div className={styles.Indexfrom}>简要案情：</div>
                  <div className={styles.Indextail}>{record.jyaq}</div>
                </Col>
              </Row>

              <Card title={'案件流程'} style={{ width: '100%' }}>
                <Steps current={5}>
                  <Step
                    title={<span style={{ fontSize: 14 }}>受案</span>}
                    description="2019-05-01"
                  />
                  <Step
                    title={<span style={{ fontSize: 14 }}>立案</span>}
                    description="2019-05-02"
                  />
                  <Step
                    title={<span style={{ fontSize: 14 }}>破案</span>}
                    description="2019-05-03"
                  />
                  <Step
                    title={<span style={{ fontSize: 14 }}>撤案</span>}
                    description="2019-05-04"
                  />
                  <Step
                    title={<span style={{ fontSize: 14 }}>结案</span>}
                    description="2019-05-05"
                  />
                </Steps>
              </Card>
            </div>
          </div>
          <div>
            <Card title="涉案物品" className={styles.card} bordered={false}>
              <div className={styles.tabDiv}>
                <Table
                  size="middle"
                  style={{ backgroundColor: '#fff' }}
                  pagination={{
                    pageSize: 3,
                    showTotal: (total, range) => (
                      <div style={{ position: 'absolute', left: '12px' }}>
                        共 {total} 条记录 第 {this.state.sswpCurrent} / {Math.ceil(total / 3)} 页
                      </div>
                    ),
                    onChange: page => {
                      this.setState({ sswpCurrent: page });
                    },
                  }}
                  dataSource={thing}
                  columns={sswpColumns}
                />
              </div>
            </Card>
          </div>
          <div>
            <Card title="卷宗信息" className={styles.card} bordered={false}>
              <List
                itemLayout="vertical"
                size="small"
                pagination={
                  book.length > 0
                    ? {
                        size: 'small',
                        pageSize: 8,
                        showTotal: (total, range) => (
                          <div style={{ position: 'absolute', left: '12px' }}>
                            共 {total} 条记录 第 {this.state.gjCurrent} / {Math.ceil(total / 8)} 页
                          </div>
                        ),
                        onChange: page => {
                          this.setState({ gjCurrent: page });
                        },
                      }
                    : null
                }
                dataSource={book}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                }}
                className={styles.listItem}
                // style={{ color: '#faa' }}
                renderItem={item => (
                  <List.Item>
                    <div className={styles.blueItems}>
                      <div
                        className={styles.listItemContents}
                        style={{ backgroundColor: '#f3fbff', padding: 16 }}
                      >
                        <Row style={{ padding: '10px' }}>
                          <Col span={24}>
                            卷宗名称：
                            {item.name}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div>
                              <img className={styles.img1} width={60} height={60} />
                            </div>
                            <div>
                              文书名称：
                              {item.bookBottom[0].bookBottomName}
                            </div>
                            <div>
                              日期：
                              {item.bookBottom[0].bookBottomTime}
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <img className={styles.img1} width={60} height={60} />
                            </div>
                            <div>
                              文书名称：
                              {item.bookBottom[1].bookBottomName}
                            </div>
                            <div>
                              日期：
                              {item.bookBottom[0].bookBottomTime}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
          <div>
            <Card title="音频信息" className={styles.card} bordered={false}>
              <div className={styles.tabDiv}>
                <Row className={styles.contentRow} style={{ padding: '0 12px' }}>
                  <Col md={24} sm={24}>
                    <Row gutter={rowLayout}>
                      <Col {...colLayout}>
                        <div>接处警音视频</div>
                        <div>
                          <img className={styles.img} width={60} height={60} />
                        </div>
                      </Col>
                      <Col {...colLayout}>
                        <div>办案区视频</div>
                        <div>
                          <Steps progressDot current={3}>
                            <Step
                              title={<span style={{ fontSize: 14 }}>入区视频</span>}
                              description={<img className={styles.img} width={60} height={60} />}
                            />
                            <Step
                              title={<span style={{ fontSize: 14 }}>询讯问视频</span>}
                              description={<img className={styles.img} width={60} height={60} />}
                            />
                            <Step
                              title={<span style={{ fontSize: 14 }}>离区视频</span>}
                              description={<img className={styles.img} width={60} height={60} />}
                            />
                          </Steps>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.Topdetail()}</div>
        <div>{this.renderDetail()}</div>
      </div>
    );
  }
}

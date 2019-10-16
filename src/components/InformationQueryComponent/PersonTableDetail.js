/*
* PersonTableDetail 嫌疑人详情
* author：jhm
* 20191016
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Steps, message, Tabs, Button, Spin, Table, Icon, List } from 'antd';
import echarts from 'echarts/lib/echarts';
import tree from 'echarts/lib/chart/tree';
import tooltip from 'echarts/lib/component/tooltip';
import Ellipsis from '../Ellipsis';
import styles from './PersonTableDetail.less';

import { autoheight } from '../../utils/utils';

const { Step } = Steps;
const TabPane = Tabs.TabPane;
let echartTree;

const tarList = [
  { name: '任琴女', sex: '女', xyr_sfzh: '15272219830122556X', xszk: '9', xszk_name: '其他' },
  { name: '任琴女', sex: '女', xyr_sfzh: '15272219830122556X', xszk: '9', xszk_name: '其他' },
  { name: '刘玉莲', sex: '女', xyr_sfzh: '152722196705173648', xszk: '9', xszk_name: '其他' },
  { name: '崔文会', sex: '男', xyr_sfzh: '152722198412071831', xszk: '9', xszk_name: '其他' },
  { name: '张凤琴', sex: '女', xyr_sfzh: '152722197001225520', xszk: '9', xszk_name: '其他' },
  { name: '李克成', sex: '男', xyr_sfzh: '320922197810127833', xszk: '9', xszk_name: '其他' },
  { name: '李树青', sex: '女', xyr_sfzh: '152722197003090324', xszk: '9', xszk_name: '其他' },
  { name: '王三喜', sex: '男', xyr_sfzh: '152722197507075515', xszk: '9', xszk_name: '其他' },
  { name: '王勇', sex: '男', xyr_sfzh: '152722196911240012', xszk: '9', xszk_name: '其他' },
  { name: '王清莲', sex: '女', xyr_sfzh: '152722197210032725', xszk: '9', xszk_name: '其他' },
  { name: '苏丽', sex: '女', xyr_sfzh: '152722197709243628', xszk: '9', xszk_name: '其他' },
  { name: '郝翠连', sex: '女', xyr_sfzh: '152722197410215526', xszk: '9', xszk_name: '其他' },
];

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

const thing = [{ name: '刀', num: 1, dw: '把', wgy: '陈某', bamj: '丽人' }];

const data = {
  name: '刘玉莲',
  children: [
    {
      name: '刘玉莲为赌博提供便利条件',
      children: [
        {
          name: '历史入去信息',
        },
        {
          name: '同案人',
          children: [
            { name: '任琴女', value: 3938 },
            { name: '刘玉莲', value: 3812 },
            { name: '崔文辉', value: 6714 },
            { name: '李克成', value: 743 },
          ],
        },
        {
          name: '行政处罚记录',
          children: [{ name: '罚款100元', value: 3534 }, { name: '罚款200元', value: 5731 }],
        },
        {
          name: '强制措施记录',
        },
        {
          name: '随身物品',
        },
        {
          name: '涉案物品',
        },
        {
          name: '相关卷宗',
        },
      ],
    },
  ],
};
export default class PersonTableDetail extends PureComponent {
  state = {
    // personData: '',
    // loading: false, // 默认详情页是否为加载状态
  };

  componentDidMount() {
    this.showEchart();
  }

  showEchart = () => {
    echartTree = echarts.init(document.getElementById('ryRegulateTree'));
    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',

          data: [data],

          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',

          symbolSize: 7,

          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9,
            },
          },

          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
    echartTree.setOption(option);
  };

  // 同案人List
  showTarList = () => {
    return (
      <List
        itemLayout="vertical"
        size="small"
        pagination={
          tarList.length > 0
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
        dataSource={tarList}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
        }}
        className={styles.listItem}
        style={{ color: '#faa' }}
        renderItem={item => (
          <List.Item>
            <div className={styles.blueItems}>
              <div className={styles.listItemContents}>
                <Row style={{ padding: '10px' }}>
                  <Col span={12}>
                    姓名：
                    {item.name}
                  </Col>
                  <Col span={8}>
                    性别：
                    {item.sex}
                  </Col>
                  <Col span={4}>
                    <span
                      className={
                        item.xszk_name && item.xszk_name === '在逃' ? styles.tag : styles.tagBlue
                      }
                    >
                      {item.xszk_name ? item.xszk_name : '未知'}
                    </span>
                  </Col>
                </Row>
                <Row style={{ padding: '10px' }}>
                  <Col span={24}>
                    证件号：
                    {item.xyr_sfzh}
                  </Col>
                </Row>
              </div>
              <div className={styles.operationButton}>查看</div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  render() {
    // const { personData, loading } = this.state;
    const { record } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, md: { span: 8 }, xl: { span: 6 }, xxl: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, md: { span: 16 }, xl: { span: 18 }, xxl: { span: 20 } },
    };
    const rowLayout = { md: 8, xl: 16, xxl: 24 };
    const colLayout = { sm: 24, md: 12, xl: 8 };
    // 卷宗表头
    const JzColumns = [
      {
        title: '卷宗名称',
        dataIndex: 'jzmc',
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
        title: '卷宗类别',
        dataIndex: 'jzlb_mc',
      },
      {
        title: '存储状态',
        dataIndex: 'cczt_mc',
      },
      {
        title: '卷宗页数',
        dataIndex: 'jzys',
      },
      {
        title: '电子化',
        dataIndex: 'is_gldzj',
      },
      // {
      //   title: '操作',
      //   width: 50,
      //   render: (record) => (
      //     <div>
      //       <a onClick={() => this.props.JzDetail(record)}>查看</a>
      //     </div>
      //   ),
      // },
    ];
    // 随身物品表头
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
    return (
      <div>
        <div style={{ backgroundColor: '#fff' }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <span style={{ margin: '16px', display: 'block' }}>嫌疑人详情</span>
            </Col>
            <Col md={8} />

            {/*<Col md={8} sm={24}>*/}
            {/*<Button type='primary' style={{ margin: '10px', float: 'right' }}*/}
            {/*onClick={() => this.ExportStatistics()}>导出</Button>*/}
            {/*</Col>*/}
          </Row>
        </div>
        <div
          style={{ padding: '24px 0', background: '#F0F2F5' }}
          // className={styles.detailBoxScroll}
        >
          <div>
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
                            {record ? record.sary : ''}
                          </div>
                        </Col>
                        <Col md={4} sm={24}>
                          <div className={styles.break}>
                            年龄：
                            {record ? record.age : ''}
                          </div>
                        </Col>
                        <Col md={4} sm={24}>
                          <div className={styles.break}>
                            性别：
                            {record.ryxb}
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
              <Card title="关系图谱" className={styles.cardCharts} bordered={false}>
                <div id="ryRegulateTree" style={{ height: '600px', width: '100%' }} />
              </Card>
            </div>
            <Card title="涉案信息" className={styles.cardCharts} bordered={false}>
              <div style={{ padding: 16 }} className={styles.personTab} ref="stepRef">
                <div className="NameShow">
                  <Tabs type="card" tabBarGutter={8} className="tabName">
                    <TabPane tab="赌博案" key="1" forceRender className="Namesaxx1">
                      <div className={styles.tabDiv}>
                        <Row className={styles.contentRow}>
                          <Col md={6} sm={24}>
                            <div>案件编号：A23569874512547896521</div>
                          </Col>
                          <Col md={6} sm={24}>
                            <div>案件类型：行政</div>
                          </Col>
                          <Col md={12} sm={24}>
                            <div>案件名称：赌博案</div>
                          </Col>
                        </Row>
                        <Row className={styles.contentRow}>
                          <Col md={6} sm={24}>
                            <div>案件状态：破案</div>
                          </Col>
                          <Col md={6} sm={24}>
                            <div>办案人：张云</div>
                          </Col>
                          <Col md={12} sm={24}>
                            <div>受理单位：派出所</div>
                          </Col>
                        </Row>
                        <Row className={styles.contentRow}>
                          <Col md={6} sm={24}>
                            <div>受理时间：2015-05-05</div>
                          </Col>
                        </Row>
                        <Row className={styles.contentRow}>
                          <Col md={24} sm={24}>
                            <div>案发地点：张家</div>
                          </Col>
                        </Row>
                        <Row className={styles.contentRow}>
                          <Col md={24} sm={24}>
                            <div>简要案情：无</div>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="音视频信息" key="2" forceRender className="Namesaxx2">
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
                                      description={
                                        <img className={styles.img} width={60} height={60} />
                                      }
                                    />
                                    <Step
                                      title={<span style={{ fontSize: 14 }}>询讯问视频</span>}
                                      description={
                                        <img className={styles.img} width={60} height={60} />
                                      }
                                    />
                                    <Step
                                      title={<span style={{ fontSize: 14 }}>离区视频</span>}
                                      description={
                                        <img className={styles.img} width={60} height={60} />
                                      }
                                    />
                                  </Steps>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="涉案人员" key="3" forceRender className="Namesaxx3">
                      <div className={styles.tabDiv}>{this.showTarList()}</div>
                    </TabPane>
                    <TabPane tab="案件流程" key="4" forceRender className="Namesaxx4">
                      <div className={styles.tabDiv}>
                        <Steps progressDot current={3} size="small">
                          <Step title="拘留" description="拘留15天" />
                          <Step title="罚款" description="罚款3000元" />
                          <Step title="拘留" description="拘留15天" />
                        </Steps>
                      </div>
                    </TabPane>
                    {/*<TabPane tab='强制措施记录' key="5" forceRender className='Namesaxx5'>*/}
                    {/*{*/}
                    {/*oWidth ? (*/}
                    {/*<PunishTimeLine*/}
                    {/*oWidth={oWidth}*/}
                    {/*punishData={caseData.qzcsList}*/}
                    {/*/>*/}
                    {/*) : null*/}
                    {/*}*/}
                    {/*</TabPane>*/}
                    <TabPane tab="随身物品" key="6" forceRender className="Namesaxx6">
                      <div className={styles.tabDiv}>
                        <Table
                          size="middle"
                          style={{ backgroundColor: '#fff' }}
                          pagination={{
                            pageSize: 3,
                            showTotal: (total, range) => (
                              <div style={{ position: 'absolute', left: '12px' }}>
                                共 {total} 条记录 第 {this.state.sswpCurrent} /{' '}
                                {Math.ceil(total / 3)} 页
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
                    </TabPane>
                    {/*<TabPane tab="涉案物品" key="7" forceRender className='Namesaxx7'>*/}
                    {/*<div className={styles.tabDiv}>*/}
                    {/*{this.showSawpList(caseData.sawpList || [])}*/}
                    {/*</div>*/}
                    {/*</TabPane>*/}
                    <TabPane tab="相关卷宗" key="8" forceRender className="Namesaxx8">
                      <div className={styles.tabDiv}>
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
                                      共 {total} 条记录 第 {this.state.gjCurrent} /{' '}
                                      {Math.ceil(total / 8)} 页
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
                                <div className={styles.listItemContents}>
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
                                  {/*<Row>*/}
                                  {/*<Col span={8}><img className={styles.img1} width={60} height={60} /></Col>*/}
                                  {/*<Col span={8}>文书名称：{item.xyr_sfzh}</Col>*/}
                                  {/*<Col span={8}>日期：{item.xyr_sfzh}</Col>*/}
                                  {/*</Row>*/}
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

/*
* PersonTableDetail 嫌疑人详情
* author：jhm
* 20191016
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Steps, message, Tabs, Button, Spin, Table } from 'antd';
// import html2canvas from 'html2canvas';
import echarts from 'echarts/lib/echarts';
import tree from 'echarts/lib/chart/tree';
import tooltip from 'echarts/lib/component/tooltip';
import Ellipsis from '../Ellipsis';
// import PersonIntoArea from '../../routes/CaseRealData/IntoArea';
// import ItemDetail from '../../routes/ItemRealData/itemDetail';
// import CaseDetail from '../../routes/CaseRealData/caseDetail';
// import XzCaseDetail from '../../routes/XzCaseRealData/caseDetail';
// import PersonDetail from '../../routes/AllDocuments/PersonalDocDetail';
// import PersonDetailTab from '../../components/AllDocuments/PersonDetailTab';
// import JzDetail from '../../routes/DossierData/DossierDetail';
import styles from './PersonTableDetail.less';

import { autoheight } from '../../utils/utils';

const FormItem = Form.Item;
const { Step } = Steps;
const TabPane = Tabs.TabPane;
let echartTree;
let imgBase = [];
export default class PersonTableDetail extends PureComponent {
  state = {
    // personData: '',
    // loading: false, // 默认详情页是否为加载状态
  };

  componentDidMount() {
    this.showEchart();
  }

  showEchart = () => {
    const data = {
      name: 'flare',
      children: [
        {
          name: 'analytics',
          children: [
            {
              name: 'cluster',
              children: [
                { name: 'AgglomerativeCluster', value: 3938 },
                { name: 'CommunityStructure', value: 3812 },
                { name: 'HierarchicalCluster', value: 6714 },
                { name: 'MergeEdge', value: 743 },
              ],
            },
            {
              name: 'graph',
              children: [
                { name: 'BetweennessCentrality', value: 3534 },
                { name: 'LinkDistance', value: 5731 },
                { name: 'MaxFlowMinCut', value: 7840 },
                { name: 'ShortestPaths', value: 5914 },
                { name: 'SpanningTree', value: 3416 },
              ],
            },
            {
              name: 'optimization',
              children: [{ name: 'AspectRatioBanker', value: 7074 }],
            },
          ],
        },
        {
          name: 'animate',
          children: [
            { name: 'Easing', value: 17010 },
            { name: 'FunctionSequence', value: 5842 },
            {
              name: 'interpolate',
              children: [
                { name: 'ArrayInterpolator', value: 1983 },
                { name: 'ColorInterpolator', value: 2047 },
                { name: 'DateInterpolator', value: 1375 },
                { name: 'Interpolator', value: 8746 },
                { name: 'MatrixInterpolator', value: 2202 },
                { name: 'NumberInterpolator', value: 1382 },
                { name: 'ObjectInterpolator', value: 1629 },
                { name: 'PointInterpolator', value: 1675 },
                { name: 'RectangleInterpolator', value: 2042 },
              ],
            },
            { name: 'ISchedulable', value: 1041 },
            { name: 'Parallel', value: 5176 },
            { name: 'Pause', value: 449 },
            { name: 'Scheduler', value: 5593 },
            { name: 'Sequence', value: 5534 },
            { name: 'Transition', value: 9201 },
            { name: 'Transitioner', value: 19975 },
            { name: 'TransitionEvent', value: 1116 },
            { name: 'Tween', value: 6006 },
          ],
        },
        {
          name: 'data',
          children: [
            {
              name: 'converters',
              children: [
                { name: 'Converters', value: 721 },
                { name: 'DelimitedTextConverter', value: 4294 },
                { name: 'GraphMLConverter', value: 9800 },
                { name: 'IDataConverter', value: 1314 },
                { name: 'JSONConverter', value: 2220 },
              ],
            },
            { name: 'DataField', value: 1759 },
            { name: 'DataSchema', value: 2165 },
            { name: 'DataSet', value: 586 },
            { name: 'DataSource', value: 3331 },
            { name: 'DataTable', value: 772 },
            { name: 'DataUtil', value: 3322 },
          ],
        },
        {
          name: 'display',
          children: [
            { name: 'DirtySprite', value: 8833 },
            { name: 'LineSprite', value: 1732 },
            { name: 'RectSprite', value: 3623 },
            { name: 'TextSprite', value: 10066 },
          ],
        },
        {
          name: 'flex',
          children: [{ name: 'FlareVis', value: 4116 }],
        },
        {
          name: 'physics',
          children: [
            { name: 'DragForce', value: 1082 },
            { name: 'GravityForce', value: 1336 },
            { name: 'IForce', value: 319 },
            { name: 'NBodyForce', value: 10498 },
            { name: 'Particle', value: 2822 },
            { name: 'Simulation', value: 9983 },
            { name: 'Spring', value: 2213 },
            { name: 'SpringForce', value: 1681 },
          ],
        },
      ],
    };
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

  render() {
    // const { personData, loading } = this.state;
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
        dataIndex: 'wpName',
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
        dataIndex: 'sl',
      },
      {
        title: '单位',
        dataIndex: 'unit',
      },
      {
        title: '特征',
        dataIndex: 'tz',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '物管员',
        dataIndex: 'wgr',
      },
      {
        title: '办案民警',
        dataIndex: 'bary',
      },
      {
        title: '接领人员',
        dataIndex: 'jlry',
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
          className={styles.detailBoxScroll}
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
                          <div className={styles.break}>姓名：张冬梅</div>
                        </Col>
                        <Col md={4} sm={24}>
                          <div className={styles.break}>年龄：30</div>
                        </Col>
                        <Col md={4} sm={24}>
                          <div className={styles.break}>性别：女</div>
                        </Col>
                        <Col md={6} sm={24}>
                          <div className={styles.break}>证件号：232302198502021478</div>
                        </Col>
                        <Col md={6} sm={24}>
                          <div className={styles.break}>现阶段强制措施：起诉</div>
                        </Col>
                      </Row>
                      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: '24px' }}>
                        <Col md={12} sm={24}>
                          <div className={styles.break}>现住址：张家屯</div>
                        </Col>
                        <Col md={12} sm={24}>
                          <div className={styles.break}>联系电话：18944569874</div>
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
                    <TabPane tab="音频信息" key="2" forceRender className="Namesaxx2">
                      <div className={styles.tabDiv}>
                        <Row className={styles.contentRow}>
                          <Col md={24} sm={24}>
                            <Row>
                              <Col>
                                <a>a.mp3</a>
                              </Col>
                              <Col>
                                <a>b.mp3</a>
                              </Col>
                              <Col>
                                <a>c.mp3</a>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="涉案人员" key="3" forceRender className="Namesaxx3">
                      <div className={styles.tabDiv}>
                        {/*{this.showTarList(caseData.tarList || [])}*/}
                      </div>
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
                          // dataSource={caseData.sswpList || []}
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
                        <Table
                          size="middle"
                          style={{ backgroundColor: '#fff' }}
                          pagination={{
                            pageSize: 3,
                            showTotal: (total, range) => (
                              <div style={{ position: 'absolute', left: '12px' }}>
                                共 {total} 条记录 第 {this.state.jzCurrent} / {Math.ceil(total / 3)}{' '}
                                页
                              </div>
                            ),
                            onChange: page => {
                              this.setState({ jzCurrent: page });
                            },
                          }}
                          // dataSource={caseData ? caseData.jzList : []}
                          columns={JzColumns}
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

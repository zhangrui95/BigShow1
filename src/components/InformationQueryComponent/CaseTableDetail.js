/*
* PersonTableDetail 嫌疑人详情
* author：jhm
* 20191016
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Card,
  Steps,
  message,
  Tabs,
  Button,
  Spin,
  Table,
  List,
  Tooltip,
} from 'antd';
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
    const rowLayout = { md: 8, xl: 24, xxl: 48 };
    const status = ['否', '是'];
    const statusMap = ['default', 'success'];
    const JqColumns = [
      {
        title: '接警来源',
        dataIndex: 'jjly_mc',
        render: text => {
          return text ? (
            <Ellipsis length={10} tooltip>
              {text}
            </Ellipsis>
          ) : (
            ''
          );
        },
      },
      {
        title: '接警时间',
        dataIndex: 'jjsj',
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
        title: '管辖单位',
        dataIndex: 'jjdw',
        render: text => {
          if (text) {
            let str = '';
            const strArry = text.split(',');
            if (strArry.length > 0) {
              str = strArry[strArry.length - 1];
              return (
                <Ellipsis length={20} tooltip>
                  {str}
                </Ellipsis>
              );
            }
            return str;
          }
          return '';
        },
      },
      {
        title: '接警人',
        dataIndex: 'jjr',
        render: text => {
          if (text) {
            let str = '';
            const strArry = text.split(',');
            if (strArry.length > 0) {
              str = strArry[strArry.length - 1];
              return (
                <Ellipsis length={20} tooltip>
                  {str}
                </Ellipsis>
              );
            }
            return str;
          }
          return '';
        },
      },
      {
        title: '处警单位',
        dataIndex: 'cjdw',
        render: text => {
          if (text) {
            let str = '';
            const strArry = text.split(',');
            if (strArry.length > 0) {
              str = strArry[strArry.length - 1];
              return (
                <Ellipsis length={20} tooltip>
                  {str}
                </Ellipsis>
              );
            }
            return str;
          }
          return '';
        },
      },
      {
        title: '处警人',
        dataIndex: 'cjr',
        render: text => {
          if (text) {
            let str = '';
            const strArry = text.split(',');
            if (strArry.length > 0) {
              str = strArry[strArry.length - 1];
              return (
                <Ellipsis length={20} tooltip>
                  {str}
                </Ellipsis>
              );
            }
            return str;
          }
          return '';
        },
      },
      {
        title: '报案人',
        dataIndex: 'bar',
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
        title: '是否受案',
        dataIndex: 'is_sa',
        render(text) {
          return <Badge status={statusMap[text]} text={status[text]} />;
        },
      },
      {
        title: '操作',
        width: 50,
        render: record => (
          <div>
            <a onClick={() => this.jqDetail(record.id)}>详情</a>
          </div>
        ),
      },
    ];
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
      {
        title: '操作',
        width: 50,
        render: record => (
          <div>
            <a onClick={() => this.JzDetail(record)}>查看</a>
          </div>
        ),
      },
    ];
    return (
      <div
        style={{ padding: '24px 0', background: '#F0F2F5', height: '1600px' }}
        className={styles.detailBoxScroll}
      >
        <div id="capture1">
          <div>
            <Card title="人员信息" className={styles.card} bordered={false}>
              <Table
                size={'middle'}
                style={{ backgroundColor: '#fff' }}
                pagination={{
                  pageSize: 3,
                  showTotal: (total, range) => (
                    <div style={{ position: 'absolute', left: '12px' }}>
                      共 {total} 条记录 第 {this.state.jqcurrent} / {Math.ceil(total / 3)} 页
                    </div>
                  ),
                  onChange: page => {
                    this.setState({ jqcurrent: page });
                  },
                }}
                // dataSource={caseDetails ? caseDetails.jqxxList : []}
                columns={JqColumns}
              />
            </Card>
          </div>
          <div>
            <div className={styles.title}>案件信息</div>
            <div className={styles.message} style={{ padding: '24px' }}>
              <Row gutter={rowLayout}>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件编号：</div>
                  <div className={styles.Indextail}>A2125458788965214563333</div>
                </Col>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件名称：</div>
                  <div className={styles.Indextail}>盗窃案</div>
                </Col>
                <Col md={6} sm={24}>
                  <div className={styles.Indexfrom}>案件类别：</div>
                  <div className={styles.Indextail}>盗窃</div>
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
                  <div className={styles.Indextail}>北环街</div>
                </Col>
              </Row>
              <Row gutter={rowLayout}>
                <Col md={24} sm={24}>
                  <div className={styles.Indexfrom}>简要案情：</div>
                  <div className={styles.Indextail}>无</div>
                </Col>
              </Row>

              <Card title={'案件流程'} style={{ width: '100%' }}>
                <Steps current={5}>
                  <Step title={<span style={{ fontSize: 14 }}>受案</span>} description="受案" />
                  <Step title={<span style={{ fontSize: 14 }}>立案</span>} description="立案" />
                  <Step title={<span style={{ fontSize: 14 }}>破案</span>} description="破案" />
                  <Step title={<span style={{ fontSize: 14 }}>撤案</span>} description="撤案" />
                  <Step title={<span style={{ fontSize: 14 }}>结案</span>} description="结案" />
                </Steps>
              </Card>
            </div>
          </div>
          <div>
            <Card title="涉案物品" className={styles.card} bordered={false}>
              <div>暂无数据</div>
            </Card>
          </div>
          <div>
            <Card title="卷宗信息" className={styles.card} bordered={false}>
              <Table
                size={'middle'}
                style={{ backgroundColor: '#fff' }}
                pagination={{
                  pageSize: 3,
                  showTotal: (total, range) => (
                    <div style={{ position: 'absolute', left: '12px' }}>
                      共 {total} 条记录 第 {this.state.jzcurrent} / {Math.ceil(total / 3)} 页
                    </div>
                  ),
                  onChange: page => {
                    this.setState({ jzcurrent: page });
                  },
                }}
                // dataSource={caseDetails ? caseDetails.jzList : []}
                columns={JzColumns}
              />
            </Card>
          </div>
          <div>
            <Card title="音频信息" className={styles.card} bordered={false}>
              <div>
                <Row>
                  <Col>aa.mp3</Col>
                  <Col>bb.mp3</Col>
                  <Col>cc.mp3</Col>
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

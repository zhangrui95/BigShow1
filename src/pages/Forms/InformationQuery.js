/*
* 综合信息查询(嫌疑人)
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Select,
  TreeSelect,
  Input,
  Button,
  DatePicker,
  Tabs,
  Radio,
  message,
  Cascader,
} from 'antd';
import moment from 'moment/moment';
import styles from './InformationQuery.less';
import PersonTable from '../../components/InformationQueryComponent/PersonTable';
import InformationQueryCase from '../../components/InformationQueryComponent/InformationQueryCase';
// import DataViewButtonArea from '../../components/Common/DataViewButtonArea';
import { exportListDataMaxDays, getQueryString, tableList } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
let timeout;
let currentValue;

const personData = [
  {
    key: '1',
    sary: '张冬梅',
    ryxb: '女',
    zjhm: '232302198502021471',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案1',
    ajbh: 'A4106550302502019040011',
    qzcs: '刑事拘留',
  },
  {
    key: '2',
    sary: '李冬梅',
    ryxb: '男',
    zjhm: '232302198502021472',
    rylx: '违法行为人',
    ajmc: '开设赌场案2',
    ajbh: 'A4106550302502019040012',
    qzcs: '行政拘留',
  },
  {
    key: '3',
    sary: '王冬梅',
    ryxb: '女',
    zjhm: '232302198502021473',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案3',
    ajbh: 'A4106550302502019040013',
    qzcs: '延长居留',
  },
  {
    key: '4',
    sary: '赵冬梅',
    ryxb: '男',
    zjhm: '232302198502021474',
    rylx: '违法行为人',
    ajmc: '开设赌场案4',
    ajbh: 'A4106550302502019040014',
    qzcs: '刑事拘留',
  },
  {
    key: '5',
    sary: '马冬梅',
    ryxb: '女',
    zjhm: '232302198502021475',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案5',
    ajbh: 'A4106550302502019040015',
    qzcs: '行政拘留',
  },
  {
    key: '6',
    sary: '乌冬梅',
    ryxb: '男',
    zjhm: '232302198502021476',
    rylx: '违法行为人',
    ajmc: '开设赌场案6',
    ajbh: 'A4106550302502019040016',
    qzcs: '延长居留',
  },
  {
    key: '7',
    sary: '谢冬梅',
    ryxb: '女',
    zjhm: '232302198502021477',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案7',
    ajbh: 'A4106550302502019040017',
    qzcs: '刑事拘留',
  },
  {
    key: '8',
    sary: '魏冬梅',
    ryxb: '男',
    zjhm: '232302198502021478',
    rylx: '违法行为人',
    ajmc: '开设赌场案8',
    ajbh: 'A4106550302502019040018',
    qzcs: '行政拘留',
  },
  {
    key: '9',
    sary: '高冬梅',
    ryxb: '女',
    zjhm: '232302198502021479',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案9',
    ajbh: 'A4106550302502019040019',
    qzcs: '延长居留',
  },
  {
    key: '10',
    sary: '徐冬梅',
    ryxb: '男',
    zjhm: '232302198502021110',
    rylx: '违法行为人',
    ajmc: '开设赌场案10',
    ajbh: 'A4106550302502019040010',
    qzcs: '刑事拘留',
  },
  {
    key: '11',
    sary: '孙冬梅',
    ryxb: '女',
    zjhm: '232302198502021411',
    rylx: '犯罪嫌疑人',
    ajmc: '开设赌场案11',
    ajbh: 'A4106550302502019040021',
    qzcs: '行政拘留',
  },
  {
    key: '12',
    sary: '刘冬梅',
    ryxb: '男',
    zjhm: '232302198502021412',
    rylx: '违法行为人',
    ajmc: '开设赌场案12',
    ajbh: 'A4106550302502019040022',
    qzcs: '延长居留',
  },
];

// @connect(({ policeData, loading, common }) => ({
//   policeData,
//   loading,
//   common,
// loading: loading.models.alarmManagement,
// }))
@Form.create()
class InformationQuery extends PureComponent {
  state = {
    activeKey: '0',
    arrayDetail: [],
    showDataView: true, // 控制显示图表或者列表（true显示图表）
    personData: personData,
  };

  componentDidMount() {}

  onChange = activeKey => {
    this.setState({
      activeKey,
    });
  };

  // 关闭页面
  onEdit = (targetKey, action) => {
    this[action](targetKey); // this.remove(targetKey);
  };

  // 关闭页面链接的函数
  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.arrayDetail.forEach((pane, i) => {
      if (pane.key === targetKey) {
        if (i === 0) {
          lastIndex = 0;
        } else {
          lastIndex = i - 1;
        }
      }
    });
    const panes = this.state.arrayDetail.filter(pane => pane.key !== targetKey);
    if (panes.length > 0) {
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.setState({
        arrayDetail: panes,
        activeKey: activeKey,
      });
    } else {
      this.setState({
        arrayDetail: panes,
        activeKey: '0',
      });
    }
  };

  // 打开新的详情页面
  newDetail = addDetail => {
    let newDetail = [];
    let isDetail = true;
    newDetail = [...this.state.arrayDetail];
    for (let a = 0; a < newDetail.length; a++) {
      if (addDetail.key === newDetail[a].key) {
        isDetail = false;
        break;
      }
    }
    if (isDetail) {
      newDetail.push(addDetail);
      this.setState({
        arrayDetail: newDetail,
        activeKey: addDetail.key,
      });
    } else {
      this.setState({
        activeKey: addDetail.key,
      });
    }
  };

  // 查询
  handleSearch = e => {
    if (e) e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let list = personData;
      if (fieldsValue.sary) {
        list = list.filter(item => item.sary.indexOf(fieldsValue.sary) > -1);
      }
      if (fieldsValue.ryxb) {
        list = list.filter(item => item.ryxb.indexOf(fieldsValue.ryxb) > -1);
      }
      if (fieldsValue.rylx) {
        list = list.filter(item => item.rylx.indexOf(fieldsValue.rylx) > -1);
      }
      if (fieldsValue.zjhm) {
        list = list.filter(item => item.zjhm.indexOf(fieldsValue.zjhm) > -1);
      }
      if (fieldsValue.ajmc) {
        list = list.filter(item => item.ajmc.indexOf(fieldsValue.ajmc) > -1);
      }
      if (fieldsValue.ajbh) {
        list = list.filter(item => item.ajbh.indexOf(fieldsValue.ajbh) > -1);
      }
      if (fieldsValue.qzcs) {
        list = list.filter(item => item.qzcs.indexOf(fieldsValue.qzcs) > -1);
      }
      this.setState({
        personData: list,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
    this.setState({
      personData,
    });
  };

  // 改变显示图表或列表
  changeListPageHeader = () => {
    const { showDataView } = this.state;
    this.setState({
      showDataView: !showDataView,
      // typeButtons: 'day',
    });
    // if(showDataView) this.handleFormReset();
  };

  filter = (inputValue, path) => {
    return path.some(
      items => items.searchValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, md: { span: 8 }, xl: { span: 6 }, xxl: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, md: { span: 16 }, xl: { span: 18 }, xxl: { span: 20 } },
    };
    const rowLayout = { md: 8, xl: 16, xxl: 24 };
    const colLayout = { sm: 24, md: 12, xl: 8 };
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="涉案人员" {...formItemLayout}>
              {getFieldDecorator('sary', {
                // initialValue: this.state.caseType,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(<Input placeholder="请输入涉案人员" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="人员性别" {...formItemLayout}>
              {getFieldDecorator('ryxb', {})(
                <Select placeholder="请选择人员性别" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                  <Option value="未知的性别">未知的性别</Option>
                  <Option value="未说明的性别">未说明的性别</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="人员类型" {...formItemLayout}>
              {getFieldDecorator('rylx', {})(
                <Select placeholder="请选择人员类型" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  {/*{involvedTypeOptions}*/}
                  <Option value="犯罪嫌疑人">犯罪嫌疑人</Option>
                  <Option value="违法行为人">违法行为人</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="证件号码" {...formItemLayout}>
              {getFieldDecorator('zjhm', {
                // initialValue: this.state.caseType,
                rules: [{ max: 128, message: '最多输入128个字！' }],
              })(<Input placeholder="请输入涉案人证件号" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="案件名称" {...formItemLayout}>
              {getFieldDecorator('ajmc', {
                // initialValue: this.state.caseType,
                rules: [{ max: 128, message: '最多输入128个字！' }],
              })(<Input placeholder="请输入案件名称" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="案件编号" {...formItemLayout}>
              {getFieldDecorator('ajbh', {
                // initialValue: this.state.caseType,
                rules: [
                  { pattern: /^[A-Za-z0-9]+$/, message: '请输入正确的案件编号！' },
                  { max: 32, message: '最多输入32个字！' },
                ],
              })(<Input placeholder="请输入案件编号" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="强制措施" {...formItemLayout}>
              {getFieldDecorator('qzcs', {})(
                <Select placeholder="请选择强制措施" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="刑事拘留">刑事拘留</Option>
                  <Option value="行政拘留">行政拘留</Option>
                  <Option value="延长拘留">延长拘留</Option>
                  {/*{enforcementTypeDictGroup}*/}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <span style={{ float: 'right', marginBottom: 24 }}>
              {/*<Button style={{ color: '#2095FF', borderColor: '#2095FF' }} onClick={this.exportData}>导出表格</Button>*/}
              <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderTable() {
    const { personData } = this.state;
    // const { policeData: { police, loading } } = this.props;
    return (
      <div>
        <PersonTable
          // loading={loading}
          data={personData}
          // onChange={this.handleTableChange}
          // dispatch={this.props.dispatch}
          newDetail={this.newDetail}
          // getPolice={params => this.getPolice(params)}
          // location={this.props.location}
          // formValues={this.state.formValues}
        />
      </div>
    );
  }

  render() {
    const { arrayDetail } = this.state;
    const { showDataView } = this.state;
    // const orgcodeVal = selectedDeptVal !== '' ? JSON.parse(selectedDeptVal).id : '';
    return (
      <div
        className={
          this.props.location.query && this.props.location.query.id ? styles.onlyDetail : ''
        }
      >
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          tabBarStyle={{ margin: 0 }}
          // className={this.props.location.query&&this.props.location.query.id ? styles.onlyDetail:''}
        >
          <TabPane tab="综合信息查询数据" key="0" closable={false}>
            <div className={styles.listPageWrap}>
              <div className={styles.listPageHeader}>
                {showDataView ? (
                  <a className={styles.listPageHeaderCurrent}>
                    <span>●</span>
                    嫌疑人列表
                  </a>
                ) : (
                  <a onClick={this.changeListPageHeader}>嫌疑人列表</a>
                )}
                <span>|</span>
                {showDataView ? (
                  <a onClick={this.changeListPageHeader}>案件列表</a>
                ) : (
                  <a className={styles.listPageHeaderCurrent}>
                    <span>●</span>
                    案件列表
                  </a>
                )}
              </div>
              <InformationQueryCase
                showDataView={showDataView}
                newDetail={this.newDetail}
                {...this.props}
              />
              <div style={showDataView ? { display: 'block' } : { display: 'none' }}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <div className={styles.tableListOperator}>{this.renderTable()}</div>
              </div>
            </div>
          </TabPane>
          {arrayDetail.map((pane, idx) => (
            <TabPane
              tab={pane.title}
              key={pane.key}
              closable={
                this.props.location.query && this.props.location.query.id && idx === 0
                  ? false
                  : true
              }
            >
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
export default InformationQuery;

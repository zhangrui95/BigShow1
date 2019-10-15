/*
* 综合信息查询（案件）
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
import styles from './InformationQueryCase.less';
import CaseTable from './CaseTable';
import { exportListDataMaxDays, getQueryString, tableList } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
let timeout;
let currentValue;

// @connect(({ policeData, loading, common }) => ({
//   policeData,
//   loading,
//   common,
// loading: loading.models.alarmManagement,
// }))
@Form.create()
class InformationQueryCase extends PureComponent {
  state = {
    activeKey: '0',
    arrayDetail: [],
  };

  componentDidMount() {}

  onChange = activeKey => {
    this.setState({
      activeKey,
    });
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
    this.props.newDetail(addDetail);
  };

  // 无法选择的日期
  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  };

  // 查询
  handleSearch = e => {
    if (e) e.preventDefault();
    const values = this.props.form.getFieldsValue();
    console.log('values1', values);
  };

  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
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
          <Col md={8} sm={24}>
            <FormItem label="案件名称" {...formItemLayout}>
              {getFieldDecorator('ajmc', {
                // initialValue: this.state.caseType,
                rules: [{ max: 128, message: '最多输入128个字！' }],
              })(<Input placeholder="请输入案件名称" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label={'受理日期'} {...formItemLayout}>
              {getFieldDecorator('slrq')(
                <RangePicker disabledDate={this.disabledDate} style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="办案单位" {...formItemLayout}>
              {getFieldDecorator('bardw', {
                // initialValue: this.state.bardw,
              })(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请输入办案单位"
                  allowClear
                  key="badwSelect"
                  // treeDefaultExpandedKeys={this.state.treeDefaultExpandedKeys}
                  treeNodeFilterProp="title"
                >
                  <TreeNode title="公安局国保大队">公安局国保大队</TreeNode>
                  <TreeNode title="公安局国保大队">公安局经侦大队</TreeNode>
                  <TreeNode title="公安局国保大队">公安局治安大队</TreeNode>
                  <TreeNode title="公安局国保大队">公安局消防大队</TreeNode>
                  <TreeNode title="公安局国保大队">公安局刑警大队</TreeNode>
                </TreeSelect>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="案件状态" {...formItemLayout}>
              {getFieldDecorator('ajzt', {})(
                <Select placeholder="请选择案件状态" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="受理">受理</Option>
                  <Option value="立案">立案</Option>
                  <Option value="不予立案">不予立案</Option>
                  <Option value="破案">破案</Option>
                  <Option value="撤案">撤案</Option>
                  <Option value="结案">结案</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="&nbsp;&nbsp;&nbsp; 办案人" {...formItemLayout}>
              {getFieldDecorator('bar', {
                // initialValue: this.state.gzry,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(<Input placeholder="请输入办案人" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="案件类别" {...formItemLayout}>
              {getFieldDecorator('ajlb', {
                // initialValue: this.state.caseAllType,
              })(
                <Select placeholder="请选择案件类别" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="八类案件">八类案件</Option>
                  <Option value="两抢一盗">两抢一盗</Option>
                  <Option value="侵财案件">侵财案件</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="起诉时间" {...formItemLayout}>
              {getFieldDecorator('qssj', {})(
                <RangePicker disabledDate={this.disabledDate} style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col>
            <span style={{ float: 'right', marginBottom: 24 }}>
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
    // const { policeData: { police, loading } } = this.props;
    return (
      <div>
        <CaseTable
          // loading={loading}
          // data={police}
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
    const { showDataView } = this.props;
    return (
      <div
        className={
          this.props.location.query && this.props.location.query.id ? styles.onlyDetail : ''
        }
      >
        <div className={styles.listPageWrap}>
          <div style={showDataView ? { display: 'none' } : { display: 'block' }}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderTable()}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default InformationQueryCase;

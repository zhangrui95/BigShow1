/*
* 音视频管理
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
import RenderTable from '../../components/AudioManage/RenderTable';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
let timeout;
let currentValue;
@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {};

  componentDidMount() {}

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
            <FormItem label="接警来源" {...formItemLayout}>
              {getFieldDecorator('jjly', {
                initialValue: this.state.jjly,
              })(
                <Select placeholder="请选择接警来源" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  {/*{involvedType !== undefined ? this.Option() : ''}*/}
                  {/*{sourceOfAlarmDictOptions}*/}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="管辖单位" {...formItemLayout}>
              {getFieldDecorator('jjdw', {})(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请输入管辖单位"
                  allowClear
                  key="jjdwSelect"
                  treeDefaultExpandedKeys={this.state.treeDefaultExpandedKeys}
                  treeNodeFilterProp="title"
                >
                  {/*{depTree && depTree.length > 0 ? this.renderloop(depTree) : null}*/}
                </TreeSelect>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="接警人" {...formItemLayout}>
              {getFieldDecorator('jjr', {
                // initialValue: this.state.caseType,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(
                <Select
                  mode="combobox"
                  defaultActiveFirstOption={false}
                  optionLabelProp="title"
                  showArrow={false}
                  filterOption={false}
                  placeholder="请输入接警人"
                  onChange={value => this.handleAllPoliceOptionChange(value, false)}
                  onFocus={value => this.handleAllPoliceOptionChange(value, false)}
                >
                  {/*{allPoliceOptions}*/}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="接警时间" {...formItemLayout}>
              {getFieldDecorator('jjsj', {
                // initialValue: this.state.jjsj,
              })(
                <RangePicker
                  disabledDate={this.disabledDate}
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="处警单位" {...formItemLayout}>
              {getFieldDecorator('cjdw', {
                // initialValue: this.state.cjdw,
              })(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请输入处警单位"
                  allowClear
                  key="cjdwSelect"
                  treeDefaultExpandedKeys={this.state.treeDefaultExpandedKeys}
                  treeNodeFilterProp="title"
                >
                  {/*{depTree && depTree.length > 0 ? this.renderloop(depTree) : null}*/}
                </TreeSelect>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="处警人" {...formItemLayout}>
              {getFieldDecorator('cjr', {
                // initialValue: this.state.gzry,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(
                <Select
                  mode="combobox"
                  defaultActiveFirstOption={false}
                  optionLabelProp="title"
                  showArrow={false}
                  filterOption={false}
                  placeholder="请输入处警人"
                  onChange={value => this.handleAllPoliceOptionChange(value, true)}
                  onFocus={value => this.handleAllPoliceOptionChange(value, true)}
                >
                  {/*{cjrPoliceOptions}*/}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        {/*<Row gutter={rowLayout}>*/}
        {/*<Col {...colLayout}>*/}
        {/*<FormItem label="报警类别" {...formItemLayout}>*/}
        {/*{getFieldDecorator('jqlb', {})(*/}
        {/*<Cascader*/}
        {/*options={caseTypeTree}*/}
        {/*placeholder="请选择报警类别"*/}
        {/*changeOnSelect={true}*/}
        {/*showSearch={*/}
        {/*{*/}
        {/*filter: (inputValue, path) => {*/}
        {/*return (path.some(items => (items.searchValue).indexOf(inputValue) > -1));*/}
        {/*},*/}
        {/*limit: 5,*/}
        {/*}*/}
        {/*}*/}
        {/*/>,*/}
        {/*)}*/}
        {/*</FormItem>*/}
        {/*</Col>*/}
        {/*<Col {...colLayout}>*/}
        {/*<FormItem label="是否受案" {...formItemLayout}>*/}
        {/*{getFieldDecorator('sfsa', {*/}
        {/*initialValue: this.state.sfsa,*/}
        {/*})(*/}
        {/*<Radio.Group onChange={this.onRadioChange}>*/}
        {/*<Radio value=''>全部</Radio>*/}
        {/*<Radio value='1'>是</Radio>*/}
        {/*<Radio value='0'>否</Radio>*/}
        {/*</Radio.Group>,*/}
        {/*)}*/}
        {/*</FormItem>*/}
        {/*</Col>*/}
        {/*<Col {...colLayout}>*/}
        {/*<FormItem label="是否处警" {...formItemLayout}>*/}
        {/*{getFieldDecorator('sfcj', {*/}
        {/*initialValue: this.state.sfcj,*/}
        {/*})(*/}
        {/*<Radio.Group onChange={this.onRadioChange1}>*/}
        {/*<Radio value=''>全部</Radio>*/}
        {/*<Radio value='1'>是</Radio>*/}
        {/*<Radio value='0'>否</Radio>*/}
        {/*</Radio.Group>,*/}
        {/*)}*/}
        {/*</FormItem>*/}
        {/*</Col>*/}

        {/*</Row>*/}
        <Row gutter={rowLayout}>
          {/*<Col {...colLayout}>*/}
          {/*<FormItem label="处理状态" {...formItemLayout}>*/}
          {/*{getFieldDecorator('clzt', {})(*/}
          {/*<Select placeholder="请选择处理状态" style={{ width: '100%' }}>*/}
          {/*<Option value="">全部</Option>*/}
          {/*{handleStatusDictOptions}*/}
          {/*</Select>,*/}
          {/*)}*/}
          {/*</FormItem>*/}
          {/*</Col>*/}
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
    return (
      <div>
        <RenderTable
          // data={police}
          onChange={this.handleTableChange}
          // dispatch={this.props.dispatch}
          // newDetail={this.newDetail}
          // getPolice={(params) => this.getPolice(params)}
          // location={this.props.location}
          // formValues={this.state.formValues}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.renderForm()}</div>
        <div>{this.renderTable()}</div>
      </div>
    );
  }
}
export default BasicForms;

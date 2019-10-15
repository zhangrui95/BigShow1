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
import BasicFromTable from '../../components/AudioManage/RenderTable';
import styles from './BasicForm.less';
import { peoplelist } from '../List/json1';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
let timeout;
let currentValue;

const data = [
  {
    key: '1',
    ajbh: 'A2323021547965412589631',
    ajmc: '抢劫案',
    xyrxm: '张工',
    badw: '第一派出所',
    bar: '李铭',
    ajlb: '侵财案件',
    ypxx: 'aa.mp3',
  },
  {
    key: '2',
    ajbh: 'A2323021547965412589632',
    ajmc: '赌博案',
    xyrxm: '李煜',
    badw: '第二派出所',
    bar: '王肥肥',
    ajlb: '两抢一盗',
    ypxx: 'abb.mp3',
  },
  {
    key: '3',
    ajbh: 'A2323021547965412589633',
    ajmc: '盗窃案',
    xyrxm: '张云',
    badw: '第三派出所',
    bar: '赵要',
    ajlb: '八类案件',
    ypxx: 'cc.mp3',
  },
];

@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    data: data,
  };

  componentDidMount() {}

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let list = data;
      if (fieldsValue.ajbh) {
        list = list.filter(item => item.ajbh.indexOf(fieldsValue.ajbh) > -1);
      }
      if (fieldsValue.ajmc) {
        list = list.filter(item => item.ajmc.indexOf(fieldsValue.ajmc) > -1);
      }
      if (fieldsValue.xyrxm) {
        list = list.filter(item => item.xyrxm.indexOf(fieldsValue.xyrxm) > -1);
      }
      if (fieldsValue.badw) {
        list = list.filter(item => item.badw.indexOf(fieldsValue.badw) > -1);
      }
      if (fieldsValue.bar) {
        list = list.filter(item => item.bar.indexOf(fieldsValue.bar) > -1);
      }
      if (fieldsValue.ajlb) {
        list = list.filter(item => item.ajlb.indexOf(fieldsValue.ajlb) > -1);
      }
      this.setState({
        data: list,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      data,
    });
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
              {getFieldDecorator('ajbh', {})(<Input placeholder="请输入案件编号" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="案件名称" {...formItemLayout}>
              {getFieldDecorator('ajmc', {})(<Input placeholder="请输入案件名称" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="嫌疑人姓名" {...formItemLayout}>
              {getFieldDecorator('xyrxm', {
                // initialValue: this.state.caseType,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(<Input placeholder="请输入嫌疑人姓名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="办案单位" {...formItemLayout}>
              {getFieldDecorator('badw', {
                // initialValue: this.state.jjsj,
              })(<Input placeholder="请输入办案单位" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="办案人" {...formItemLayout}>
              {getFieldDecorator('bar', {
                // initialValue: this.state.cjdw,
              })(<Input placeholder="请输入办案人" />)}
            </FormItem>
          </Col>
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
        </Row>
        <Row gutter={rowLayout}>
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
    const { data } = this.state;
    return (
      <div>
        <BasicFromTable
          data={data}
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
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <div className={styles.tableListOperator}>{this.renderTable()}</div>
      </div>
    );
  }
}
export default BasicForms;

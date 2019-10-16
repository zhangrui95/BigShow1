/*
* 案件统计
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
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
import PoliceDataView from './PoliceDataView';
import styles from './listPage.less';
import CaseStatisticTable from '../../components/CaseStatisticComponent/CaseStatisticTable';

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
    key: 1,
    jqly: '110报警',
    gxdw: '公安局第一派出所',
    jjr: '赵芬',
    jjsj: '2019-05-05',
    cjr: '李翔',
    cjdw: '公安局第一派出所',
    jjnr: '2019-05-04日夜，东台街发生抢劫时间',
    yp: [
      {
        uid: '-1',
        name: '接警音频',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: '处警音频',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  },
];

@Form.create()
class CaseStatistic extends PureComponent {
  state = {
    jjdw: '150621000000',
    typeButtons: 'day',
    selectedDateVal: null, // 手动选择的日期
    showDataView: true, // 控制显示图表或者列表（true显示图表
    CaseStatisticdata: data,
  };

  componentDidMount() {}

  // 接警树
  jJTreeSelectChange = (val = '') => {
    // 设置手动选择接警单位
    this.setState({
      jjdw: val,
    });
  };

  // 渲染机构树
  renderloop = data =>
    data.map(item => {
      if (item.childrenList && item.childrenList.length) {
        return (
          <TreeNode value={item.code} key={item.code} title={item.name}>
            {this.renderloop(item.childrenList)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.code} value={item.code} title={item.name} />;
    });
  // 改变图表类别
  changeTypeButtons = val => {
    this.setState({
      typeButtons: val,
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

  // 无法选择的日期
  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
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
            <FormItem label="警情来源" {...formItemLayout}>
              {getFieldDecorator('jqly', {
                // initialValue: this.state.caseType,
              })(
                <Select placeholder="请选择接警来源" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="110报警">110报警</Option>
                  <Option value="群众举报">群众举报</Option>
                  <Option value="电话报警">电话报警</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="管辖单位" {...formItemLayout}>
              {getFieldDecorator('gxdw', {})(<Input placeholder="请输入管辖单位" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="接警人" {...formItemLayout}>
              {getFieldDecorator('jjr', {})(<Input placeholder="请输入接警人" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="接警时间" {...formItemLayout}>
              {getFieldDecorator('jjsj', {
                // initialValue: this.state.caseType,
              })(<RangePicker disabledDate={this.disabledDate} style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="处警人" {...formItemLayout}>
              {getFieldDecorator('cjr', {
                // initialValue: this.state.caseType,
              })(<Input placeholder="请输入处警人" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="处警单位" {...formItemLayout}>
              {getFieldDecorator('cjdw', {
                // initialValue: this.state.caseType,
              })(<Input placeholder="请输入处警单位" />)}
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
    const { CaseStatisticdata } = this.state;
    return (
      <div>
        <CaseStatisticTable CaseStatisticdata={CaseStatisticdata} newDetail={this.newDetail} />
      </div>
    );
  }

  render() {
    const depTree = [
      {
        id: 3676,
        parentId: 0,
        resourceId: null,
        depth: 1,
        code: '150621000000',
        name: '公安局',
        policeCategory: null,
        sort: null,
        state: null,
        optTime: null,
        optId: null,
        optName: null,
        visiable: null,
        childrenList: [
          {
            id: 3677,
            parentId: 3676,
            resourceId: null,
            depth: 2,
            code: '150621010000',
            name: '公安局国保大队',
            policeCategory: null,
            sort: null,
            state: null,
            optTime: null,
            optId: null,
            optName: null,
            visiable: null,
            childrenList: [],
          },
        ],
      },
    ];
    const { typeButtons, selectedDateVal, jjdw, showDataView } = this.state;
    return (
      <div className={styles.listPageWrap}>
        <div className={styles.listPageHeader} style={{ height: 65 }}>
          {showDataView ? (
            <a className={styles.listPageHeaderCurrent}>
              <span>●</span>
              案件统计
            </a>
          ) : (
            <a onClick={this.changeListPageHeader}>案件统计</a>
          )}
          <span>|</span>
          {showDataView ? (
            <a onClick={this.changeListPageHeader}>警情列表</a>
          ) : (
            <a className={styles.listPageHeaderCurrent}>
              <span>●</span>
              警情列表
            </a>
          )}
          <div
            className={styles.typeButtonsArea}
            style={showDataView ? {} : { position: 'absolute', zIndex: -1 }}
          >
            <span>
              <span style={{ paddingRight: 50 }}>
                <span>管辖单位：</span>
                <span>
                  <TreeSelect
                    showSearch
                    style={{ width: 365 }}
                    defaultValue="150621000000"
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择机构"
                    allowClear
                    key="jjSelect"
                    onChange={this.jJTreeSelectChange}
                    treeNodeFilterProp="title"
                    treeDefaultExpandAll
                  >
                    {depTree && depTree.length > 0 ? this.renderloop(depTree) : null}
                  </TreeSelect>
                </span>
              </span>
            </span>
            <Button
              type="primary"
              shape="circle"
              ghost={typeButtons !== 'day'}
              onClick={() => this.changeTypeButtons('day')}
            >
              日
            </Button>
            <Button
              type="primary"
              shape="circle"
              ghost={typeButtons !== 'week'}
              onClick={() => this.changeTypeButtons('week')}
            >
              周
            </Button>
          </div>
        </div>
        <PoliceDataView
          showDataView={showDataView}
          searchType={typeButtons}
          selectedDateVal={selectedDateVal}
          jjdw={jjdw}
          {...this.props}
        />
        <div style={showDataView ? { display: 'none' } : { display: 'block' }}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}
export default CaseStatistic;

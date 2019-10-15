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
import PersonTable from './CaseTable';
import { exportListDataMaxDays, getQueryString, tableList } from '../../utils/utils';

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
class InformationQuery extends PureComponent {
  state = {
    jjly: '',
    jjdw: '',
    cjdw: '',
    formValues: {},
    activeKey: '0',
    arrayDetail: [],
    sfsa: '0',
    sfcj: '',
    typeButtons: 'day', // 图表展示类别（week,month）
    allPolice: [],
    cjrPolice: [],
    is_tz: '0',
    selectedDateVal: null, // 手动选择的日期
    selectedDeptVal: '', // 手动选择机构
    treeDefaultExpandedKeys: [], // 办案单位树默认展开keys
    caseTypeTree: [], // 警情类别树
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

  // 获取警情类别树
  getCaseTypeTree = areaNum => {
    this.setState({
      caseTypeTree: [],
    });
    this.props.dispatch({
      type: 'common/getPoliceTypeTree',
      payload: {
        ssds: areaNum,
      },
      callback: data => {
        if (data.list) {
          this.setState({
            caseTypeTree: data.list,
          });
        }
      },
    });
  };

  getPolice(param) {
    this.props.dispatch({
      type: 'policeData/policeFetch',
      payload: param ? param : '',
    });
  }

  // 获取所有警员
  getAllPolice = (name, cjr) => {
    const that = this;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = name;
    timeout = setTimeout(function() {
      that.props.dispatch({
        type: 'common/getAllPolice',
        payload: {
          search: name,
        },
        callback: data => {
          if (data && currentValue === name) {
            if (cjr) {
              that.setState({
                cjrPolice: data.slice(0, 50),
              });
            } else {
              that.setState({
                allPolice: data.slice(0, 50),
              });
            }
          }
        },
      });
    }, 300);
  };
  handleAllPoliceOptionChange = (value, cjr) => {
    this.getAllPolice(value, cjr);
  };
  // 获取接警来源字典
  getSourceOfAlarmDict = area => {
    const org6 = area ? area.substring(0, 6) : '';
    this.props.dispatch({
      type: 'common/getDictType',
      payload: {
        currentPage: 1,
        pd: {
          pid: '2000',
          org6,
        },
        showCount: 999,
      },
    });
  };
  // 获取警情处理状态字典
  getHandleStatusDict = () => {
    this.props.dispatch({
      type: 'common/getCaseManagementDicts',
      payload: {
        currentPage: 1,
        pd: {
          zdbh: '3',
        },
        showCount: 999,
      },
    });
  };
  onRadioChange = e => {
    // console.log('radio checked', e.target.value);
    this.setState({
      sfsa: e.target.value,
    });
  };
  onRadioChange1 = e => {
    // console.log('radio checked', e.target.value);
    this.setState({
      sfcj: e.target.value,
    });
  };
  // 获取机构树
  getDepTree = area => {
    const areaNum = [];
    if (area) {
      areaNum.push(area);
    }
    this.props.dispatch({
      type: 'common/getDepTree',
      payload: {
        departmentNum: areaNum,
      },
      callback: data => {
        if (data) {
          this.setState({
            treeDefaultExpandedKeys: [data[0].code],
          });
        }
      },
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

  // 无法选择的日期
  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  };
  // 表格分页
  handleTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const params = {
      pd: {
        ...formValues,
      },
      currentPage: pagination.current,
      showCount: pagination.pageSize,
    };
    this.getPolice(params);
  };
  // 查询
  handleSearch = e => {
    if (e) e.preventDefault();
    const values = this.props.form.getFieldsValue();
    const jjTime = values.jjsj;
    const tbTime = values.tbsj;
    const formValues = {
      bar: values.bar || '',
      cjdw: values.cjdw || '',
      cjr: values.cjr || '',
      jjdw: values.jjdw || '',
      jjly_dm: values.jjly || '',
      jjr: values.jjr || '',
      is_sa: values.sfsa || '',
      is_cj: values.sfcj || '',
      jqzt_dm: values.clzt || '',
      jqlb: values.jqlb ? values.jqlb[values.jqlb.length - 1] : '',
      jqlbdj: values.jqlb ? values.jqlb.length : '',
      jjsj_ks: jjTime && jjTime.length > 0 ? jjTime[0].format('YYYY-MM-DD HH:mm:ss') : '',
      jjsj_js: jjTime && jjTime.length > 0 ? jjTime[1].format('YYYY-MM-DD HH:mm:ss') : '',
      tbsj_ks: tbTime && tbTime.length > 0 ? tbTime[0].format('YYYY-MM-DD HH:mm:ss') : '',
      tbsj_js: tbTime && tbTime.length > 0 ? tbTime[1].format('YYYY-MM-DD HH:mm:ss') : '',
      is_tz: this.state.is_tz,
    };
    this.setState({
      formValues,
    });
    const params = {
      currentPage: 1,
      showCount: tableList,
      pd: {
        ...formValues,
      },
    };
    this.getPolice(params);
    return false;
  };
  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
    this.setState({
      formValues: {
        is_sa: '0',
      },
      sfsa: '0',
      sfcj: '',
      allPolice: [],
      cjrPolice: [],
    });
    const obj = {
      currentPage: 1,
      showCount: tableList,
      pd: {
        is_sa: '0',
      },
    };
    this.getPolice(obj);
  };
  // 导出
  exportData = () => {
    const values = this.props.form.getFieldsValue();
    const jjTime = values.jjsj;
    const tbTime = values.tbsj;
    const formValues = {
      bar: values.bar || '',
      cjdw: values.cjdw || '',
      cjr: values.cjr || '',
      jjdw: values.jjdw || '',
      jjly_dm: values.jjly || '',
      jjr: values.jjr || '',
      is_sa: values.sfsa || '',
      is_cj: values.sfcj || '',
      jqzt_dm: values.clzt || '',
      jqlb: values.jqlb ? values.jqlb[values.jqlb.length - 1] : '',
      jqlbdj: values.jqlb ? values.jqlb.length : '',
      jjsj_ks: jjTime && jjTime.length > 0 ? jjTime[0].format('YYYY-MM-DD HH:mm:ss') : '',
      jjsj_js: jjTime && jjTime.length > 0 ? jjTime[1].format('YYYY-MM-DD HH:mm:ss') : '',
      tbsj_ks: tbTime && tbTime.length > 0 ? tbTime[0].format('YYYY-MM-DD HH:mm:ss') : '',
      tbsj_js: tbTime && tbTime.length > 0 ? tbTime[1].format('YYYY-MM-DD HH:mm:ss') : '',
    };
    if (jjTime && jjTime.length > 0) {
      const isAfterDate = moment(formValues.jjsj_js).isAfter(
        moment(formValues.jjsj_ks).add(exportListDataMaxDays, 'days')
      );
      if (isAfterDate) {
        // 选择时间间隔应小于exportListDataMaxDays
        message.warning(`日期间隔需小于${exportListDataMaxDays}天`);
      } else {
        this.props.dispatch({
          type: 'common/exportData',
          payload: {
            tableType: '1',
            sqdd_type: '2',
            ...formValues,
          },
          callback: data => {
            if (data.text) {
              message.error(data.text);
            } else {
              window.open(configUrl.serverUrl + data.url);
            }
          },
        });
      }
    } else {
      message.warning(`请选择需要导出的数据日期，日期间隔需小于${exportListDataMaxDays}天`);
    }
  };
  // 设置手动选择日期
  setSelectedDate = val => {
    this.setState({
      typeButtons: 'selectedDate',
      selectedDateVal: val,
    });
  };
  // 设置手动选择机构
  setSelectedDep = val => {
    this.setState({
      selectedDeptVal: val,
    });
  };
  // 设置手动选择接警单位
  setJjdw = val => {
    this.setState({
      jjdw: val,
    });
  };
  // 设置手动选择处警单位
  setCjdw = val => {
    this.setState({
      cjdw: val,
    });
  };
  // 改变图表类别
  changeTypeButtons = val => {
    this.setState({
      typeButtons: val,
    });
  };
  // 图表点击跳转到列表页面
  changeToListPage = (name, dateArry) => {
    this.props.form.resetFields();
    this.setState(
      {
        formValues: {
          is_sa: '0',
        },
        sfsa: '0',
        sfcj: '',
        allPolice: [],
        cjrPolice: [],
      },
      () => {
        this.props.form.setFieldsValue({
          jjsj: [
            moment(`${dateArry[0]} 00:00:00`, 'YYYY-MM-DD hh:mm:ss '),
            moment(`${dateArry[1]} 23:59:59`, 'YYYY-MM-DD hh:mm:ss'),
          ],
          sfsa: '',
          cjdw: this.state.cjdw || null,
          jjdw: this.state.jjdw || null,
          ...name,
        });

        this.handleSearch();
      }
    );
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

  filter = (inputValue, path) => {
    return path.some(
      items => items.searchValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  renderForm() {
    // const { form: { getFieldDecorator }, common: { sourceOfAlarmDict, depTree, handleStatusDict } } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    // const allPoliceOptions = this.state.allPolice.map(d => <Option key={`${d.idcard},${d.pcard}`}
    //                                                                value={`${d.idcard},${d.pcard}$$`}
    //                                                                title={d.name}>{`${d.name} ${d.pcard}`}</Option>);
    // const cjrPoliceOptions = this.state.cjrPolice.map(d => <Option key={`${d.idcard},${d.pcard}`}
    //                                                                value={`${d.idcard},${d.pcard}$$`}
    //                                                                title={d.name}>{`${d.name} ${d.pcard}`}</Option>);
    const { caseTypeTree } = this.state;
    // let sourceOfAlarmDictOptions = [];
    // if (sourceOfAlarmDict.length > 0) {
    //   for (let i = 0; i < sourceOfAlarmDict.length; i++) {
    //     const item = sourceOfAlarmDict[i];
    //     sourceOfAlarmDictOptions.push(
    //       <Option key={item.id} value={item.code}>{item.name}</Option>,
    //     );
    //   }
    // }
    // const handleStatusDictOptions = [];
    // if (handleStatusDict && handleStatusDict.length > 0) {
    //   for (let i = 0; i < handleStatusDict.length; i++) {
    //     const item = handleStatusDict[i];
    //     handleStatusDictOptions.push(
    //       <Option key={item.id} value={item.code}>{item.name}</Option>,
    //     );
    //   }
    // }
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
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="报警类别" {...formItemLayout}>
              {getFieldDecorator('jqlb', {})(
                <Cascader
                  options={caseTypeTree}
                  placeholder="请选择报警类别"
                  changeOnSelect="true"
                  showSearch={{
                    filter: (inputValue, path) => {
                      return path.some(items => items.searchValue.indexOf(inputValue) > -1);
                    },
                    limit: 5,
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="是否受案" {...formItemLayout}>
              {getFieldDecorator('sfsa', {
                initialValue: this.state.sfsa,
              })(
                <Radio.Group onChange={this.onRadioChange}>
                  <Radio value="">全部</Radio>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="是否处警" {...formItemLayout}>
              {getFieldDecorator('sfcj', {
                initialValue: this.state.sfcj,
              })(
                <Radio.Group onChange={this.onRadioChange1}>
                  <Radio value="">全部</Radio>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="处理状态" {...formItemLayout}>
              {getFieldDecorator('clzt', {})(
                <Select placeholder="请选择处理状态" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  {/*{handleStatusDictOptions}*/}
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
    // const { policeData: { police, loading } } = this.props;
    return (
      <div>
        <PersonTable
          // loading={loading}
          // data={police}
          onChange={this.handleTableChange}
          dispatch={this.props.dispatch}
          newDetail={this.newDetail}
          getPolice={params => this.getPolice(params)}
          location={this.props.location}
          formValues={this.state.formValues}
        />
      </div>
    );
  }

  render() {
    // const { policeData: { police, loading }, common: { depTree } } = this.props;
    const { showDataView } = this.props;
    const {
      arrayDetail,
      typeButtons,
      selectedDeptVal,
      selectedDateVal,
      jjdw,
      cjdw,
      treeDefaultExpandedKeys,
    } = this.state;
    const orgcodeVal = selectedDeptVal !== '' ? JSON.parse(selectedDeptVal).id : '';
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
export default InformationQuery;

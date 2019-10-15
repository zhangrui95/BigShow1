/*
* 办案场所考核
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
import AssessmentTable from '../../components/AssessmentComponent/AssessmentTable';
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

@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
@Form.create()
class ArchivesStatistics extends PureComponent {
  state = {
    jjly: '',
    jjdw: '',
    cjdw: '',
    formValues: {},
    activeKey: '0',
    arrayDetail: [],
    sfsa: '0',
    sfcj: '',
    showDataView: true, // 控制显示图表或者列表（true显示图表）
    typeButtons: 'day', // 图表展示类别（week,month）
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
    console.log('values', values);
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
  // 改变显示图表或列表
  changeListPageHeader = () => {
    const { showDataView } = this.state;
    this.setState({
      showDataView: !showDataView,
      // typeButtons: 'day',
    });
    // if(showDataView) this.handleFormReset();
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
        showDataView: false,
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
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { caseTypeTree } = this.state;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, md: { span: 8 }, xl: { span: 8 }, xxl: { span: 6 } },
      wrapperCol: { xs: { span: 24 }, md: { span: 16 }, xl: { span: 16 }, xxl: { span: 18 } },
    };
    const rowLayout = { md: 8, xl: 16, xxl: 24 };
    const colLayout = { sm: 24, md: 12, xl: 8 };
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="办案场所名称：" {...formItemLayout}>
              {getFieldDecorator('bacs_mc', {
                // initialValue: this.state.caseType,
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(<Input placeholder="请输入涉案人员" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="所属机构名称" {...formItemLayout}>
              {getFieldDecorator('jg_mc', {
                // initialValue: this.state.caseType,
                rules: [{ max: 128, message: '最多输入128个字！' }],
              })(<Input placeholder="请输入所属机构名称" />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="办案场所负责人" {...formItemLayout}>
              {getFieldDecorator('bacs_fzr', {
                // initialValue: this.state.caseType,
                rules: [{ max: 128, message: '最多输入128个字！' }],
              })(<Input placeholder="请输入办案场所负责人" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  renderTable() {
    // const { policeData: { police, loading } } = this.props;
    return (
      <div>
        <AssessmentTable
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
    const { arrayDetail } = this.state;
    const {
      showDataView,
      typeButtons,
      selectedDeptVal,
      selectedDateVal,
      jjdw,
      cjdw,
      treeDefaultExpandedKeys,
    } = this.state;
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
          <TabPane tab="办案场所考核" key="0" closable={false}>
            <div className={styles.listPageWrap}>
              <div className={styles.listPageHeader}>
                <a className={styles.listPageHeaderCurrent}>
                  <span>●</span>
                  办案场所列表
                </a>
              </div>
              <InformationQueryCase
                showDataView={showDataView}
                searchType={typeButtons}
                changeToListPage={this.changeToListPage}
                // orgcode={orgcodeVal}
                selectedDateVal={selectedDateVal}
                jjdw={jjdw}
                cjdw={cjdw}
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
export default ArchivesStatistics;

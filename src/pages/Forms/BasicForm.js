/*
* 音视频管理
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import io from 'socket.io-client';
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
  Table,
  Tag,
  Modal,
} from 'antd';
import BasicFromTable from '../../components/AudioManage/RenderTable';
import styles from './BasicForm.less';
import { peoplelist } from '../List/json1';
import AudioDataView from './AudioDataView';
import PoliceDataView from './PoliceDataView';
import Ellipsis from '../../components/Ellipsis';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
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
    ypxx: '入区视频.mp3',
  },
  {
    key: '2',
    ajbh: 'A2323021547965412589632',
    ajmc: '赌博案',
    xyrxm: '李煜',
    badw: '第二派出所',
    bar: '王肥肥',
    ajlb: '两抢一盗',
    ypxx: '询问视频.mp3',
  },
  {
    key: '3',
    ajbh: 'A2323021547965412589633',
    ajmc: '盗窃案',
    xyrxm: '张云',
    badw: '第三派出所',
    bar: '赵要',
    ajlb: '八类案件',
    ypxx: '离区视频.mp3',
  },
];
const dataYj = [
  {
    key: '0',
    ajbh: 'A232302154796541235456',
    ajmc: '20190913吴迪入室抢劫案',
    xyrxm: '吴迪',
    badw: '第一派出所',
    bar: '张三',
    ajlb: '侵财案件',
    yjlb: '询（讯）问音视频上传超期',
    xxzt: '未督办',
    fknr: '',
  },
  {
    key: '1',
    ajbh: 'A2323021547965412589666',
    ajmc: '20190908张三盗窃案',
    xyrxm: '张工',
    badw: '第一派出所',
    bar: '张三',
    ajlb: '侵财案件',
    yjlb: '接处警音视频上传超期',
    xxzt: '未督办',
    fknr: '',
  },
  {
    key: '2',
    ajbh: 'A2323021547965412589632',
    ajmc: '20190723李四赌博案',
    xyrxm: '李煜',
    badw: '第二派出所',
    bar: '王肥肥',
    ajlb: '两抢一盗',
    yjlb: '询（讯）问音视频上传超期',
    xxzt: '发起督办',
    fknr: '',
  },
  {
    key: '3',
    ajbh: 'A2323021547965412589632',
    ajmc: '20190605王二抢劫案',
    xyrxm: '李煜',
    badw: '第二派出所',
    bar: '王肥肥',
    ajlb: '两抢一盗',
    yjlb: '音视频未关联案件',
    fknr: '24小时内解决',
    xxzt: '已反馈',
  },
];
let socket = '';
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
    dataYj: dataYj,
    showDataView: '0', // 控制显示图表或者列表（true显示图表）
    jjdw: '150621000000',
    visible: false,
    record: '',
    index: 0,
  };

  componentDidMount() {
    let query = {
      idcard: '140105198308101858',
      device: 'pc',
    };
    let that = this;
    socket = io(`${configUrl.socket_server}`, {
      query: query,
    });
    socket.on('pub-message-destroy', function(data) {
      if (data) {
        let dataYj = [...that.state.dataYj];
        dataYj[that.state.index].xxzt = '已反馈';
        let news = (dataYj[that.state.index].fknr =
          data[0] && data[0].xxxs_ary[1] && data[0].xxxs_ary[1].msg
            ? data[0].xxxs_ary[1].msg.split('：')
            : 0);
        dataYj[that.state.index].fknr =
          data[0] && data[0].xxxs_ary[1] && data[0].xxxs_ary[1].msg ? news[1] : '反馈结果';
        that.setState({
          dataYj,
        });
      }
    });
  }
  // 接警树
  jJTreeSelectChange = (val = '') => {
    // 设置手动选择接警单位
    this.setState({
      jjdw: val,
      selectedDateVal: null, // 手动选择的日期
    });
  };
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let list = '';
      if (this.state.showDataView === '2') {
        list = dataYj;
      } else if (this.state.showDataView === '1') {
        list = data;
      }
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
      if (this.state.showDataView === '2') {
        this.setState({
          dataYj: list,
        });
      } else {
        this.setState({
          data: list,
        });
      }
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      data,
      dataYj,
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
  changeListPageHeader = showDataViewType => {
    this.setState({
      showDataView: showDataViewType,
    });
    this.handleFormReset();
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
        <BasicFromTable data={data} onChange={this.handleTableChange} />
      </div>
    );
  }

  getDb = (record, index) => {
    this.setState({
      visible: true,
      record: record,
      index: index,
    });
  };
  handleOk = () => {
    let msg = [
      {
        read: 0,
        read_m: 0,
        active: 0,
        nodeid: '410603198310181017',
        systemid: '109005',
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        id: '',
        xxtb: {
          type: 1,
          isvisible: true,
          msg: 'images/user.png',
          act: '',
          comment: '',
        },
        xxbt: {
          type: 0,
          isvisible: true,
          msg: '章明鑫',
          act: '',
          comment: '',
        },
        xxbj: {
          type: 1,
          isvisible: false,
          msg: '',
          actiontype: 0,
          act: '',
          comment: '',
        },
        xxmc: {
          type: 0,
          isvisible: true,
          msg: `${this.state.record ? this.state.record.ajmc : ''}`,
          act: '',
          comment: '',
        },
        xxzt: {
          type: 0,
          isvisible: true,
          msg: '预警消息',
          act: '',
          comment: '',
        },
        xxtp: {
          type: 1,
          isvisible: true,
          msg: 'http://192.168.3.245:8777/3,91e64fff13',
          act: '',
          comment: '',
        },
        xxxs_ary: [
          {
            type: 0,
            isvisible: true,
            msg: `发起人：章明鑫`,
            act: '',
            comment: '',
          },
          {
            type: 0,
            isvisible: true,
            msg: `反馈内容：${this.state.fk}`,
            act: '',
            comment: '',
          },
          {
            type: 0,
            isvisible: true,
            msg: `预警类别：${this.state.record ? this.state.record.yjlb : ''}`,
            act: '',
            comment: '',
          },
        ],
        btn_ary: [
          {
            type: 2,
            isvisible: true,
            msg: '立即反馈',
            act: '',
            comment: '140105198308101858',
          },
        ],
      },
    ];
    socket.emit('pub-message', msg);
    let dataYj = [...this.state.dataYj];
    dataYj[this.state.index].xxzt = '发起督办';
    this.setState({
      dataYj,
    });
    message.success('督办成功');
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      fk: '',
    });
  };
  getInput = e => {
    this.setState({
      fk: e.target.value,
    });
  };
  render() {
    const { typeButtons, selectedDateVal, jjdw, showDataView } = this.state;
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
    const columns1 = [
      {
        title: '案件编号',
        dataIndex: 'ajbh',
        render: text => {
          return (
            <Ellipsis tooltip length="24">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '案件名称',
        dataIndex: 'ajmc',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length={15}>
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '嫌疑人姓名',
        dataIndex: 'xyrxm',
      },
      {
        title: '办案单位',
        dataIndex: 'badw',
      },
      {
        title: '办案人',
        dataIndex: 'bar',
      },
      {
        title: '案件类别',
        dataIndex: 'ajlb',
      },
      {
        title: '预警类别',
        dataIndex: 'yjlb',
      },
      {
        title: '反馈结果',
        dataIndex: 'fknr',
      },
      {
        title: '消息状态',
        dataIndex: 'xxzt',
        render: text => {
          return (
            <Tag
              color={
                text === '未督办'
                  ? 'red'
                  : text === '已反馈'
                    ? 'green'
                    : text === '发起督办'
                      ? 'blue'
                      : 'orange'
              }
            >
              {text}
            </Tag>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <a onClick={() => this.getDb(record, index)}>
              {record.xxzt === '未督办' ? '督办' : ''}
            </a>
          );
        },
      },
    ];
    return (
      <div>
        <div className={styles.listPageWrap}>
          <div className={styles.listPageHeader} style={{ height: 65 }}>
            {showDataView === '0' ? (
              <a className={styles.listPageHeaderCurrent}>
                <span>●</span>
                音视频统计
              </a>
            ) : (
              <a onClick={() => this.changeListPageHeader('0')}>音视频统计</a>
            )}
            <span>|</span>
            {showDataView === '1' ? (
              <a className={styles.listPageHeaderCurrent}>
                <span>●</span>
                音视频列表
              </a>
            ) : (
              <a onClick={() => this.changeListPageHeader('1')}>音视频列表</a>
            )}
            <span>|</span>
            {showDataView === '2' ? (
              <a className={styles.listPageHeaderCurrent}>
                <span>●</span>
                音视频预警列表
              </a>
            ) : (
              <a onClick={() => this.changeListPageHeader('2')}>音视频预警列表</a>
            )}
            <div
              className={styles.typeButtonsArea}
              style={showDataView === '0' ? {} : { display: 'none' }}
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
          <AudioDataView
            showDataView={showDataView}
            searchType={typeButtons}
            selectedDateVal={selectedDateVal}
            jjdw={jjdw}
            {...this.props}
          />
          <div style={showDataView === '1' ? { display: 'block' } : { display: 'none' }}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderTable()}</div>
          </div>
          <div style={showDataView === '2' ? { display: 'block' } : { display: 'none' }}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Table size={'middle'} dataSource={this.state.dataYj} columns={columns1} />
            </div>
          </div>
        </div>
        <Modal
          title="督办"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          centered={true}
          maskClosable={false}
        >
          <div className={styles.left}>预警类别：接处警音视频上传超期</div>
          <div className={styles.left}>
            责任人：
            <Select style={{ width: 120 }} defaultValue="张三">
              <Select.Option value="张三">张三</Select.Option>
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '10px' }}>整改意见：</div>
            <TextArea rows={4} onChange={this.getInput} value={this.state.fk} />
          </div>
        </Modal>
      </div>
    );
  }
}
export default BasicForms;

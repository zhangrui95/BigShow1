/*
* 综合信息查询（案件）
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, Input, Button, DatePicker } from 'antd';
import styles from './InformationQueryCase.less';
import CaseTable from './CaseTable';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Casedata = [
  {
    key: '11',
    ajbh: 'A4106550302502019040011',
    ajmc: '开设赌场案1',
    slrq: '2019-05-01',
    badw: '公安局国保大队1',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    sary: '张冬梅',
    age: 30,
    sex: '女',
    zjhm: '232302198545652545',
    qzcs: '拘留',
    phone: '18520123654',
  },
  {
    key: '21',
    sary: '李冬梅',
    ajbh: 'A4106550302502019040012',
    ajmc: '开设赌场案2',
    slrq: '2019-05-02',
    badw: '公安局国保大队2',
    ajzt: '破案',
    bar: '文芬',
    ajlb: '两抢一盗',
    qssj: '2015-01-02',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '31',
    sary: '王冬梅',
    ajbh: 'A4106550302502019040013',
    ajmc: '开设赌场案3',
    slrq: '2019-05-03',
    badw: '公安局国保大队3',
    ajzt: '立案',
    bar: '文峰',
    ajlb: '芹菜案件',
    qssj: '2015-01-03',
    address: '筒子楼',
    jyaq: '无',
    age: 32,
    sex: '男',
    zjhm: '232302198545652543',
    qzcs: '逮捕',
    phone: '18520123621',
  },
  {
    key: '41',
    sary: '赵冬梅',
    ajbh: 'A4106550302502019040014',
    ajmc: '开设赌场案4',
    slrq: '2019-05-04',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 33,
    sex: '女',
    zjhm: '232302198545652542',
    qzcs: '逮捕',
    phone: '18520123623',
  },
  {
    key: '51',
    sary: '马冬梅',
    ajbh: 'A4106550302502019040015',
    ajmc: '开设赌场案5',
    slrq: '2019-05-05',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '61',
    sary: '乌冬梅',
    ajbh: 'A4106550302502019040016',
    ajmc: '开设赌场案6',
    slrq: '2019-05-06',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '71',
    sary: '谢冬梅',
    ajbh: 'A4106550302502019040017',
    ajmc: '开设赌场案7',
    slrq: '2019-05-07',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '81',
    sary: '魏冬梅',
    ajbh: 'A4106550302502019040018',
    ajmc: '开设赌场案8',
    slrq: '2019-05-08',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '91',
    sary: '高冬梅',
    ajbh: 'A4106550302502019040019',
    ajmc: '开设赌场案9',
    slrq: '2019-05-09',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '101',
    sary: '徐冬梅',
    ajbh: 'A4106550302502019040020',
    ajmc: '开设赌场案10',
    slrq: '2019-05-10',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '111',
    sary: '孙冬梅',
    ajbh: 'A4106550302502019040021',
    ajmc: '开设赌场案11',
    slrq: '2019-05-11',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
  {
    key: '121',
    sary: '刘冬梅',
    ajbh: 'A4106550302502019040022',
    ajmc: '开设赌场案12',
    slrq: '2019-05-12',
    badw: '公安局国保大队',
    ajzt: '受理',
    bar: '文凯',
    ajlb: '八类案件',
    qssj: '2015-01-01',
    address: '筒子楼',
    jyaq: '无',
    age: 31,
    sex: '男',
    zjhm: '232302198545652541',
    qzcs: '逮捕',
    phone: '18520123624',
  },
];

@Form.create()
class InformationQueryCase extends PureComponent {
  state = {
    activeKey: '0',
    arrayDetail: [],
    Casedata: Casedata,
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
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let list = Casedata;
      if (fieldsValue.ajbh) {
        list = list.filter(item => item.ajbh.indexOf(fieldsValue.ajbh) > -1);
      }
      if (fieldsValue.ajmc) {
        list = list.filter(item => item.ajmc.indexOf(fieldsValue.ajmc) > -1);
      }
      if (fieldsValue.slrq) {
        list = list.filter(
          item =>
            fieldsValue.slrq[0].format('YYYY-MM-DD') < item.slrq &&
            item.slrq < fieldsValue.slrq[1].format('YYYY-MM-DD')
        );
      }
      if (fieldsValue.badw) {
        list = list.filter(item => item.badw.indexOf(fieldsValue.badw) > -1);
      }
      if (fieldsValue.ajzt) {
        list = list.filter(item => item.ajzt.indexOf(fieldsValue.ajzt) > -1);
      }
      if (fieldsValue.bar) {
        list = list.filter(item => item.bar.indexOf(fieldsValue.bar) > -1);
      }
      if (fieldsValue.ajlb) {
        list = list.filter(item => item.ajlb.indexOf(fieldsValue.ajlb) > -1);
      }
      if (fieldsValue.qssj) {
        list = list.filter(
          item =>
            fieldsValue.qssj[0].format('YYYY-MM-DD') < item.qssj &&
            item.qssj < fieldsValue.qssj[1].format('YYYY-MM-DD')
        );
      }
      this.setState({
        Casedata: list,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
    this.setState({
      Casedata,
    });
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
              {getFieldDecorator('badw', {})(<Input placeholder="请输入办案单位" />)}
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
                rules: [{ max: 32, message: '最多输入32个字！' }],
              })(<Input placeholder="请输入办案人" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowLayout}>
          <Col {...colLayout}>
            <FormItem label="案件类别" {...formItemLayout}>
              {getFieldDecorator('ajlb', {})(
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
    const { Casedata } = this.state;
    return (
      <div>
        <CaseTable data={Casedata} newDetail={this.newDetail} />
      </div>
    );
  }

  render() {
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

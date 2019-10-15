import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Tabs,
  Select,
  Table,
  Form,
  Input,
  DatePicker,
  Button,
  Tag,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';
import { anJuanLeiXing, chaXunJieGuo, getChaXunJieGuo } from './test';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
@Form.create()
class DataQuery extends Component {
  state = {
    cardList: getChaXunJieGuo().result.list,
    page: getChaXunJieGuo().result.page,
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;

    //原有的六条默认数据
    let { loading } = this.props;
    let { cardList, page } = this.state;

    form.validateFields((err, fieldsValue) => {
      //组织参数
      if (err) return;
      console.log('--------------fieldsValue', fieldsValue);

      //选择的参数
      let dossier_category =
        fieldsValue.dossier_category != undefined ? fieldsValue.dossier_category : null;
      let dossier_custody_category =
        fieldsValue.dossier_custody_category != undefined
          ? fieldsValue.dossier_custody_category
          : null;
      let case_unit = fieldsValue.case_unit != undefined ? fieldsValue.case_unit : null;
      let time_begin =
        fieldsValue.dossier_founder_time != undefined
          ? fieldsValue.dossier_founder_time[0].format('YYYY-MM-DD')
          : null; //	起始时间
      let time_end =
        fieldsValue.dossier_founder_time != undefined
          ? fieldsValue.dossier_founder_time[1].format('YYYY-MM-DD')
          : null; //	结束时间

      //过滤案卷类型
      if (dossier_category) {
        for (let i = 0; i < cardList.length; i++) {
          let item = cardList[i];
          if (item.dossier_categorymc != dossier_category) {
            cardList.splice(i, 1);
            i = 0;
          }
        }
      }

      //过滤存储状态
      if (dossier_custody_category && dossier_custody_category != '全部') {
        for (let i = 0; i < cardList.length; i++) {
          let item = cardList[i];
          if (item.dossier_custody_categorymc != dossier_custody_category) {
            cardList.splice(i, 1);
            i = 0;
          }
        }
      }

      //过滤办案机构
      if (case_unit) {
        for (let i = 0; i < cardList.length; i++) {
          let item = cardList[i];
          if (item.case_unit.indexOf(case_unit) == -1) {
            cardList.splice(i, 1);
            i = 0;
          }
        }
      }

      //过滤时间
      if (time_begin && time_end) {
        for (let i = 0; i < cardList.length; i++) {
          let item = cardList[i];
          let tempData = item.dossier_founder_time;
          if (tempData <= time_begin || tempData >= time_end + 1) {
            cardList.splice(i, 1);
            i = 0;
          }
        }
      }

      this.setState({
        cardList: cardList,
        page: {
          showCount: 6,
          totalPage: 1,
          totalResult: cardList.length,
          currentPage: 1,
          currentResult: 0,
          entityOrField: true,
          pageStr: '',
        },
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      cardList: getChaXunJieGuo().result.list,
      page: getChaXunJieGuo().result.page,
    });
  };

  // 查询表单
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // 卷宗类别
    const dossierCategory = anJuanLeiXing.data.list;
    let dossierCategoryOption = [];
    if (dossierCategory && dossierCategory.length > 0) {
      for (let i = 0; i < dossierCategory.length; i++) {
        let item = dossierCategory[i];
        dossierCategoryOption.push(
          <Option value={item.name} key={item.id}>
            {item.name}
          </Option>
        );
      }
    }
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSearch}
        key="renderSimpleForm"
        style={{ marginBottom: 24 }}
      >
        <Row gutter={{ md: 6, lg: 12, xl: 24 }} type="flex" className={styles.searchForm}>
          <Col xl={6} lg={6} md={6} sm={24}>
            <FormItem
              // {...formItemLayout}
              label="案卷类型"
            >
              {getFieldDecorator('dossier_category', {
                rules: [],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={null}>全部</Option>
                  {dossierCategoryOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xl={6} lg={6} md={6} sm={24}>
            <FormItem
              // {...formItemLayout}
              label="存储状态"
            >
              {getFieldDecorator('dossier_custody_category', {
                rules: [],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={'全部'}>全部</Option>
                  <Option value={'入库'} key={1}>
                    入库
                  </Option>
                  <Option value={'出库'} key={2}>
                    出库
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xl={6} lg={6} md={6} sm={24}>
            <FormItem
              // {...formItemLayout}
              label="办案单位"
            >
              {getFieldDecorator('case_unit', {
                rules: [{}],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6}>
            <FormItem
              // {...formItemLayout}
              label="时间"
            >
              {getFieldDecorator('dossier_founder_time')(
                <RangePicker placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={6} md={6} sm={6} />
          <Col xl={6} lg={6} md={6} sm={6} />
          <Col xl={6} lg={6} md={6} sm={6} />
          <Col xl={6} lg={6} md={6} sm={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
              查询
            </Button>
            <Button onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    );
  }
  handleDetail = record => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/profile/detail',
        query: {
          data: record,
          type: record.dossier_custody_categorymc == '入库' ? 1 : 2,
        },
      })
    );
  };

  listShow = () => {
    let { loading } = this.props;
    let { cardList, page } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'xh',
        key: '1',
      },
      {
        title: '存储状态',
        dataIndex: 'dossier_custody_categorymc',
        key: '2',
        render: (val, record) => {
          switch (record.dossier_custody_categorymc) {
            case '入库':
              return <Tag color="blue">入库</Tag>;
            case '出库':
              return <Tag color="cyan">出库</Tag>;
          }
        },
      },
      {
        title: '卷宗名称',
        dataIndex: 'dossier_name',
        key: '3',
        render: (val, record) => {
          return val && val.length > 10 ? (
            <Tooltip placement="topLeft" title={val}>
              <a onClick={() => this.handleDetail(record)}>{val.slice(0, 10) + '……'}</a>
            </Tooltip>
          ) : (
            <a onClick={() => this.handleDetail(record)}>{val}</a>
          );
        },
      },
      {
        title: '案卷类型',
        dataIndex: 'dossier_categorymc',
        key: '4',
      },
      {
        title: '立卷人',
        dataIndex: 'dossier_founder',
        key: '5',
      },
      {
        title: '时间',
        dataIndex: 'dossier_founder_time',
        key: '6',
      },
      {
        title: '所属案件',
        dataIndex: 'case_name',
        key: '7',
      },
      {
        title: '案件类型',
        dataIndex: 'case_typemc',
        key: '8',
      },
      {
        title: '办案民警',
        dataIndex: 'casepolice',
        key: '9',
      },
      {
        title: '办案单位',
        dataIndex: 'case_unit',
        key: '10',
      },
    ];

    const paginationProps = {
      current: page ? page.currentPage : 1,
      total: page ? page.totalResult : 0,
      pageSize: page ? page.showCount : 0,
      showQuickJumper: true,
      showTotal: (total, range) =>
        `共 ${page ? page.totalResult : 0} 条记录 第 ${page ? page.currentPage : 1} / ${
          page ? page.totalPage : 1
        } 页`,
      onChange: this.handleStandardTableChange,
    };

    return (
      <Row className={styles.tableWrap}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={cardList}
          pagination={paginationProps}
        />
      </Row>
    );
  };
  render() {
    return (
      <div>
        {this.renderSimpleForm()}
        {this.listShow()}
      </div>
    );
  }
}

export default DataQuery;

import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
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
import Ellipsis from '@/components/Ellipsis';
import styles from './AdvancedProfile.less';
import BoxDisplay from './BoxDisplay';
import { boxDossierInfo, boxUI } from './test';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
@Form.create()
class ArkQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxDisplayVisiable: false,
      boxDossierInfo: {
        result: {
          list: [],
          page: null,
        },
        tableVisable: false,
      },
    };
  }

  kfChange = val => {
    if (val == '1') {
      this.setState({
        boxDisplayVisiable: true,
      });
    }
  };
  setBoxInfo = data => {
    if (data && data.length && data.length > 0) {
      if (data[0].dossiercount > 0) {
        this.setState({
          boxDossierInfo: boxDossierInfo,
          tableVisable: true,
        });
      } else {
        this.setState({
          boxDossierInfo: {
            result: {
              list: [],
              page: null,
            },
          },
          tableVisable: true,
        });
      }
    }
  };
  listShow = () => {
    const columns = [
      {
        title: '卷宗类别',
        dataIndex: 'dossier_categorymc',
        key: '1',
      },
      {
        title: '卷宗名称',
        dataIndex: 'dossier_name',
        key: '2',
        render: (val, record) => {
          // return (
          //     val && val.length > 20 ?
          //         <Tooltip title={val}>
          //             <a onClick={() => this.handleDetail(record)}>
          //                 {val.slice(0, 20) + '……'}
          //             </a>
          //         </Tooltip> :
          //         <a onClick={() => this.handleDetail(record)}>
          //             {val}
          //         </a>
          // );
          return (
            <span>
              {record.trajectory_category == 3 && record.trajectory_state == 1 ? (
                <span onClick={() => this.handleDetail(record)}>
                  <Ellipsis tooltip lines={8} style={{ display: 'inline', cursor: 'pointer' }}>
                    {val}
                  </Ellipsis>{' '}
                  <Tag color="red">异常</Tag>
                </span>
              ) : (
                <span onClick={() => this.handleDetail(record)}>
                  <Ellipsis tooltip lines={8} style={{ cursor: 'pointer' }}>
                    {val}
                  </Ellipsis>
                </span>
              )}
            </span>
          );
        },
      },
      {
        title: '立卷人',
        dataIndex: 'dossier_founder',
        key: '3',
      },
      {
        title: '立卷时间',
        dataIndex: 'dossier_founder_time',
        key: '4',
      },
      {
        title: '页码',
        dataIndex: 'dossier_now_pages_number',
        key: '5',
      },
    ];

    let data = this.state.boxDossierInfo.result.list;
    let page = this.state.boxDossierInfo.result.page;

    const paginationProps = {
      current: page ? page.currentPage : 1,
      total: page ? page.totalResult : 0,
      pageSize: page ? page.showCount : 0,
      // showQuickJumper: true,
      // showTotal: (total, range) => `共 ${page ? page.totalResult : 0} 条记录 第 ${page ? page.currentPage : 1} / ${page ? page.totalPage : 1} 页`,
      onChange: this.handleStandardTableChange,
    };

    return (
      <Row className={styles.tableWrap}>
        <Table
          // loading={loading}
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
        />
      </Row>
    );
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    let cabinetData = boxUI.result.cabinetData;
    return (
      <div>
        <Row>
          <Row>
            <Col span={12}>
              <FormItem label="货柜选择" {...formItemLayout}>
                {getFieldDecorator('ark_select', {
                  rules: [
                    {
                      required: true,
                      message: '请选择货柜',
                    },
                  ],
                  // initialValue: this.state.initLinkValue
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.kfChange}>
                    <Option value={'1'}>卷宗库房</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          {/* 柜子区 */}
          <Col span={12}>
            {this.state.boxDisplayVisiable ? (
              <BoxDisplay
                key={1}
                cabinet={cabinetData}
                scale={1}
                selectType={1}
                setBoxInfo={this.setBoxInfo}
                examplesFomtColor={'#000'}
                withdraw={this.withdraw}
                confirmOpenBox={this.confirmOpenBox}
                cancelBox={this.state.cancelBox}
              />
            ) : (
              ''
            )}
          </Col>
          {/* 表格区 */}
          <Col span={12}>{this.state.tableVisable ? this.listShow() : ''}</Col>
        </Row>
      </div>
    );
  }
}

export default ArkQuery;

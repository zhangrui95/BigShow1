import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Table,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import { TimelineChart, Pie } from '@/components/Charts';
import styles from './BasicList.less';
import Ellipsis from '@/components/Ellipsis';
import { chartData, pieDataShow, tableData } from './json2';


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BusinessList extends PureComponent {
  state = {
    visible: false,
    done: false,
    tableData: tableData,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {

  }
  renderSearch = () => {
    return <Search
      placeholder="案件编号、名称、嫌疑人姓名"
      onSearch={value => this.search(value)}
      style={{ width: 300 }}
    />
  }
  search = (value) => {
    let list = tableData;
    if (value) {
      list = list.filter(item => item.ajbh.indexOf(value) > -1 ||
        item.ajmc.indexOf(value) > -1 ||
        item.name.indexOf(value) > -1);
    }
    this.setState({
      tableData: list
    })

  }
  render() {
    // const chartData = []; 
    // for (let i = 0; i < 20; i += 1)
    //  { chartData.push({ x: new Date() + 1000 * 60 * 30 * i, 
    //     y1: Math.floor(Math.random() * 100) + 1000,
    //      y2: Math.floor(Math.random() * 100) + 10,
    //      });
    //  } 
    let { tableData } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'xh',
        xh: 'xh',
      },
      {
        title: '入区事由',
        dataIndex: 'entrycause',
        xh: 'entrycause',
        render: (text) => {
          return <Ellipsis tooltip length={10}>{text}</Ellipsis>;
        },
      },
      {
        title: '案件名称',
        dataIndex: 'ajmc',
        xh: 'ajmc',
        render: (text) => {
          return <Ellipsis tooltip length={8}>{text}</Ellipsis>;
        },
      },
      {
        title: '案件编号',
        dataIndex: 'ajbh',
        xh: 'ajbh',
      },
      {
        title: '涉案人姓名',
        dataIndex: 'name',
        xh: 'name',
        render: (text) => {
          return <Ellipsis tooltip length={7}>{text}</Ellipsis>;
        },
      },
      {
        title: '办案民警',
        dataIndex: 'barxm',
        xh: 'barxm',
        render: (text) => {
          return <Ellipsis tooltip length={7}>{text}</Ellipsis>;
        },
      },

    ];
    // const pageProps = {
    //   current:1,
    //   total:25,
    //   pageSize: data.page ? data.page.showCount : '',
    // };
    return (
      <div>
        <div>
          <Row gutter={24}>
            <div style={{ minHeight: '240px' }}>
              <TimelineChart height={240} data={chartData} titleMap={{ y1: '入区人员数量', y2: '案件办理总数' }} />
            </div>
            <Row gutter={12} style={{ marginTop: '24px' }}>
              <Col span={12}>

                <Card title='案件详情' className={styles.tableContent} extra={this.renderSearch()} style={{ minHeight: '408px' }}>
                  <div >
                    <Table columns={columns}
                      size='small'
                      rowKey={record => record.xh}
                      dataSource={this.state.tableData}
                    // scroll={{ y: 200 }}
                    />
                  </div>
                </Card>

              </Col>
              <Col span={12}>
                <Card title="办理总数资源占比" bordered={false} style={{ minHeight: '408px' }}>
                  <Pie
                    hasLegend
                    subTitle="办理总数"
                    // total={yuan(salesTypeData.reduce((pre, now) => now.y + pre, 0))}
                    total={pieDataShow.reduce((pre, now) => now.y + pre, 0)}
                    data={pieDataShow}
                    height={248}
                    lineWidth={4}
                  />
                </Card>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}

export default BusinessList;

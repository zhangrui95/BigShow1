import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
  Pagination,
} from 'antd';
import PDF from 'react-pdf-js';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';

import styles from './TableList.less';
import { peoplelist } from './json1';
import pdfShow from '@/assets/ledger.pdf';


const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    peoplelist,
    visible: false,
    page: 1,
  };

  columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      peoplelist,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();


    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let list = peoplelist;
      if (fieldsValue.name) {
        list = peoplelist.filter((item) => item.name.indexOf(fieldsValue.name) > -1);
      }
      if (fieldsValue.policename) {
        list = list.filter((item) => item.policename.indexOf(fieldsValue.policename) > -1)
      }
      if (fieldsValue.entryCause) {
        list = list.filter((item) => item.entryCause.indexOf(fieldsValue.entryCause) > -1)
      }

      this.setState({
        peoplelist: list
      })


    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="涉案人员">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="办案民警">
              {getFieldDecorator('policename')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="案由">
              {getFieldDecorator('entryCause')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={24} sm={24} style={{ textAlign: 'right' }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
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

  renderForm() {
    // const { expandForm } = this.state;
    return this.renderSimpleForm();
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    const columns = [
      {
        title: '序号',
        dataIndex: 'xh',
        key: 'xh',
      },
      {
        title: '涉案人员',
        dataIndex: 'name',
        key: 'name',
        render: text => (
          <Ellipsis tooltip length={7}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '案由',
        dataIndex: 'entryCause',
        key: 'entryCause',
        render: text => (
          <Ellipsis tooltip length={10}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '办案民警',
        dataIndex: 'policename',
        key: 'policename',
        xh: 'policename ',
      },
      {
        title: '办案部门',
        dataIndex: 'babm',
        key: 'babm',
        xh: 'babm',
        //    sorter: true,
        render: text => (
          <Ellipsis tooltip length={10}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '所属单位',
        dataIndex: 'bardw',
        key: 'bardw',
        xh: 'bardw',
        //    sorter: true,
        render: text => (
          <Ellipsis tooltip length={10}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '入区时间',
        dataIndex: 'optCreateTime',
        key: 'optCreateTime',
      },
      {
        title: '离区时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        render: record => (
          <div>
            <a onClick={() => {
              this.setState({
                visible: true
              })
            }}
            >台账
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.caseRelat(true, record);
              }}
            >
              视频
            </a>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              size="middle"
              loading={loading}
              rowKey={record => record.xh}
              dataSource={this.state.peoplelist}
              columns={columns}
            // pagination={false}
            // onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <Modal
          title="台账"
          visible={this.state.visible}
          width={625}
          footer={null}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        >

          <PDF
            style={{ width: '300px' }}
            file={pdfShow}
            page={this.state.page}
          />

          <Pagination
            current={this.state.page}
            style={{ textAlign: 'center' }}
            onChange={(page) => {
              console.log('page', page)
              this.setState({
                page
              })
            }}
            size="small"
            pageSize={1}
            total={9}
          />
        </Modal>
      </div>
    );
  }
}

export default TableList;

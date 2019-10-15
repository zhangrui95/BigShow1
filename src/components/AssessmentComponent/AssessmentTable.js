/*
* 综合信息查询人员表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Tooltip,
  Divider,
  Transfer,
  Radio,
  Timeline,
  message,
} from 'antd';
import styles from './Assessment.less';
import DetailModal from './DetailModal';
import Ellipsis from '../Ellipsis';
import { connect } from 'dva';
// import stylescommon from '../../routes/ReportStatistics/CommonAndRegisterList.less';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { WaterWave } from 'ant-design-pro/lib/Charts';
import difference from 'lodash/difference';

const dataOfKpPz = {
  page: {
    showCount: 999,
    totalPage: 1,
    totalResult: 4,
    currentPage: 1,
    currentResult: 0,
    entityOrField: true,
    pageStr: '',
    pd: {
      xm_type: '0',
    },
  },
  list: [
    {
      id: 'de5dfa05-814c-4b38-ba27-98fe72581af7',
      xm_mc: '询问地点不规范',
      xm_type: '0',
      fz: '5',
      zxxgsj: '2019-09-19 19:22:52',
    },
    {
      id: '9bdf3774-fb6e-4ed2-9df0-bd74b717b640',
      xm_mc: '进入办案区未录像',
      xm_type: '0',
      fz: '5',
      zxxgsj: '2019-09-17 11:49:42',
    },
    {
      id: '98662d5e-4f7f-4453-896a-531c4e601931',
      xm_mc: '未进行人身安全检查',
      xm_type: '0',
      fz: '12',
      zxxgsj: '2019-09-17 11:49:29',
    },
    {
      id: '05800dd0-b37c-4255-8cab-3f76aee3c737',
      xm_mc: '重大失误',
      xm_type: '0',
      fz: '13',
      zxxgsj: '2019-09-17 11:49:17',
    },
  ],
};
const dataOfKh = {
  data: {
    kpJlList: [
      {
        xm_mc: '立功',
        xm_type: '2',
        fz: '50',
        kpr_name: '局长',
        kpsj: '2019-10-09 10:45:06',
        fz_lasted: '加10分',
      },
      {
        xm_mc: '询问地点不规范',
        xm_type: '0',
        fz: '1',
        kpr_name: '局长',
        kpsj: '2019-10-09 10:44:54',
        fz_lasted: '扣5分',
      },
      {
        xm_mc: '办案规范',
        xm_type: '1',
        fz: '1',
        kpr_name: '局长',
        kpsj: '2019-10-09 10:44:24',
        fz_lasted: '补1分',
      },
      {
        xm_mc: '进入办案区未录像',
        xm_type: '0',
        fz: '1',
        kpr_name: '局长',
        kpsj: '2019-10-09 10:41:48',
        fz_lasted: '扣5分',
      },
      {
        xm_mc: '调解笔录（扫描）',
        xm_type: '0',
        fz: '2',
        kpr_name: '张飞',
        kpsj: '2019-07-08 15:00:15',
        fz_lasted: '扣9分',
      },
    ],
    total_kf: '扣19分',
    total_bf: '补1分',
    total_jf: '加10分',
    total_score: 100,
  },
  error: null,
};

class RenderTable extends PureComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      current: '',
      visible: false,
      record: null,
      kpVisible: false,
      detail: '',
      targetKeys: [],
      kpList: [],
      kpxmType: '0',
      kpjlType: '',
      data: {
        list: [
          {
            key: '2',
            bacs_mc: '辽阳办案区',
            jg_mc: '辽阳市公安局',
            bacs_fzr: '李四',
            bacs_zt: '在用',
            fs: '100',
            kprq: '2019-10-16',
          },
          {
            key: '1',
            bacs_mc: '盘锦办案区',
            jg_mc: '盘锦市公安局',
            bacs_fzr: '张三',
            bacs_zt: '在用',
            fs: '92',
            kprq: '2019-10-16',
          },
          {
            key: '3',
            bacs_mc: '铁岭办案区',
            jg_mc: '铁岭市公安局',
            bacs_fzr: '于洋',
            bacs_zt: '在用',
            fs: '94',
            kprq: '2019-10-15',
          },
          {
            key: '4',
            bacs_mc: '丹东办案区',
            jg_mc: '东东市公安局',
            bacs_fzr: '李四与',
            bacs_zt: '在用',
            fs: '94',
            kprq: '2019-10-16',
          },
          {
            key: '5',
            bacs_mc: '抚顺办案区',
            jg_mc: '抚顺市公安局',
            bacs_fzr: '李玉玉',
            bacs_zt: '在用',
            fs: '93',
            kprq: '2019-10-15',
          },
          {
            key: '6',
            bacs_mc: '朝阳办案区',
            jg_mc: '朝阳市公安局',
            bacs_fzr: '王五',
            bacs_zt: '在用',
            fs: '93',
            kprq: '2019-10-15',
          },
          {
            key: '7',
            bacs_mc: '本溪办案区',
            jg_mc: '本溪市公安局',
            bacs_fzr: '李图图',
            bacs_zt: '在用',
            fs: '92',
            kprq: '2019-10-14',
          },
          {
            key: '8',
            bacs_mc: '葫芦岛办案区',
            jg_mc: '葫芦岛市公安局',
            bacs_fzr: '张无忌',
            bacs_zt: '在用',
            fs: '92',
            kprq: '2019-10-14',
          },
          {
            key: '9',
            bacs_mc: '营口办案区',
            jg_mc: '营口市公安局',
            bacs_fzr: '张吉吉',
            bacs_zt: '在用',
            fs: '92',
            kprq: '2019-10-14',
          },
          {
            key: '10',
            bacs_mc: '大连办案区',
            jg_mc: '大连市公安局',
            bacs_fzr: '吴灿灿',
            bacs_zt: '在用',
            fs: '91',
            kprq: '2019-10-13',
          },
          {
            key: '11',
            bacs_mc: '锦州办案区',
            jg_mc: '锦州市公安局',
            bacs_fzr: '冯宇',
            bacs_zt: '在用',
            fs: '90',
            kprq: '2019-10-13',
          },
          {
            key: '12',
            bacs_mc: '葫芦岛办案区',
            jg_mc: '葫芦岛市公安局',
            bacs_fzr: '吴年',
            bacs_zt: '在用',
            fs: '90',
            kprq: '2019-10-10',
          },
        ],
      },
      num: 100,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.msg !== nextProps.msg) {
      this.state.data &&
        this.state.data.list &&
        this.state.data.list.splice(0, 1, {
          bacs_mc: '辽宁省办案区',
          jg_mc: '辽宁省公安局',
          bacs_fzr: '李四',
          bacs_zt: '在用',
          fs: '98',
          kprq: nextProps.info && nextProps.info.time ? nextProps.info.time : '2019-10-17',
        });
      this.setState({
        data: this.state.data,
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
    this.setState({
      current: pagination.current,
    });
  };
  deatils = record => {
    this.setState({
      visible: true,
      record: record,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      kpVisible: false,
      record: null,
      kpxmType: '0',
      kpjlType: '',
      targetKeys: [],
    });
  };
  getKp = async record => {
    // await this.getKhDetail(record,'',true);
    console.log('record', record);
    this.setState({
      kpList: dataOfKpPz.list,
    });
    this.setState({
      allList: dataOfKpPz.list,
    });
    dataOfKh.data.total_score = record.fs;
    this.setState({
      detail: dataOfKh.data,
    });
    await this.getModelShow(record);
  };
  getModelShow = record => {
    console.log('222action.record', record);
    this.setState({
      recordKp: record,
      kpVisible: true,
    });
  };
  getKhDetail = (record, xm_type, isdetailNull) => {
    this.setState({
      detail: dataOfKh.data,
    });
  };
  getKpjl = e => {
    this.setState({
      kpjlType: e.target.value,
    });
    this.getKhDetail(this.state.recordKp, e.target.value, false);
  };

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };
  render() {
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
      <Transfer {...restProps} showSelectAll={false}>
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns;

          const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : null }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
              pagination={{ pageSize: 999 }}
              scroll={{ y: 220 }}
            />
          );
        }}
      </Transfer>
    );

    const TableColumns = [
      {
        dataIndex: 'fz',
        title: '分值',
        width: 50,
        render: text => {
          return <span>{'+' + text}</span>;
        },
      },
      {
        dataIndex: 'xm_mc',
        title: '项目',
      },
    ];

    const TableColumnsKf = [
      {
        dataIndex: 'fz',
        title: '分值',
        width: 50,
        render: text => {
          return <span>{'-' + text}</span>;
        },
      },
      {
        dataIndex: 'xm_mc',
        title: '项目',
      },
    ];
    const columns = [
      {
        title: '办案场所名称',
        dataIndex: 'bacs_mc',
        render: text => {
          return (
            <Ellipsis tooltip length="7">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '所属机构名称',
        dataIndex: 'jg_mc',
        width: '15%',
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return <div>{arry[num]}</div>;
          }
        },
      },
      {
        title: '办案场所负责人',
        dataIndex: 'bacs_fzr',
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return (
              <Ellipsis tooltip length="19">
                {arry[num]}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '办案场所状态',
        dataIndex: 'bacs_zt',
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return (
              <Ellipsis tooltip length="7">
                {arry[num]}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '考核总分',
        dataIndex: 'fs',
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return (
              <Ellipsis tooltip length="20">
                {arry[num]}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '考评日期',
        dataIndex: 'kprq',
        render: text => {
          return (
            <Ellipsis tooltip length="24">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '操作',
        align: 'center',
        render: record => {
          return (
            <div>
              <a onClick={() => this.getKp(record)}>考评</a>
            </div>
          );
        },
      },
    ];
    const { detail, kpList, targetKeys } = this.state;
    return (
      <div className={styles.standardTable}>
        <Modal
          title={'考评'}
          width={1006}
          visible={this.state.kpVisible}
          // onOk={this.handleSave}
          okText={'保存'}
          onCancel={this.handleCancel}
          // className={stylescommon.modalStyle}
          maskClosable={false}
          centered={true}
        >
          <div className={styles.box}>
            <div className={styles.leftBox}>
              <Row style={{ height: '120px' }}>
                <Col span={5}>
                  {detail && detail.total_score.toString() ? (
                    <WaterWave
                      height={120}
                      style={{ borderRadius: '200px', overflow: 'hidden' }}
                      title={
                        <div>
                          <div className={styles.zf}>总分</div>
                          <div className={styles.fs}>{detail.total_score}</div>
                        </div>
                      }
                      percent={detail.total_score}
                    />
                  ) : (
                    ''
                  )}
                </Col>
                <Col span={19} className={styles.topDetail}>
                  <Col span={12}>
                    办案场所名称：
                    {this.state.recordKp && this.state.recordKp.bacs_mc
                      ? this.state.recordKp.bacs_mc
                      : ''}
                  </Col>
                  <Col span={12}>
                    所属机构名称：
                    {this.state.recordKp && this.state.recordKp.jg_mc
                      ? this.state.recordKp.jg_mc
                      : ''}
                  </Col>
                  <Col span={12}>
                    办案场所负责人：
                    {this.state.recordKp && this.state.recordKp.bacs_fzr
                      ? this.state.recordKp.bacs_fzr
                      : ''}
                  </Col>
                  <Col span={12}>
                    办案场所状态：
                    {this.state.recordKp && this.state.recordKp.bacs_zt
                      ? this.state.recordKp.bacs_zt
                      : ''}
                  </Col>
                </Col>
              </Row>
              <Divider orientation="left">考评项目</Divider>
              <Row>
                <Radio.Group
                  style={{ marginBottom: 16 }}
                  defaultValue={'0'}
                  value={this.state.kpxmType}
                  className={styles.redioGroup}
                >
                  <Radio.Button value="0">扣分</Radio.Button>
                  <Radio.Button value="1">补分</Radio.Button>
                  <Radio.Button value="2">加分</Radio.Button>
                </Radio.Group>
                <TableTransfer
                  dataSource={kpList}
                  targetKeys={targetKeys}
                  showSearch={true}
                  onChange={this.onChange}
                  filterOption={(inputValue, item) =>
                    item.fz.indexOf(inputValue) !== -1 || item.xm_mc.indexOf(inputValue) !== -1
                  }
                  leftColumns={this.state.kpxmType === '0' ? TableColumnsKf : TableColumns}
                  rightColumns={this.state.kpxmType === '0' ? TableColumnsKf : TableColumns}
                  className={styles.tableTransferBox}
                />
              </Row>
            </div>
            <div className={styles.rightBox}>
              <div className={styles.khjl}>考评记录</div>
              <Radio.Group
                style={{ marginBottom: 16, left: 24 }}
                defaultValue={''}
                value={this.state.kpjlType}
                className={styles.redioGroup}
                onChange={this.getKpjl}
              >
                <Radio.Button value="">全部</Radio.Button>
                <Radio.Button value="0">
                  {detail && detail.total_kf ? detail.total_kf : ''}
                </Radio.Button>
                <Radio.Button value="1">
                  {detail && detail.total_bf ? detail.total_bf : ''}
                </Radio.Button>
                <Radio.Button value="2">
                  {detail && detail.total_jf ? detail.total_jf : ''}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.timeLine}>
                <Timeline>
                  {detail &&
                    detail.kpJlList &&
                    detail.kpJlList.map(item => {
                      return (
                        <Timeline.Item
                          color={
                            item.xm_type === '0'
                              ? '#f00'
                              : item.xm_type === '1'
                                ? '#ff6600'
                                : item.xm_type === '2'
                                  ? '#0c0'
                                  : '#1890ff'
                          }
                        >
                          <div>
                            时间：
                            {item.kpsj}
                          </div>
                          <div>
                            详情：
                            <span
                              style={{
                                color:
                                  item.xm_type === '0'
                                    ? '#f00'
                                    : item.xm_type === '1'
                                      ? '#ff6600'
                                      : item.xm_type === '2'
                                        ? '#0c0'
                                        : '#1890ff',
                              }}
                            >
                              {item.fz_lasted}
                            </span>
                            <span style={{ marginLeft: '6px' }}>{item.xm_mc}</span>
                          </div>
                          <div>
                            考评人：
                            {item.kpr_name}
                          </div>
                        </Timeline.Item>
                      );
                    })}
                </Timeline>
              </div>
            </div>
          </div>
        </Modal>
        <Table
          size={'middle'}
          rowKey={record => record.key}
          dataSource={this.state.data && this.state.data.list ? this.state.data.list : []}
          columns={columns}
          // pagination={paginationProps}
          // onChange={this.handleTableChange}
          // style={{ backgroundColor: '#fff' }}
        />
      </div>
    );
  }
}

export default RenderTable;

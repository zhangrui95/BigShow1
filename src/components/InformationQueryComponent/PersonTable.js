/*
* 综合信息查询人员表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './PersonTable.less';
import Ellipsis from '../Ellipsis';

const data = {
  list: [
    {
      key: '1',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '2',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '3',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '4',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '5',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '6',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '7',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '8',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '9',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '10',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '11',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
    {
      key: '12',
      sary: '张冬梅',
      ryxb: '女',
      zjhm: '232302198502021478',
      rylx: '犯罪嫌疑人',
      ajmc: '开设赌场案',
      ajbh: 'A4106550302502019040013',
      qzcs: '起诉',
    },
  ],
  // page:{
  //   currentPage: 1,
  //   currentResult: 0,
  //   entityOrField: true,
  //   pageStr: "",
  //   showCount: 10,
  //   totalPage: 2,
  //   totalResult: 11,
  // }
};

class RenderTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const columns = [
      {
        title: '涉案人员',
        dataIndex: 'sary',
        render: text => {
          return (
            <Ellipsis tooltip length="7">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '人员性别',
        dataIndex: 'ryxb',
        width: '15%',
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return (
              <Ellipsis tooltip lines={2}>
                {arry[num]}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '证件号码',
        dataIndex: 'zjhm',
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
        title: '人员类型',
        dataIndex: 'rylx',
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
        title: '案件名称',
        dataIndex: 'ajmc',
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
        title: '强制措施',
        dataIndex: 'qzcs',
        render: text => {
          return (
            <Ellipsis tooltip length="10">
              {text}
            </Ellipsis>
          );
        },
      },
    ];

    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   current: data.page ? data.page.currentPage : '',
    //   total: data.page ? data.page.totalResult : '',
    //   pageSize: data.page ? data.page.showCount : '',
    //   showTotal: (total, range) => (
    //     <span className={styles.pagination}>{`共 ${
    //       data.page ? data.page.totalResult : 0
    //       } 条记录 第 ${data.page ? data.page.currentPage : 1} / ${
    //       data.page ? data.page.totalPage : 1
    //       } 页`}</span>
    //   ),
    // };
    return (
      <div className={styles.standardTable}>
        <Table
          size={'middle'}
          rowKey={record => record.key}
          dataSource={data.list}
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

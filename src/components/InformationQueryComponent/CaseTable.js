/*
* 综合信息查询案件表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './CaseTable.less';
import Ellipsis from '../Ellipsis';

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class RenderTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const columns = [
      {
        title: '案件编号',
        dataIndex: 'jqlbmc',
        render: text => {
          return (
            <Ellipsis tooltip length="7">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '案件名称',
        dataIndex: 'jjdw',
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
        title: '嫌疑人姓名',
        dataIndex: 'jjr',
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
        title: '接警时间',
        dataIndex: 'jjsj',
        width: 100,
        // render: (text) => {
        //     return (
        //         <Ellipsis tooltip length='12'>{text}</Ellipsis>
        //     )
        // }
      },
      {
        title: '接警内容',
        dataIndex: 'jjnr',
        width: '20%',
        render: text => {
          return (
            <Ellipsis tooltip lines={4}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '处警单位',
        dataIndex: 'cjdw',
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
        title: '处警人',
        dataIndex: 'cjr',
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
        title: '是否处警',
        dataIndex: 'is_cj',
        width: 50,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: data.page ? data.page.currentPage : '',
      total: data.page ? data.page.totalResult : '',
      pageSize: data.page ? data.page.showCount : '',
      showTotal: (total, range) => (
        <span className={styles.pagination}>{`共 ${
          data.page ? data.page.totalResult : 0
        } 条记录 第 ${data.page ? data.page.currentPage : 1} / ${
          data.page ? data.page.totalPage : 1
        } 页`}</span>
      ),
    };
    return (
      <div className={styles.standardTable}>
        <Table
          size={'middle'}
          rowKey={record => record.key}
          dataSource={data.list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default RenderTable;

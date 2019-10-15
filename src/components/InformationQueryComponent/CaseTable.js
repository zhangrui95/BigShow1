/*
* 综合信息查询案件表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './CaseTable.less';
import Ellipsis from '../Ellipsis';
import CaseTableDetail from './CaseTableDetail';

class RenderTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  CaseDetail = record => {
    const divs = (
      <div>
        <CaseTableDetail {...this.props} />
      </div>
    );
    const AddNewDetail = { title: '案件详情', content: divs, key: 'casetable' + record.key };
    this.props.newDetail(AddNewDetail);
  };

  render() {
    const columns = [
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
        title: '案件类别',
        dataIndex: 'ajlb',
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
        title: '办案单位',
        dataIndex: 'badw',
        // render: (text) => {
        //     return (
        //         <Ellipsis tooltip length='12'>{text}</Ellipsis>
        //     )
        // }
      },
      {
        title: '办案人',
        dataIndex: 'bar',
        render: text => {
          return (
            <Ellipsis tooltip lines={4}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '起诉时间',
        dataIndex: 'qssj',
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
        title: '受理日期',
        dataIndex: 'slrq',
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
        title: '案件状态',
        dataIndex: 'ajzt',
      },
      {
        title: '操作',
        render: record => (
          <div>
            <a onClick={() => this.CaseDetail(record)}>详情</a>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.standardTable}>
        <Table
          size={'middle'}
          rowKey={record => record.key}
          dataSource={this.props.data}
          columns={columns}
        />
      </div>
    );
  }
}

export default RenderTable;

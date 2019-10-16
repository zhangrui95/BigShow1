/*
* 音视频管理表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './RenderTable.less';
import Ellipsis from '../Ellipsis';

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
        render: text => {
          if (text) {
            let arry = text.split(',');
            const num = arry.length - 1;
            return (
              <Ellipsis tooltip length="12">
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '办案单位',
        dataIndex: 'badw',
        render: text => {
          return (
            <Ellipsis tooltip length="18">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '办案人',
        dataIndex: 'bar',
        render: text => {
          return (
            <Ellipsis tooltip length={10}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '案件类别',
        dataIndex: 'ajlb',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length={8}>
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '接处警视频',
        dataIndex: 'ypxx',
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

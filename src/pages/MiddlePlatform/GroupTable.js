import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './GroupTable.less';

class GroupTable extends PureComponent {
  render() {
    const { data } = this.props;
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'name',
      },
      {
        title: '机构编码',
        dataIndex: 'code',
      },
    ];
    return (
      <div className={styles.standardTable}>
        <Table size="middle" rowKey={record => record.id} dataSource={data} columns={columns} />
      </div>
    );
  }
}

export default GroupTable;

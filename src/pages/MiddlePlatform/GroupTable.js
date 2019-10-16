import React, { PureComponent } from 'react';
import { Table, Popconfirm, Divider } from 'antd';
import styles from './GroupTable.less';

class GroupTable extends PureComponent {
    confirm = (params) => { // 确认删除
        this.props.delGroup(params);
    }
    handleUpdDict = (record) => {
        if (record) this.props.updGroup(record);
    }
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
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    <Popconfirm title={`确定要删除${record.name}`} onConfirm={() => this.confirm(record.id)} okText="确定" cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleUpdDict(record)}>编辑</a>
                </div>
            ),
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

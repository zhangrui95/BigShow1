// 办案区- 硬件设备单元表格 by zhangying 2018-02-27
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Button, Badge, Divider, Popconfirm, Tooltip } from 'antd';
import styles from './EquipmentUnitTable.less';

class EquipmentUnitTable extends PureComponent {
    state = {
        selectedRowKeys: [],
        totalCallNo: 0,
        recordInfo: null,//用于改变整条状态
    };

    handleTableChange = (page) => {
        this.props.onChange(page);
    }

    render() {
        const { selectedRowKeys, totalCallNo } = this.state;
        const { data, loading } = this.props;
        const columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                key: 'xh'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip'
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '设备单元类型',
                dataIndex: 'deviceunit_typename',
                key: 'deviceunit_typename'
            },
            {
                title: '运行状态',
                dataIndex: 'zt',
                key: 'zt',
                render: (text,record) => {
                    return text === 1 ? <span><Badge status="success" />正常</span> :
                        ( text === 0 ? <span>
                        {/* <Badge status="error" />异常<Ellipsis length={10} tooltip>{record.event_desc}</Ellipsis> */}
                                <Tooltip title={`${record.event_desc}`}><Badge status="error" />异常</Tooltip>
                        </span>
                            :<span><Badge status="default" />停止</span>);
                },
            },
        ];

        const pageProps = {
            // showSizeChanger: true,
            // showQuickJumper: true,
            // ...page,
            current: data.page.currentPage,
            total: data.page.totalResult,
            pageSize: data.page.showCount
        };

        return (
            <div className={styles.standardTable}>
                <Table
                    size={'middle'}
                    loading={loading}
                    rowKey={record => record.id}
                    dataSource={data.list}
                    columns={columns}
                    pagination={pageProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default EquipmentUnitTable;

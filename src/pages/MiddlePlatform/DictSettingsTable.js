import React, { PureComponent } from 'react';
import { Table, Divider, Popconfirm } from 'antd';

class DictSettingsTable extends PureComponent {
    componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRowKeys.length === 0) {
            this.setState({
                selectedRowKeys: [],
            });
        }
    }
    // 处理编辑事件
    handleUpdDict = (record) => {
        if (record) this.props.updDict(record);
    }

    confirm = (params) => { // 确认删除
        this.props.deleteDict(params);
    }

    render() {
        const { data } = this.props;

        const columns = [

            {
                title: '字典名称',
                dataIndex: 'name',
            },
            {
                title: '字典编码',
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
            <div className="standardTable">
                <Table
                    size={'middle'}
                    rowKey={record => record.id}
                    dataSource={data}
                    columns={columns}
                />
            </div>
        );
    }
}

export default DictSettingsTable;

/*
* 综合信息查询人员表格
* author：jhm
* 20191018
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './PersonTable.less';
import Ellipsis from '../Ellipsis';
import PersonTableDetail from './PersonTableDetail';

class PersonTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  PersonDetail = record => {
    const divs = (
      <div>
        <PersonTableDetail key={record.key} {...this.props} />
      </div>
    );
    const AddNewDetail = { title: '嫌疑人详情', content: divs, key: 'persontable' + record.key };
    this.props.newDetail(AddNewDetail);
  };

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
      {
        title: '操作',
        render: record => (
          <div>
            <a onClick={() => this.PersonDetail(record)}>详情</a>
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

export default PersonTable;

/*
* 案件统计表格
* author：jhm
* 20191016
* */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './CaseStatisticTable.less';
import Ellipsis from '../Ellipsis';
// import CaseTableDetail from './CaseTableDetail';
import VideoComponent from './VideoComponentModal';

class CaseStatisticTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videoFlag: false,
      record: '',
    };
  }

  componentDidMount() {}

  CaseDetail = (record, flag) => {
    this.setState({
      record: record,
      videoFlag: !!flag,
    });
  };

  CloseVideoComponent = () => {
    this.setState({
      videoFlag: false,
    });
  };

  render() {
    const { videoFlag, record } = this.state;
    const columns = [
      {
        title: '警情来源',
        dataIndex: 'jqly',
        render: text => {
          return (
            <Ellipsis tooltip length="24">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdw',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length="24">
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '接警人',
        dataIndex: 'jjr',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length="9">
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '接警时间',
        dataIndex: 'jjsj',
        render: text => {
          return (
            <Ellipsis tooltip length="16">
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '接警内容',
        dataIndex: 'jjnr',
        render: text => {
          return (
            <Ellipsis tooltip length={30}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '处警人',
        dataIndex: 'cjr',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length={9}>
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '处警单位',
        dataIndex: 'cjdw',
        render: text => {
          if (text) {
            return (
              <Ellipsis tooltip length="20">
                {text}
              </Ellipsis>
            );
          }
        },
      },
      {
        title: '操作',
        render: record => (
          <div>
            <a onClick={() => this.CaseDetail(record, true)}>录音详情</a>
          </div>
        ),
      },
    ];
    return (
      <div className={styles.standardTable}>
        <Table
          size={'middle'}
          rowKey={record => record.key}
          dataSource={this.props.CaseStatisticdata}
          columns={columns}
        />

        {videoFlag ? (
          <VideoComponent
            visible={videoFlag}
            CloseVideoComponent={this.CloseVideoComponent}
            record={record}
          />
        ) : null}
      </div>
    );
  }
}

export default CaseStatisticTable;

// 违法监督
import React, { Fragment ,Component} from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card, Table, Tooltip,Tag } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { gaoJingGuanLi, } from './test';
const { Step } = Steps;

export default class Success extends Component {

  listShow = () => {
    let { loading } = this.props;
    let cardList = gaoJingGuanLi.list;
    let page = gaoJingGuanLi.page;

    const columns = [
      {
        title: '序号',
        dataIndex: 'xh',
        key: '1',
      },
      {
        title: '违规类型',
        dataIndex: 'alarm_typemc',
        key: '2',
        render: (val, record) => {
          return (<Tag color="red">{val}</Tag>);

        },
      },
      {
        title: '卷宗名称',
        dataIndex: 'dossier_name',
        key: '3',
      },
      {
        title: '卷宗类别',
        dataIndex: 'dossier_categorymc',
        key: '4',
      },
      {
        title: '办案民警',
        dataIndex: 'casepolice',
        key: '5',
      },

      {
        title: '所属案件',
        dataIndex: 'case_name',
        key: '7',
      },
      {
        title: '违规时间',
        dataIndex: 'alarm_time',
        key: '10',
      },
    ];

    const paginationProps = {
      current: page ? page.currentPage : 1,
      total: page ? page.totalResult : 0,
      pageSize: page ? page.showCount : 0,
      showQuickJumper: true,
      showTotal: (total, range) =>
        `共 ${page ? page.totalResult : 0} 条记录 第 ${page ? page.currentPage : 1} / ${
        page ? page.totalPage : 1
        } 页`,
      onChange: this.handleStandardTableChange,
    };

    return (
      <Row>
        <Table
          loading={loading}
          columns={columns}
          dataSource={cardList}
          pagination={paginationProps}
        />
      </Row>
    );
  };
  render () {
    return (
      <div>
        <Card title={'违规监督列表'}>
          {this.listShow()}
        </Card>
      </div>
    );
  }
}

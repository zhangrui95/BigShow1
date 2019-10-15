/*
* 综合信息查询
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {} from 'antd';

@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
class InformationQuery extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return <div>综合信息查询</div>;
  }
}
export default InformationQuery;

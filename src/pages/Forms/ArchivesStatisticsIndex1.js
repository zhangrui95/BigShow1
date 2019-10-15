/*
* 档案统计-1
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
class ArchivesStatisticsIndex1 extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return <div>档案统计1</div>;
  }
}
export default ArchivesStatisticsIndex1;

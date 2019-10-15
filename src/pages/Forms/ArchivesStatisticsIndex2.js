/*
* 档案统计-2
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
class ArchivesStatisticsIndex2 extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return <div>档案统计2</div>;
  }
}
export default ArchivesStatisticsIndex2;

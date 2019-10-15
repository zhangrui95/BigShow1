/*
* 违规动态展示
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {} from 'antd';
import RenderTable from '../../components/AudioManage/RenderTable';

@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
class DynamicShow extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return <div>违规动态展示</div>;
  }
}
export default DynamicShow;

import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Row, Col, Card, Tabs } from 'antd';
import classNames from 'classnames';
import styles from './AdvancedProfile.less';
import DataQuery from './DataQuery';
import ArkQuery from './ArkQuery';
const TabPane = Tabs.TabPane;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  state = {
    tabkey: 1,
    currentTab: '1',
  };

  render() {
    return (
      <div>
        <Card>
          <Tabs defaultActiveKey={this.state.currentTab} key={this.state.tabkey}>
            <TabPane tab="数据查询" key="1">
              <DataQuery />
            </TabPane>
            <TabPane tab="库房查询" key="2">
              <ArkQuery />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default AdvancedProfile;

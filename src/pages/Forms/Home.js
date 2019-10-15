import React, { PureComponent } from 'react';
import { Redirect } from 'dva/router';

export default class Home extends PureComponent {
  render() {
    return <Redirect exact from="/form/home" to="/home" />;
  }
}

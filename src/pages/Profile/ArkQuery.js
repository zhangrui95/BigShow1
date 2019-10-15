import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Tabs,
  Select,
  Table,
  Form,
  Input,
  DatePicker,
  Button,
  Tag,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';
import BoxDisplay from './BoxDisplay';
import { boxDossierInfo, boxUI } from './test';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
@Form.create()
class ArkQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxDisplayVisiable: false,
    };
  }

  kfChange = val => {
    if (val == '1') {
      this.setState({
        boxDisplayVisiable: true,
      });
    }
  };
  setBoxInfo = data => {
    if (data && data.length && data.length > 0) {
      if (data[0].dossiercount) {
        this.setState({});
      }
    }
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    let cabinetData = boxUI.result.cabinetData;
    return (
      <div>
        <Row>
          <Row>
            <Col span={12}>
              <FormItem label="货柜选择" {...formItemLayout}>
                {getFieldDecorator('ark_select', {
                  rules: [
                    {
                      required: true,
                      message: '请选择货柜',
                    },
                  ],
                  // initialValue: this.state.initLinkValue
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.kfChange}>
                    <Option value={'1'}>卷宗库房</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          {/* 柜子区 */}
          <Col span={12}>
            {this.state.boxDisplayVisiable ? (
              <BoxDisplay
                key={1}
                cabinet={cabinetData}
                scale={0.8}
                selectType={1}
                setBoxInfo={this.setBoxInfo}
                examplesFomtColor={'#000'}
                withdraw={this.withdraw}
                confirmOpenBox={this.confirmOpenBox}
                cancelBox={this.state.cancelBox}
              />
            ) : (
              ''
            )}
          </Col>
          {/* 表格区 */}
          <Col span={12}>{this.state.tableVisable ? this.listShow() : ''}</Col>
        </Row>
      </div>
    );
  }
}

export default ArkQuery;

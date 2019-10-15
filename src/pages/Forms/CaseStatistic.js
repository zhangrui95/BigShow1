/*
* 案件统计
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { Row, Col, Form, Select, TreeSelect, Input, Button, DatePicker, Tabs, Radio, message, Cascader } from 'antd';
import moment from 'moment/moment';
import PoliceDataView from './PoliceDataView';
import styles from './listPage.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
let timeout;
let currentValue;

class CaseStatistic extends PureComponent {
  state = {
      jjdw: '150621000000',
      typeButtons: 'day',
      selectedDateVal: null, // 手动选择的日期
  };

  componentDidMount() {}

    // 接警树
    jJTreeSelectChange = (val = '') => {
        // 设置手动选择接警单位
        this.setState({
            jjdw: val,
        });

    };

    // 渲染机构树
    renderloop = data => data.map((item) => {
        if (item.childrenList && item.childrenList.length) {
            return <TreeNode value={item.code} key={item.code}
                             title={item.name}>{this.renderloop(item.childrenList)}</TreeNode>;
        }
        return <TreeNode key={item.code} value={item.code} title={item.name} />;
    });
    // 改变图表类别
    changeTypeButtons = (val) => {
        this.setState({
            typeButtons: val,
        });
    };
  render() {
    const depTree = [{
        "id": 3676,
        "parentId": 0,
        "resourceId": null,
        "depth": 1,
        "code": "150621000000",
        "name": "公安局",
        "policeCategory": null,
        "sort": null,
        "state": null,
        "optTime": null,
        "optId": null,
        "optName": null,
        "visiable": null,
        "childrenList": [{
            "id": 3677,
            "parentId": 3676,
            "resourceId": null,
            "depth": 2,
            "code": "150621010000",
            "name": "公安局国保大队",
            "policeCategory": null,
            "sort": null,
            "state": null,
            "optTime": null,
            "optId": null,
            "optName": null,
            "visiable": null,
            "childrenList": []
        }]
    }];
    const {typeButtons, selectedDateVal, jjdw} = this.state;
    return (
        <div className={styles.listPageWrap}>
            <div className={styles.listPageHeader} style={{height: 65}}>
                <div className={styles.typeButtonsArea}>
                  <span>
                      <span style={{ paddingRight: 50 }}>
                          <span>管辖单位：</span>
                          <span>
                              <TreeSelect
                                  showSearch
                                  style={{ width: 365 }}
                                  defaultValue='150621000000'
                                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                  placeholder="请选择机构"
                                  allowClear
                                  key='jjSelect'
                                  onChange={this.jJTreeSelectChange}
                                  treeNodeFilterProp="title"
                                  treeDefaultExpandAll

                              >
                                  {depTree && depTree.length > 0 ? this.renderloop(depTree) : null}
                              </TreeSelect>
                          </span>
                      </span>
                  </span>
                    <Button type="primary" shape="circle" ghost={typeButtons !== 'day'}
                            onClick={() => this.changeTypeButtons('day')}>日</Button>
                    <Button type="primary" shape="circle" ghost={typeButtons !== 'week'}
                            onClick={() => this.changeTypeButtons('week')}>周</Button>
                </div>
            </div>
            <PoliceDataView
                searchType={typeButtons}
                selectedDateVal={selectedDateVal}
                jjdw={jjdw}
                {...this.props}
            />
        </div>
    );
  }
}
export default CaseStatistic;

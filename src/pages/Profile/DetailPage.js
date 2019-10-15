// 卷宗详情

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Card,
  Dropdown,
  Menu,
  Icon,
  Modal,
  message,
  Select,
  Table,
  Tag,
  Tooltip,
  Timeline,
  Upload,
} from 'antd';
import styles from './AdvancedProfile.less';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import JzInfo from './JzInfo';
import { guiJiXiangQing, qiTaGuiJi } from './test';

@Form.create()
export default class DetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // 判断在 ，刷新页面，找不到路由上面的参数，退回到列表页
    let data = this.props.location
      ? this.props.location.query
        ? this.props.location.query.data
        : ''
      : '';

    if (data && data.dossier_custody_categorymc) {
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    // 卷宗数据
    let data = this.props.location
      ? this.props.location.query
        ? this.props.location.query.data
        : ''
      : '';
    //卷宗类型
    let type = this.props.location
      ? this.props.location.query
        ? this.props.location.query.type
        : 1
      : 1;
    let stap1 = [];
    let stap2 = [];
    let relevanceInfo = type == 1 ? guiJiXiangQing : qiTaGuiJi;
    for (let i = 0; i < relevanceInfo.length; i++) {
      stap2.push(
        <div>
          <Row>
            所在单位：
            {relevanceInfo[i].police_unit}
          </Row>
          <Row>
            联系电话：
            {relevanceInfo[i].police_phone}
          </Row>
        </div>
      );
    }
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    for (let i = 0; i < relevanceInfo.length; i++) {
      stap1.push(
        <div>
          <Timeline.Item
            dot={
              <div>
                <div
                  style={
                    relevanceInfo[i].dossierexceptionmc == '正常'
                      ? {
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: '#5858DF',
                          textAlign: 'center',
                          marginBottom: 7,
                        }
                      : {
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: 'rgb(255, 51, 102)',
                          textAlign: 'center',
                          marginBottom: 7,
                        }
                  }
                >
                  <p style={{ paddingTop: 7, color: '#fff' }}>{relevanceInfo.length - i}</p>
                </div>
              </div>
            }
            color={relevanceInfo[i].dossierexceptionmc == '正常' ? '#00CC33' : 'rgb(255, 51, 102)'}
          >
            <p style={{ paddingLeft: 30 }}>
              {relevanceInfo[i].dossier_custody_categorymc}
              {relevanceInfo[i].dossier_custody_categorymc === '确认借阅出库' ||
              relevanceInfo[i].dossier_custody_categorymc === '确认出库' ||
              relevanceInfo[i].dossier_custody_categorymc === '确认入库' ? (
                <Tooltip title="打印清单">
                  <Icon
                    type="printer"
                    theme="outlined"
                    style={{ fontSize: 30, marginLeft: 18, cursor: 'pointer' }}
                    onClick={() =>
                      this.detailedListIsOpen(
                        true,
                        relevanceInfo[i].trajectory_category,
                        relevanceInfo[i]
                      )
                    }
                  />
                </Tooltip>
              ) : (
                ''
              )}
            </p>
            <Row style={{ paddingLeft: 30 }}>
              <Col md={0.5} span={24} />
              <Col md={2} span={24}>
                <Tag
                  style={
                    relevanceInfo[i].dossierexceptionmc == '正常'
                      ? { background: '#00CC33', width: 74, textAlign: 'center' }
                      : { background: 'rgb(255, 51, 102)', width: 74, textAlign: 'center' }
                  }
                >
                  {relevanceInfo[i].dossierexceptionmc}
                </Tag>
              </Col>
              <Col md={2} span={24}>
                页数：
                {relevanceInfo[i] ? relevanceInfo[i].dossier_now_pages_number : '0'}
              </Col>
              <Col md={4} span={24}>
                操作时间：
                {relevanceInfo[i].trajectory_time}
              </Col>
              <Col md={3} span={24}>
                <Tooltip title={stap2[i]}>
                  <span>
                    {' '}
                    {relevanceInfo[i].application_name}：{relevanceInfo[i].police_name}
                  </span>
                </Tooltip>
              </Col>
              {relevanceInfo[i].application_reason ? (
                <Col md={6} span={24}>
                  操作原因：
                  {relevanceInfo[i].application_reason}
                </Col>
              ) : (
                ''
              )}
              {/* {
                relevanceInfo[i].dossier_current_custody_details && relevanceInfo[i].dossier_current_custody_details.cabinet_id ?
                  relevanceInfo[i].dossier_current_custody_details.cabinet_id == '106202002' ?
                    <Col md={6} span={24}>存储位置：{`${relevanceInfo[i].dossier_current_custody_details.kfmc}/${relevanceInfo[i].dossier_current_custody_details.qymc}/${relevanceInfo[i].dossier_current_custody_details.kwmc}/${relevanceInfo[i].dossier_current_custody_details.gmc}/${relevanceInfo[i].dossier_current_custody_details.mjjmc}/${relevanceInfo[i].dossier_current_custody_details.mmc}`}</Col> :
                    <Col md={6} span={24}>存储位置：{`${relevanceInfo[i].dossier_current_custody_details.kfmc}/${relevanceInfo[i].dossier_current_custody_details.qymc}/${relevanceInfo[i].dossier_current_custody_details.kwmc}/${relevanceInfo[i].dossier_current_custody_details.gmc}`}</Col> : ''
              } */}
              {relevanceInfo[i].dossier_custody_categorymc === '申请入柜' ||
              relevanceInfo[i].dossier_custody_categorymc === '申请借阅' ||
              relevanceInfo[i].dossier_custody_categorymc === '申请归还' ? (
                <Upload {...props} key={i}>
                  <Button type="primary">上传文书</Button>
                </Upload>
              ) : (
                ''
              )}
            </Row>
          </Timeline.Item>
        </div>
      );
    }

    return (
      <Row>
        <Card title="卷宗信息" className={styles.card}>
          <JzInfo JzInfo={data} />
        </Card>
        <Card title="轨迹信息" className={styles.card}>
          <div style={{ maxHeight: 400, overflow: 'auto', overflow: 'auto' }}>
            <Timeline style={{ marginTop: 20, marginLeft: 20 }}>{stap1}</Timeline>
          </div>
        </Card>
      </Row>
    );
  }
}

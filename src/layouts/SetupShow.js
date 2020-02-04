import React, { Fragment } from 'react';
import styles from './SetupShow.less';
import headerLeftImg from '../assets/show/header_left.png';
import headerTitleImg from '../assets/show/showTitle.png';
import headerRightImg from '../assets/show/header_right.png';
import moment from 'moment/moment';
import ChinaMap from '../components/Show/bigScreenDisplay/ChinaMap';
import PoliceSituationToCaseCount from '../components/Show/bigScreenDisplay/PoliceSituationToCaseCount';
import PersonCount from '../components/Show/bigScreenDisplay/PersonCount';
import PoliceSituationFrom from '../components/Show/bigScreenDisplay/PoliceSituationFrom';
import HandingVideoAreaPlaying from '../components/Show/bigScreenDisplay/HandingVideoAreaPlaying';
import DossierCount from '../components/Show/bigScreenDisplay/DossierCount';
import CaseItemWarningCount from '../components/Show/bigScreenDisplay/CaseItemWarningCount';
import AjNum from '../components/Show/bigScreenDisplay/AjNum';
import PoliceSituationWarningCount from '../components/Show/bigScreenDisplay/PoliceSituationWarningCount';
import ShowNumber from '../components/Show/ShowNumber';
import AdministrativeCaseWarning from '../components/Show/bigScreenDisplay/AdministrativeCaseWarning';
import {Icon,DatePicker,Form, Col, Row, Input,Drawer,Button,Table} from 'antd';
import * as XLSX from 'xlsx';
import cookie from 'react-cookies'
@Form.create()
class SetupShow extends React.PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      nowTime: moment().format('YYYY-MM-DD HH:mm'),
      selectDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      mapLoopTime: 3,
      currentDateType: 'day',
      shadeColors: [
        ['#ff4d98', '#ff0062'],
        ['#00e3ff', '#009bcd'],
        ['#6f05c3', '#c6306c'],
        ['#ff4e50', '#f9d423'],
        ['#4971ff', '#9798ff'],
        ['#00c9ff', '#92f39d'],
        ['#ffe000', '#799f0c'],
        ['#00c6ff', '#0072ff'],
        ['#f09819', '#edde5d'],
        ['#8e2de2', '#4a00e0'],
      ],
      map: true,
      visible: false,
      listBar: cookie.load('listBar') ? JSON.parse(cookie.load('listBar')) : [
        {name:"大新镇", count1: 0,count2: 0, count3: 0},
        {name:"寺面镇", count1: 0,count2: 0, count3: 0},
        {name:"马练瑶族乡", count1: 0,count2: 0, count3: 0},
        {name:"大安镇", count1: 0,count2: 0, count3: 0},
        {name:"官成镇", count1: 0,count2: 0, count3: 0},
        {name:"思旺镇", count1: 0,count2: 0, count3: 0},
        {name:"安怀镇", count1: 0,count2: 0, count3: 0},
        {name:"上渡镇", count1: 0,count2: 0, count3: 0},
        {name:"平南镇", count1: 0,count2: 0, count3: 0},
        {name:"六陈镇", count1: 0,count2: 0, count3: 0},
        { name: '大鹏镇', count1: 0,count2: 0, count3: 0 },
        {name:"同和镇", count1: 0,count2: 0, count3: 0},
        {name:"国安瑶族乡", count1: 0,count2: 0, count3: 0},
        {name:"平山镇", count1: 0,count2: 0, count3: 0},
        {name:"大洲镇",count1: 0,count2: 0, count3: 0},
        {name:"丹竹镇", count1: 0,count2: 0, count3: 0},
        {name:"思界乡", count1: 0,count2: 0, count3: 0},
        {name:"武林镇", count1: 0,count2: 0, count3: 0},
        {name:"东华乡", count1: 0,count2: 0, count3: 0},
        {name:"镇隆镇", count1: 0,count2: 0, count3: 0},
        {name:"大坡镇", count1: 0,count2: 0, count3: 0}
      ],
      lzyqNum:cookie.load('lzyqNum') ? cookie.load('lzyqNum') :0,
      ysblNum:cookie.load('ysblNum') ? cookie.load('ysblNum') :0,
      qzblNum:cookie.load('qzblNum') ? cookie.load('qzblNum') :0,
      lzyqXzNum:cookie.load('lzyqXzNum') ? cookie.load('lzyqXzNum') :0,
      ysblXzNum:cookie.load('ysblXzNum') ? cookie.load('ysblXzNum') :0,
      qzblXzNum:cookie.load('qzblXzNum') ? cookie.load('qzblXzNum') :0,
      mapData:cookie.load('mapData') ? JSON.parse(cookie.load('mapData')) :[],
      listMap:[
      {name:"大新镇", code: '150302',cp:[]},
      {name:"寺面镇", code: '150303',cp:[]},
      {name:"马练瑶族乡", code: '150304',cp:[]},
      {name:"大安镇", code: '150305',cp:[]},
      {name:"官成镇", code: '150306',cp:[]},
      {name:"思旺镇", code: '150307',cp:[]},
      {name:"安怀镇", code: '150308',cp:[]},
      {name:"上渡镇", code: '150309',cp:[]},
      {name:"平南镇", code: '150310',cp:[]},
      {name:"六陈镇", code: '150311',cp:[]},
      { name: '大鹏镇', code: '150301',cp:[] },
      {name:"同和镇", code: '150312',cp:[]},
      {name:"国安瑶族乡", code: '150313',cp:[]},
      {name:"平山镇", code: '150314',cp:[]},
      {name:"大洲镇", code: '150315',cp:[]},
      {name:"丹竹镇", code: '150316',cp:[]},
      {name:"思界乡", code: '150317',cp:[]},
      {name:"武林镇", code: '150318',cp:[]},
      {name:"东华乡", code: '150319',cp:[]},
      {name:"镇隆镇", code: '150320',cp:[]},
      {name:"大坡镇", code: '150321',cp:[]}
    ]
    };
  }
  componentDidMount() {
    // this.getScreenConfig();
    this.showNowTime();
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let listBar = [];
        let lzyqNum = 0;
        let ysblNum = 0;
        let qzblNum = 0;
        let lzyqNumOld = this.state.lzyqNum;
        let ysblNumOld = this.state.ysblNum;
        let qzblNumOld = this.state.qzblNum;
        let mapData = [];
          this.state.listMap.map((item,idx)=>{
          listBar.push({name:item.name, count1: values['lzyq'+idx],count2: values['ysbl'+idx], count3: values['qzbl'+idx]});
          lzyqNum = lzyqNum + parseInt(values['lzyq'+idx]);
          ysblNum = ysblNum + parseInt(values['ysbl'+idx]);
          qzblNum = qzblNum + parseInt(values['qzbl'+idx]);
          mapData.push({ name:item.name,org: item.code, count:qzblNum, count1:lzyqNum, count2:ysblNum});
        });
          let lzyqXzNum = lzyqNum - lzyqNumOld;
          let ysblXzNum = ysblNum - ysblNumOld;
          let qzblXzNum = qzblNum - qzblNumOld;
          cookie.save('listBar',JSON.stringify(listBar), {maxAge: 31536000});
          cookie.save('mapData',JSON.stringify(mapData), {maxAge: 31536000});
          cookie.save('lzyqNum',lzyqNum, {maxAge: 31536000});
          cookie.save('ysblNum',ysblNum, {maxAge: 31536000});
          cookie.save('qzblNum',qzblNum, {maxAge: 31536000});
          cookie.save('lzyqXzNum',lzyqXzNum, {maxAge: 31536000});
          cookie.save('ysblXzNum',ysblXzNum, {maxAge: 31536000});
          cookie.save('qzblXzNum',qzblXzNum, {maxAge: 31536000});
        this.setState({
          listBar,
          lzyqNum,
          ysblNum,
          qzblNum,
          lzyqXzNum,
          ysblXzNum,
          qzblXzNum,
          mapData,
        });
        this.onClose();
      }
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  // 当前时间
  showNowTime = () => {
    window.setInterval(() => {
      this.setState({
        nowTime: moment().format('YYYY-MM-DD HH:mm'),
      });
    }, 1000 * 60);
  };
  // 设置区划code
  setAreaCode = code => {
    this.setState({
      org: code,
    });
  };
  // 改变数据展示时间段
  changeCurrentDate = (dateType) => {
    let selectDate = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    if (dateType === 'month') {
      selectDate = [moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    }else if(dateType === 'week'){
      selectDate = [moment().startOf('week').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    }
    this.setState({
      selectDate,
      currentDateType: dateType,
    });
  };
  getMap = (map) =>{
    this.setState({
      map,
    })
  }
  goBack = () =>{
    history.go(-1);
  }
  onImportExcel = file => {
      // 获取上传的文件对象
      const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }
  render() {
    const {form: { getFieldDecorator }} = this.props
    return (
      <div className={styles.SCMDataShow}>
        {/*<div className={styles.goBack} onClick={this.goBack}><Icon type="left" /> 返回</div>*/}
        <div className={styles.header}>
          <img src={headerLeftImg} alt="" />
          {/*<img className={styles.showTitle} src={headerTitleImg} alt="智慧案件管理系统"/>*/}
          <div className={styles.titleName}>平南县肺炎疫情防控管理系统</div>
          <img src={headerRightImg} alt="" />
          <div className={styles.nowTime}>
            <span>
              当前时间：
              {this.state.nowTime}
            </span>
          </div>
          {/*<div className={styles.dateButtons}>*/}
          {/*   <span className={this.state.currentDateType === 'day' ? styles.currentDate : null}*/}
          {/*         onClick={() => this.changeCurrentDate('day')}>本日</span>*/}
          {/*  <span className={this.state.currentDateType === 'week' ? styles.currentDate : null} onClick={() => this.changeCurrentDate('week')}>本周</span>*/}
          {/*  <span className={this.state.currentDateType === 'month' ? styles.currentDate : null}*/}
          {/*        onClick={() => this.changeCurrentDate('month')}>本月</span>*/}
          {/*</div>*/}
        </div>
        <div className={styles.wrap}>
          <div className={styles.wrapLeft}>
            {/*<input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />*/}
            <div className={styles.globalCards} style={{backgroundColor:'#7106c1'}}>
                <div>来自疫区</div>
                <div>{this.state.lzyqNum}人</div>
                <div className={styles.borderTop}>较上日+{this.state.lzyqXzNum}人</div>
            </div>
            <div className={styles.globalCards} style={{backgroundColor:'#ff9800'}}>
              <div>疑似病例</div>
              <div>{this.state.ysblNum}人</div>
              <div className={styles.borderTop}>较上日+{this.state.ysblXzNum}人</div>
            </div>
            <div className={styles.globalCards}>
              <div>确诊病例</div>
              <div>{this.state.qzblNum}人</div>
              <div className={styles.borderTop}>较上日+{this.state.qzblXzNum}人</div>
            </div>
          </div>
          <div className={styles.wrapMiddle}>
            <div className={styles.mapCard}>
              {
                this.state.map ?  <ChinaMap {...this.state} {...this.props} setAreaCode={this.setAreaCode} getMap={this.getMap}/> : <ShowNumber {...this.state} {...this.props} getMap={this.getMap}/>
              }
              {/*<ShowNumber {...this.state} {...this.props} getMap={this.getMap} setAreaCode={this.setAreaCode}/>*/}
            </div>
            {/*<div className={styles.longCard}>*/}
            {/*  <PoliceSituationToCaseCount {...this.props} {...this.state} />*/}
            {/*</div>*/}
          </div>
          <div className={styles.wrapRight}>
            <div className={styles.globalCardRight}>

            </div>
          {/*<div className={styles.globalCard}>*/}
          {/*  <HandingVideoAreaPlaying {...this.props} {...this.state} />*/}
          {/*</div>*/}
          {/*<div className={styles.globalCard}>*/}
          {/*  /!*<CaseItemWarningCount {...this.props} {...this.state} />*!/*/}
          {/*  <PoliceSituationWarningCount {...this.props} {...this.state} />*/}
          {/*</div>*/}
          {/*<div className={styles.globalCard}>*/}
          {/*  <DossierCount {...this.props} {...this.state} />*/}
          {/*</div>*/}
          </div>
          <div className={styles.wrapAll}>
              <DossierCount {...this.props} {...this.state} />
          </div>
          <div className={styles.listBtn} onClick={this.showDrawer}>
            <Icon type="left" />
          </div>
          <Drawer
            mask={false}
            title="平南疫情汇总"
            width={400}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <Form layout="vertical" hideRequiredMark>
              {
                this.state.listMap.map((item,idx)=>{
                  return <Row gutter={16}>
                    <Col span={7} style={{textAlign:'right'}}>{item.name}：</Col>
                    <Col span={17}>
                      <Form.Item label="来自疫区">
                        {getFieldDecorator('lzyq'+idx, {
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="疑似病例">
                        {getFieldDecorator('ysbl'+idx, {
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="确诊病例">
                        {getFieldDecorator('qzbl'+idx, {
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                  </Row>
                })
              }

            </Form>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onOk} type="primary">
                确定
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default SetupShow;

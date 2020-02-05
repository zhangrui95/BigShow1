import React, { Fragment } from 'react';
import styles from './SetupShow.less';
import headerLeftImg from '../assets/show/header_left.png';
import headerTitleImg from '../assets/show/showTitle.png';
import headerRightImg from '../assets/show/header_right.png';
import moment from 'moment';
import ChinaMap from '../components/Show/bigScreenDisplay/ChinaMap';
import PoliceSituationToCaseCount from '../components/Show/bigScreenDisplay/PoliceSituationToCaseCount';
import PersonCount from '../components/Show/bigScreenDisplay/PersonCount';
import PoliceSituationFrom from '../components/Show/bigScreenDisplay/PoliceSituationFrom';
// import HandingVideoAreaPlaying from '../components/Show/bigScreenDisplay/HandingVideoAreaPlaying';
import DossierCount from '../components/Show/bigScreenDisplay/DossierCount';
import CaseItemWarningCount from '../components/Show/bigScreenDisplay/CaseItemWarningCount';
import AjNum from '../components/Show/bigScreenDisplay/AjNum';
import PoliceSituationWarningCount from '../components/Show/bigScreenDisplay/PoliceSituationWarningCount';
import ShowNumber from '../components/Show/ShowNumber';
import AdministrativeCaseWarning from '../components/Show/bigScreenDisplay/AdministrativeCaseWarning';
import {Icon,DatePicker,Form, Col, Row, Input,Drawer,Button,Table} from 'antd';
import * as XLSX from 'xlsx';
const electron = window.electron;
const ipcRenderer = electron.ipcRenderer;
const dialog = electron.remote.dialog;
// import cookie from 'react-cookies'
@Form.create()
class SetupShow extends React.PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      nowTime: moment().format('YYYY-MM-DD HH:mm'),
      dateString: moment().format('YYYY-MM-DD'),
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
      listBar: [
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
      lzyqNum:0,
      ysblNum:0,
      qzblNum:0,
      yxglNum:0,
      jjglNum:0,
      lzyqXzNum:0,
      yxglXzNum:0,
      jjglXzNum:0,
      ysblXzNum:0,
      qzblXzNum:0,
      mapData:[],
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
    ],
      timeList:[{ count1: 0, count2:0,count3:0,time: moment().format('YYYY-MM-DD') }],
      lzyqNumOld:0,
      ysblNumOld:0,
      qzblNumOld:0,
      yxglNumOld:0,
      jjglNumOld:0,
      qyryNum:0,
      qnryNum:0,
      isNoyesterday:true,
    };
  }
  componentDidMount() {
    // this.getScreenConfig();
    ipcRenderer.send('get-data',{key_name:'dataList'});
    ipcRenderer.on('get-data-reply', this.getList);
    this.showNowTime();
  }
  getList = (event, data) => {
    let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let dataList = data&&data!==undefined ? data : null;
    if(dataList){
      let lzyqNumOld = 0;
      let ysblNumOld = 0;
      let yxglNumOld = 0;
      let jjglNumOld = 0;
      let qzblNumOld = 0;
      if(dataList.timeList){
        dataList.timeList.map((item)=>{
          if(item.time === yesterday){
            lzyqNumOld = item.count1;
            ysblNumOld = item.count2;
            qzblNumOld = item.count3;
            yxglNumOld = item.count4;
            jjglNumOld = item.count5;
            this.setState({
              isNoyesterday:false,
            })
          }
        })
      }
      let lzyqXzNum = dataList.lzyqNum&&lzyqNumOld ? dataList.lzyqNum - lzyqNumOld : 0;
      let ysblXzNum = dataList.ysblNum&&ysblNumOld ? dataList.ysblNum - ysblNumOld : 0;
      let yxglXzNum = dataList.yxglNum&&yxglNumOld ? dataList.yxglNum - yxglNumOld : 0;
      let jjglXzNum = dataList.jjglNum&&jjglNumOld ? dataList.jjglNum - jjglNumOld : 0;
      let qzblXzNum = dataList.qzblNum&&qzblNumOld ? dataList.qzblNum - qzblNumOld : 0;
      this.setState({
        dataList:dataList,
        listBar:dataList&&dataList.listBar ? dataList.listBar : [
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
        lzyqNum:dataList&&dataList.lzyqNum ? dataList.lzyqNum : 0,
        qyryNum:dataList&&dataList.qyryNum ? dataList.qyryNum : 0,
        qnryNum:dataList&&dataList.qnryNum ? dataList.qnryNum : 0,
        ysblNum:dataList&&dataList.ysblNum ? dataList.ysblNum : 0,
        qzblNum:dataList&&dataList.qzblNum ? dataList.qzblNum : 0,
        yxglNum:dataList&&dataList.yxglNum ? dataList.yxglNum : 0,
        jjglNum:dataList&&dataList.jjglNum ? dataList.jjglNum : 0,
        lzyqXzNum: lzyqXzNum > 0 ? lzyqXzNum : 0,
        yxglXzNum: yxglXzNum > 0 ? yxglXzNum : 0,
        jjglXzNum: jjglXzNum > 0 ? jjglXzNum : 0,
        ysblXzNum:ysblXzNum > 0 ? ysblXzNum : 0,
        qzblXzNum:qzblXzNum > 0 ? qzblXzNum : 0,
        mapData:dataList&&dataList.mapData ? dataList.mapData : [],
        timeList:dataList&&dataList.timeList ? dataList.timeList : [{ count1: 0, count2:0,count3:0,time: moment().format('YYYY-MM-DD') }],
        lzyqNumOld,
        ysblNumOld ,
        qzblNumOld,
        yxglNumOld,
        jjglNumOld,
      });
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  showOpenDialogHandler = () => {
    var options = {
      defaultPath: 'D:\\',
      filters: [{ name: 'Execute', extensions: ['xlsx','xls'] }],
      properties: ['openFile'],
    };

    dialog.showOpenDialog(options, fileNames => {
      // fileNames is an array that contains all the selected
      this.setState({
        exeName: '',
      });
      if (fileNames === undefined) {
        return;
      } else {
        fileNames.map(f => {
          ipcRenderer.send('open-link', fileNames[0]);
        });
      }
    });
  };
  sortKey=(array, key)=> {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let listBar = [];
        let timeList = [...this.state.timeList];
        let lzyqNum = 0;
        let ysblNum = 0;
        let yxglNum = 0;
        let jjglNum = 0;
        let qzblNum = 0;
        let qyryNum = 0;
        let qnryNum = 0;
        let lzyqNumOld = this.state.lzyqNumOld;
        let ysblNumOld = this.state.ysblNumOld;
        let qzblNumOld = this.state.qzblNumOld;
        let yxglNumOld = this.state.yxglNumOld;
        let jjglNumOld = this.state.jjglNumOld;
        let mapData = [];
        let isToday = false;
        let numIndex = timeList.length - 1;
        this.state.listMap.map((item,idx)=>{
          let count = parseInt(values['qyry'+idx]) + parseInt(values['qnry'+idx]);
            listBar.push({name:item.name, count:count,count0: values['qyry'+idx], count1: values['qnry'+idx],
            count2: values['ysbl'+idx], count3: values['qzbl'+idx],
            count4: values['yxgl'+idx], count5: values['jjgl'+idx],
            count6: values['mqjcz'+idx], count7: values['zlyqry'+idx],
            count8: values['zdryxs'+idx], count9: values['fbglyqd'+idx],
          });
          lzyqNum = lzyqNum + count;
          ysblNum = ysblNum + parseInt(values['ysbl'+idx]);
          yxglNum = yxglNum + parseInt(values['yxgl'+idx]);
          jjglNum = jjglNum + parseInt(values['jjgl'+idx]);
          qyryNum = qyryNum + parseInt(values['qyry'+idx]);
          qnryNum = qnryNum + parseInt(values['qnry'+idx]);
          qzblNum = qzblNum + parseInt(values['qzbl'+idx]);
          timeList.map((event,index)=>{
            if(event.time === this.state.dateString){
              isToday = true;
              numIndex = index;
            }
          });
          mapData.push({ name:item.name,org: item.code, count:parseInt(values['qzbl'+idx]), count1:count, count2:parseInt(values['ysbl'+idx])});
        });
        if(isToday){
          timeList[numIndex] = {time:this.state.dateString, count1: lzyqNum,count2: ysblNum, count3: qzblNum, count4: yxglNum, count5: jjglNum};
        }else{
          timeList.push({time:this.state.dateString, count1: lzyqNum,count2: ysblNum, count3: qzblNum, count4: yxglNum, count5: jjglNum});
        }
        timeList.sort(function(a,b){
          return Date.parse(a.time) - Date.parse(b.time);//时间正序
        });
          let lzyqXzNum = lzyqNum - lzyqNumOld;
          let ysblXzNum = ysblNum - ysblNumOld;
          let qzblXzNum = qzblNum - qzblNumOld;
          let yxglXzNum = yxglNum - yxglNumOld;
          let jjglXzNum = jjglNum - jjglNumOld;
          // cookie.save('listBar',listBar, {maxAge: 31536000});
          // cookie.save('mapData',mapData, {maxAge: 31536000});
          // cookie.save('timeList',timeList, {maxAge: 31536000});
          // cookie.save('lzyqNum',lzyqNum, {maxAge: 31536000});
          // cookie.save('ysblNum',ysblNum, {maxAge: 31536000});
          // cookie.save('qzblNum',qzblNum, {maxAge: 31536000});
          // cookie.save('lzyqXzNum',lzyqXzNum, {maxAge: 31536000});
          // cookie.save('ysblXzNum',ysblXzNum, {maxAge: 31536000});
          // cookie.save('qzblXzNum',qzblXzNum, {maxAge: 31536000});
        if(this.state.dateString === moment().format('YYYY-MM-DD')){
          let dataList = {
            listBar,
            lzyqNum,
            ysblNum,
            yxglNum,
            jjglNum,
            yxglXzNum,
            jjglXzNum,
            qzblNum,
            lzyqXzNum,
            ysblXzNum,
            qzblXzNum,
            mapData,
            timeList,
            qnryNum,
            qyryNum
          }
          ipcRenderer.send('set-data', {key_name:'dataList',value:dataList});
          ipcRenderer.send('get-data',{key_name:'dataList'});
          this.setState({
            listBar,
            lzyqNum,
            ysblNum,
            qzblNum,
            yxglNum,
            jjglNum,
            yxglXzNum,
            jjglXzNum,
            lzyqXzNum,
            ysblXzNum,
            qzblXzNum,
            mapData,
            timeList,
            dataList,
            qnryNum,
            qyryNum
          });
        }else{
          let dataList = this.state.dataList;
          if(dataList&&dataList.timeList){
            dataList.timeList = timeList;
          }else{
            dataList = {
              timeList,
            }
          }
          ipcRenderer.send('set-data', {key_name:'dataList',value:dataList});
          ipcRenderer.send('get-data',{key_name:'dataList'});
          this.setState({
            timeList,
            dataList,
          });
        }
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
  setAreaName = name =>{
    this.setState({
      orgName: name,
    });
  }
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
  onChange=(date, dateString)=>{
    this.setState({
      dateString:dateString,
    })
  }
  setRowClassName = (record) => {
    return record.name === this.state.orgName ? styles.RowStyle : '';
  }
  render() {
    const {form: { getFieldDecorator }} = this.props;
    let dataSource = this.state.listBar;

    const columns = [
      {
        title: '地区',
        dataIndex: 'name',
        width:90,
        key: 'name',
      },
      {
        title: '区外人员',
        dataIndex: 'count0',
        key: 'count0',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },{
        title: '区内人员',
        dataIndex: 'count1',
        key: 'count1',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '疑似病例',
        dataIndex: 'count2',
        key: 'count2',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '确诊病例',
        dataIndex: 'count3',
        key: 'count3',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '医学隔离',
        dataIndex: 'count4',
        key: 'count4',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '居家隔离',
        dataIndex: 'count5',
        key: 'count5',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '密切接触者',
        dataIndex: 'count6',
        key: 'count6',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '滞留疫区人员',
        dataIndex: 'count7',
        key: 'count7',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '重点人员线索',
        dataIndex: 'count8',
        key: 'count8',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
      {
        title: '封闭管理疫情点',
        dataIndex: 'count9',
        key: 'count9',
        render: text => {
          return <span>{text ? text : 0}</span>
        }
      },
    ];
    return (
      <div className={styles.SCMDataShow}>
        {/*<div className={styles.goBack} onClick={this.goBack}><Icon type="left" /> 返回</div>*/}
        <div className={styles.header}>
          <img src={headerLeftImg} alt="" />
          {/*<img className={styles.showTitle} src={headerTitleImg} alt="智慧案件管理系统"/>*/}
          <div className={styles.titleName}>平南县公安局肺炎疫情防控管理系统</div>
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
            <div className={styles.globalCards} onClick={this.showOpenDialogHandler.bind(this)}>
              <div>确诊病例</div>
              <div>{this.state.qzblNum}人</div>
              {!this.state.isNoyesterday ?<div className={styles.borderTop}>较上日+{this.state.qzblXzNum}人</div>:''}
            </div>
            <div className={styles.globalCards} style={{backgroundColor:'#ff9800'}} onClick={this.showOpenDialogHandler.bind(this)}>
              <div>疑似病例</div>
              <div>{this.state.ysblNum}人</div>
              {!this.state.isNoyesterday ?<div className={styles.borderTop}>较上日+{this.state.ysblXzNum}人</div>:''}
            </div>
            <div className={styles.glBox}>
              <div className={styles.globalCards1} style={{backgroundColor:'#03A9F4'}} onClick={this.showOpenDialogHandler.bind(this)}>
                <div>医学隔离</div>
                <div>{this.state.yxglNum}人</div>
                {!this.state.isNoyesterday ?<div className={styles.borderTop}>较上日+{this.state.yxglXzNum}人</div>:''}
              </div>
              <div className={styles.globalCards1} style={{backgroundColor:'#8BC34A'}} onClick={this.showOpenDialogHandler.bind(this)}>
                <div>居家隔离</div>
                <div>{this.state.jjglNum}人</div>
                {!this.state.isNoyesterday ?<div className={styles.borderTop}>较上日+{this.state.jjglXzNum}人</div>:''}
              </div>
            </div>
            <div className={styles.glBox}>
              <div className={styles.globalCards1} style={{backgroundColor:'#7106c1',height:'310px'}} onClick={this.showOpenDialogHandler.bind(this)}>
                  <div className={styles.zdry}>重点人员</div>
                <div style={{margin:'20px 0'}}>
                  <div>区外人员</div>
                  <div>{this.state.qyryNum}人</div>
                </div>
                <div style={{margin:'20px 0'}}>
                  <div>区内人员</div>
                  <div>{this.state.qnryNum}人</div>
                </div>
                 {!this.state.isNoyesterday ? <div className={styles.borderTop}>较上日+{this.state.lzyqXzNum}人</div>:''}
              </div>
            </div>
          </div>
          <div className={styles.wrapMiddle}>
            <div className={styles.mapCard}>
              {
                this.state.map ?  <ChinaMap {...this.state} {...this.props} setAreaName={this.setAreaName} setAreaCode={this.setAreaCode} getMap={this.getMap}/> : <ShowNumber {...this.state} {...this.props} getMap={this.getMap}/>
              }
              {/*<ShowNumber {...this.state} {...this.props} getMap={this.getMap} setAreaCode={this.setAreaCode}/>*/}
            </div>
            {/*<div className={styles.longCard}>*/}
            {/*  <PoliceSituationToCaseCount {...this.props} {...this.state} />*/}
            {/*</div>*/}
          </div>
          <div className={styles.wrapRight}>
            <div className={styles.globalCardRight}>
              <Table dataSource={dataSource} columns={columns} bordered pagination={false} rowClassName={this.setRowClassName}/>
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
              {/*<DossierCount {...this.props} {...this.state} />*/}
            <PoliceSituationToCaseCount {...this.props} {...this.state} />
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
              <Row gutter={16}>
                <Col span={7} style={{textAlign:'right'}}>日期：</Col>
                <Col span={17}>
                  <Form.Item>
                    {getFieldDecorator('time', {
                      initialValue:moment(this.state.dateString, 'YYYY-MM-DD'),
                    })(<DatePicker onChange={this.onChange} style={{width:'100%'}}/>)}
                  </Form.Item>
                </Col>
              </Row>
              {
                this.state.listMap.map((item,idx)=>{
                  return <Row gutter={16}>
                    <Col span={7} style={{textAlign:'right'}}>{item.name}：</Col>
                    <Col span={17}>
                      <Form.Item label="区外人员">
                        {getFieldDecorator('qyry'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count0 ? this.state.listBar[idx].count0 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="区内人员">
                        {getFieldDecorator('qnry'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count1 ? this.state.listBar[idx].count1 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="疑似病例">
                        {getFieldDecorator('ysbl'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count2 ? this.state.listBar[idx].count2 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="确诊病例">
                        {getFieldDecorator('qzbl'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count3 ? this.state.listBar[idx].count3 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="医学隔离">
                        {getFieldDecorator('yxgl'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count4 ? this.state.listBar[idx].count4 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="居家隔离">
                        {getFieldDecorator('jjgl'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count5 ? this.state.listBar[idx].count5 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="密切接触者">
                        {getFieldDecorator('mqjcz'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count6 ? this.state.listBar[idx].count6 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="滞留疫区人员">
                        {getFieldDecorator('zlyqry'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count7 ? this.state.listBar[idx].count7 : 0,
                          rules: [{ required: true, message: '请输入人数' }],
                        })(<Input placeholder="请输入人数" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="重点人员线索">
                        {getFieldDecorator('zdryxs'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count8 ? this.state.listBar[idx].count8 : 0,
                          rules: [{ required: true, message: '请输入' }],
                        })(<Input placeholder="请输入" /> )}
                      </Form.Item>
                    </Col>
                    <Col span={7} style={{textAlign:'right'}}></Col>
                    <Col span={17}>
                      <Form.Item label="封闭管理疫情点">
                        {getFieldDecorator('fbglyqd'+idx, {
                          initialValue:this.state.listBar[idx] && this.state.listBar[idx].count9 ? this.state.listBar[idx].count9 : 0,
                          rules: [{ required: true, message: '请输入' }],
                        })(<Input placeholder="请输入" /> )}
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

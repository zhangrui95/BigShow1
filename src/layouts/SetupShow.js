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
    };
  }
  componentDidMount() {
    // this.getScreenConfig();
    this.showNowTime();
  }
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
  render() {
    return (
      <div className={styles.SCMDataShow}>
        <div className={styles.header}>
          <img src={headerLeftImg} alt="" />
          {/*<img className={styles.showTitle} src={headerTitleImg} alt="智慧案件管理系统"/>*/}
          <div className={styles.titleName}>执法监督系统</div>
          <img src={headerRightImg} alt="" />
          <div className={styles.nowTime}>
            <span>
              当前时间：
              {this.state.nowTime}
            </span>
          </div>
          <div className={styles.dateButtons}>
             <span className={this.state.currentDateType === 'day' ? styles.currentDate : null}
                   onClick={() => this.changeCurrentDate('day')}>本日</span>
            <span className={this.state.currentDateType === 'week' ? styles.currentDate : null} onClick={() => this.changeCurrentDate('week')}>本周</span>
            <span className={this.state.currentDateType === 'month' ? styles.currentDate : null}
                  onClick={() => this.changeCurrentDate('month')}>本月</span>
          </div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.wrapLeft}>
            <div className={styles.globalCard}>
              <PoliceSituationFrom {...this.props} {...this.state} />
            </div>
            <div className={styles.globalCard}>
              <PersonCount {...this.props} {...this.state} />
            </div>
            <div className={styles.globalCard}>
              <AjNum {...this.props} {...this.state} />
            </div>
          </div>
          <div className={styles.wrapMiddle}>
            <div className={styles.mapCard}>
              <ChinaMap {...this.state} {...this.props} setAreaCode={this.setAreaCode} />
            </div>
            <div className={styles.longCard}>
              <PoliceSituationToCaseCount {...this.props} {...this.state} />
            </div>
          </div>
          <div className={styles.wrapRight}>
            <div className={styles.globalCard}>
              <HandingVideoAreaPlaying {...this.props} {...this.state} />
            </div>
            <div className={styles.globalCard}>
              <CaseItemWarningCount {...this.props} {...this.state} />
            </div>
            <div className={styles.globalCard}>
              <DossierCount {...this.props} {...this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetupShow;

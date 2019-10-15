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
import AjNum from '../components/Show/bigScreenDisplay/AjNum';

class SetupShow extends React.PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      nowTime: moment().format('YYYY-MM-DD HH:mm'),
      selectDate: [
        moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      mapLoopTime: 3,
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
            {/*<span className={currentDateType === 'week' ? styles.currentDate : null} onClick={() => this.changeCurrentDate('week')}>本周</span>*/}
            {/*<span className={currentDateType === 'month' ? styles.currentDate : null}*/}
            {/*      onClick={() => this.changeCurrentDate('month')}>本月</span>*/}
            {/*<span className={currentDateType === 'year' ? styles.currentDate : null}*/}
            {/*      onClick={() => this.changeCurrentDate('year')}>本年</span>*/}
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
            <div className={styles.globalCard} />
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

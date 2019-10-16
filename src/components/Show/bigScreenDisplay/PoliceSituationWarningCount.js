/*
* PoliceSituationWariningCount.js 智慧案管大屏----警情告警统计
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import styles from './bigScreenDisplay.less';
import img1 from '../../../assets/show/policeWarningCount_1.png';
import img2 from '../../../assets/show/policeWarningCount_2.png';

let myChart;

export default class PoliceSituationWarningCount extends PureComponent {
  state = {
    notHandleNum: 0,
    noResultNum: 0,
  };

  componentDidMount() {
    const { selectDate, org, orgCode, orglist } = this.props;
    this.getPoliceSituationWarningCount(selectDate[0], selectDate[1], org, orgCode, orglist);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.currentDateType !== nextProps.currentDateType|| this.props.org !== nextProps.org) {
        this.getPoliceSituationWarningCount();
      }
    }
  }

  // 获取行政处罚数量
  getPoliceSituationWarningCount = () => {
          let notHandleNum = 0;
          let noResultNum = 0;
          let dataList = [ { name: '办案中心', count:  Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '001' },
            { name: '办案区', count:  Math.floor(Math.random()*(100 - 1) + 1), jjly_dm: '002' },]
          for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].name === '办案中心') notHandleNum = dataList[i].count;
            if (dataList[i].name === '办案区') noResultNum = dataList[i].count;
          }
          this.setState({
            notHandleNum,
            noResultNum,
          });
          let num = parseInt(notHandleNum) + parseInt(noResultNum);
  };

  render() {
    const { notHandleNum, noResultNum } = this.state;
    return (
      <div id="PoliceSituationWarningCount" style={{ height: '100%', width: '100%' }}>
        <h4 className={styles.cardTitle}>办案场所数量</h4>
        <div className={styles.cardContent}>
          <div className={styles.animateArea}>
            <img src={img1} alt="" />
            <div className={styles.pWarningCoutNum}>{noResultNum}</div>
            <div className={styles.pWarningCoutName}>办案中心</div>
          </div>
          <div className={styles.animateArea}>
            <img src={img2} alt="" />
            <div className={styles.pWarningCoutNum}>{notHandleNum}</div>
            <div className={styles.pWarningCoutName}>办案区</div>
          </div>
        </div>
      </div>
    );
  }
}

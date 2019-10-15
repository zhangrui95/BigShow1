/*
* HandingVideoAreaPlaying.js 新大屏展示页面 办案区视频播放
* author：jhm
* 20181212
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Avatar } from 'antd';
import styles from '../ComponentStyles.less';
import video0 from '../../../assets/show/02.mp4';
import video1 from '../../../assets/video1.mp4';
import video2 from '../../../assets/video2.mp4';
import video3 from '../../../assets/video3.mp4';
import videoShow from '../../../assets/show/video_show.JPG';

export default class HandingVideoAreaPlaying extends PureComponent {
  state={
    tabList:['办案区视频','执法办案场所','执法记录仪','涉案财物场所'],
    idx: 0,
    video:video0,
  }

  componentDidMount() {
    this.getVideoList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.currentDateType !== nextProps.currentDateType|| this.props.org !== nextProps.org) {
        this.getVideoList();
      }
    }
  }

  getVideoList = areaCode => {

  };

  videoPlay = (personId, handleareaNum) => {};
  getTab = (idx) =>{
    this.getVideoList();
    this.setState({
      idx:idx,
    });
    if(idx === 0){
      this.setState({
        video:video0,
      });
    }else if(idx === 1){
      this.setState({
        video:video1,
      });
    }else if(idx === 2){
      this.setState({
        video:video2,
      });
    }else if(idx === 3){
      this.setState({
        video:video3,
      });
    }
  }
  render() {
    return (
      <div className={styles.componentBlock}>
        <div
          className={styles.videoShow}
          style={{ overflowX: 'hidden', backgroundColor: 'transparent' }}
        >
          <div>
            <div className={styles.smallBlock}>
              <div className={styles.blockHeader}>
                <div className={styles.cardTitleBox}>
                  {
                    this.state.tabList.map((item,idx)=>{
                      return <div className={this.state.idx === idx ? styles.cardTitles : styles.cardTitles + ' ' + styles.cardTitleGray} onClick={()=>this.getTab(idx)}>{item}</div>
                    })
                  }
                </div>
              </div>
            </div>
            <video
              ref="videoPlayer"
              src={this.state.video}
              width="460"
              height="220"
              poster={videoShow}
              loop
              controls="controls"
            />
          </div>
        </div>
      </div>
    );
  }
}

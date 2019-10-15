/*
* HandingVideoAreaPlaying.js 新大屏展示页面 办案区视频播放
* author：jhm
* 20181212
* */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Avatar } from 'antd';
import styles from '../ComponentStyles.less';
import video02 from '../../../assets/show/02.mp4';
import videoShow from '../../../assets/show/video_show.JPG';

export default class HandingVideoAreaPlaying extends PureComponent {
  state = {};

  componentDidMount() {
    this.getVideoList(this.props.areaCode);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.areaCode !== nextProps.areaCode) {
        this.getVideoList(nextProps.areaCode);
      }
    }
  }

  getVideoList = areaCode => {};

  videoPlay = (personId, handleareaNum) => {};

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
                <h4>办案区视频</h4>
              </div>
            </div>
            <video
              ref="videoPlayer"
              src={video02}
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

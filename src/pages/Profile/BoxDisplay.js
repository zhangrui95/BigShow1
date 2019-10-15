/*!
* BoxDisplay.js
* author:ghn
* date: 2018/7/13
 <BoxDisplay
    cabinet={cabinet} //箱子数据 必填
    scale={scale}   缩放比例 必填
    selectType ={0} //选择类型  0:无选择功能，1 单选 2多选 不传默认0
    setBoxInfo={this.setBoxInfo} 父组件需要的当前选中柜子详情
    examplesFomtColor ={'#fff'}  //右侧字体示例颜色展示
/>
*/
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Icon, Popconfirm } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './BoxDisplay.less';
import { select } from 'redux-saga/effects';

export default class BoxDisplay extends PureComponent {
  state = {
    boxInfo: [],
    selectType: this.props.selectType ? this.props.selectType : 0, //是否复选
  };

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (this.state.selectType !== nextProps.selectType) {
        this.setState({
          selectType: nextProps.selectType ? nextProps.selectType : 0, //是否复选
        });
      }
      if (nextProps.cancelBox !== this.props.cancelBox) {
        // this.setState({
        //     boxInfo: nextProps.confirmVisible ? this.state.boxInfo : [],
        // });
        //if (nextProps.cancelBox) {
        this.setState({
          boxInfo: [],
        });
        //}
      }
    }
  }
  //展示存储柜
  renderBox = (list, scale) => {
    if (list == undefined) {
      return <div style={{ textAlign: 'center', minHeight: '300px' }}>暂无数据</div>;
    }

    let mainWidth = this.mainWidth(list); //获取存储柜实际总宽度
    mainWidth = mainWidth * scale;
    if (list.length === 0) {
      return <div style={{ textAlign: 'center', minHeight: '300px' }}>暂无数据</div>;
    }
    // 计算元素的宽度，来判断柜子位置
    let ele = document.getElementById('boxWrap');
    let widthEle = ele ? ele.offsetWidth : null;
    let isBig = widthEle ? mainWidth - widthEle : 0;
    return (
      <div>
        <div
          className={styles.main}
          style={{
            marginLeft: isBig > 0 ? `0px` : `-${mainWidth / 2 + 24}px`,
            background: '#fff',
            left: isBig > 0 ? '0' : '50%',
          }}
        >
          {/* <div className={styles.main}> */}
          {list.map(item => {
            const isHaveScreen = this.isHaveScreen(item); //判断此组中是否有屏幕显示器
            let beforeScreenConut = -1;
            if (isHaveScreen) {
              beforeScreenConut = this.beforeScreenConut(item);
            }
            return (
              <div
                className={
                  isHaveScreen
                    ? beforeScreenConut > 1
                      ? styles.hasScreenGroup
                      : styles.hasOneScreenGroup
                    : styles.group
                }
              >
                {item.length > 0 &&
                  item.map((data, index) => {
                    return this.groupOrBoxByType(data, scale, index); //根据每组数据不同，获取展示不同样式
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  //获取存储柜总宽度
  mainWidth = list => {
    if (list == undefined) return;

    let width = 0;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const isHaveScreen = this.isHaveScreen(list[i]); //判断此组中是否有屏幕显示器
        if (isHaveScreen) {
          width += this.screenWidth(list[i]);
        } else {
          width += parseInt(list[i][0].box_width);
        }
      }
    }
    return width;
  };

  //获取存储柜总高度
  mainHeight = list => {
    if (list == undefined) return;

    let height = 0;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const isHaveScreen = this.isHaveScreen(list[i]); //判断此组中是否有屏幕显示器

        if (!isHaveScreen && height === 0) {
          const data = list[i];
          for (let j = 0; j < data.length; j++) {
            height += parseInt(data[j].box_hight);
          }
        } else {
        }
      }
    }

    return height;
  };

  //根据数据类型，返回不同展示
  groupOrBoxByType = (data, scale) => {
    let {
      box_id: name,
      box_width: width,
      box_hight: height,
      jurisdictionName: userName,
      dossiercount: dossiercount,
      jurisdictionName: jurisdictionName,
    } = data;
    //name：柜号，width宽，height高，userName使用人
    let type = data.box_type === '105601' ? 0 : data.box_type === '105602' ? 1 : ''; //柜子类型105601:箱子105602:显示屏
    //let showIsUse = data.box_status === '0' ? 3 : data.isUse === 1 ? 1 : 0// showIsUse状态 0可用 1：占用 3：不可用
    let showIsUse = 0; //data.jurisdiction === 0 ? 0 : 1// showIsUse状态 0可用 1：占用 3：不可用

    width = scale * width;
    height = scale * height;
    if (type === 0) {
      //柜
      //TODo:修改点击箱子传递的参数变更成id
      if (this.isSelect(data)) {
        //空闲房间中的选中
        return (
          <div
            key={name}
            className={styles.selectBox}
            style={{ width: width, height: height }}
            onClick={() => this.onClickBox(data)}
          >
            <span className={styles.boxNumber}> {name}</span>
            {/* {
                            dossiercount ? 
                            <span className={styles.userDetails2}> {dossiercount}卷</span> : 
                            ''
                        } */}
            <span className={styles.userDetails}> {dossiercount}卷</span>
            <span className={styles.userDetails2}> {jurisdictionName}</span>
            {dossiercount != 0 ? (
              <span className={styles.userDetails3}> 已使用</span>
            ) : (
              <span className={styles.userDetails3}> 未使用</span>
            )}
          </div>
        );
      } else {
        //空闲房间中的 取消选中
        return (
          <div
            key={name}
            className={styles.box}
            style={{ width: width, height: height }}
            onClick={() => this.onClickBox(data)}
          >
            <span className={styles.boxNumber}> {name}</span>
            {/* {
                            dossiercount ? 
                            <span className={styles.userDetails}> {dossiercount}卷</span> : 
                            ''
                        } */}
            <span className={styles.userDetails}> {dossiercount}卷</span>
            <span className={styles.userDetails2}> {jurisdictionName}</span>
            {dossiercount != 0 ? (
              <span className={styles.userDetails3}> 已使用</span>
            ) : (
              <span className={styles.userDetails3}> 未使用</span>
            )}
          </div>
        );
      }
    } else if (type === 1) {
      //显示屏幕
      return (
        <div key={name} className={styles.screen} style={{ width: width, height: height }}>
          <div className={styles.touchScreen}>
            <span className={styles.name}>{name}</span>
          </div>
          <div className={styles.screenBottom}>
            <div className={styles.content} />
          </div>
        </div>
      );
    }
  };

  //通过data判断箱子是否选中 true 选中 false未选中
  isSelect = data => {
    const { boxInfo } = this.state;
    const arry = boxInfo.map(item => ({ ...item })); //复制数组
    let isSelect = false;
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].box_id === data.box_id) {
        isSelect = true;
      }
    }
    return isSelect;
  };

  //点击柜子显示
  onClickBox = data => {
    const id = data;
    const { boxInfo, selectType } = this.state;
    if (selectType === 1) {
      //单选
      if (this.isSelect(data)) {
        this.setState({
          boxInfo: [],
        });
        if (this.props.setBoxInfo) {
          this.props.setBoxInfo([]); //将父组件存储的boxId清空
        }
      } else {
        this.setState({
          boxInfo: [data],
        });
        if (this.props.setBoxInfo) {
          this.props.setBoxInfo([data]); //将父组件存储的boxId清空
          // this.props.confirmOpenBox();
        }
      }
    } else if (selectType === 2) {
      //多选
      const arry = boxInfo.map(item => ({ ...item })); //复制数组

      if (this.isSelect(data)) {
        //已经选中
        for (let i = 0; i < arry.length; i++) {
          if (arry[i].box_id === data.box_id) {
            //如果数组中已经存在选中箱子，则去掉选中
            arry.splice(i, 1);
          }
        }
      } else {
        //未选中
        arry.push(data);
      }
      if (this.props.setBoxInfo) {
        this.props.setBoxInfo(arry); //将父组件存储的boxId清空
      }
      this.setState({
        boxInfo: arry,
      });
    }
  };

  //判断当前组中是否带有显示屏幕
  isHaveScreen = item => {
    let isHaveScreen = false;
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        const type = item[i].box_type === '105601' ? 0 : item[i].box_type === '105602' ? 1 : ''; //柜子类型105601:箱子105602:显示屏
        if (type === 1) {
          isHaveScreen = true;
        }
      }
    }
    return isHaveScreen;
  };
  //获取当前有显示屏幕数组中显示屏前有多少数据
  beforeScreenConut = item => {
    let count = 0;
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        const type = item[i].box_type === '105601' ? 0 : item[i].box_type === '105602' ? 1 : ''; //柜子类型105601:箱子105602:显示屏
        if (type === 1) {
          count = i;
        }
      }
    }
    return count;
  };

  //获取存储显示屏幕的宽
  screenWidth = data => {
    let screenWidth = 0;
    for (let i = 0; i < data.length; i++) {
      let type = data[i].box_type === '105601' ? 0 : data[i].box_type === '105602' ? 1 : ''; //柜子类型105601:箱子105602:显示屏
      let width = parseInt(data[i].box_width);
      if (type === 1) {
        screenWidth = width;
      }
    }
    return screenWidth;
  };

  render() {
    const scale = this.props.scale; //箱子缩放比例
    const cabinetData = this.props.cabinet; //柜子数据
    let mainHeight = this.mainHeight(cabinetData);
    mainHeight = mainHeight * scale;
    return (
      <div
        style={{ minHeight: `${mainHeight + 24}px`, overflow: 'auto', position: 'relative' }}
        id="boxWrap"
      >
        {this.renderBox(cabinetData, scale)}
      </div>
    );
  }
}

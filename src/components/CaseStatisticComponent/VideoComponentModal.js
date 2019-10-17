/*
* VideoComponentModal.js 音频信息
* author：jhm
* 20181016
* */
import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Radio,
  Modal,
  Form,
  DatePicker,
  TreeSelect,
  Select,
  Button,
  Upload,
  Table,
  message,
  Icon,
} from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './VideoComponentModal.less';
import videoimg from '../../../public/images/play.jpg';
import video1 from '../../assets/videoplay1.mp3';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TreeNode = TreeSelect.TreeNode;
const { Option } = Select;


@Form.create()
export default class VideoComponentModal extends PureComponent {
  state = {
    visibleVideo: false,
    editvisible: false,
    DeleteVisible: false,
    data: this.props.record.yp,
    newypUid:'',
    addInputValue:'',
    uploadloading:false,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // // 无法选择的日期
  // disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current.valueOf() > Date.now();
  // };
  // handleSearch = (e) => {
  //   if (e) e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       this.props.SearchSuccess(values);
  //     }
  //   });
  // }
  // // 渲染机构树
  // renderloop = data => data.map((item) => {
  //   if (item.childrenList && item.childrenList.length) {
  //     return <TreeNode value={item.code} key={item.code} title={item.name}>{this.renderloop(item.childrenList)}</TreeNode>;
  //   }
  //   return <TreeNode key={item.code} value={item.code} title={item.name} />;
  // });
  // resetSearch = () => {
  //   this.props.form.resetFields();
  // }
  foot = () => {
    return (
      <div>
        {/*<Button type="primary" onClick={this.handleSearch}>查询</Button>*/}
        <Button onClick={this.props.CloseVideoComponent}>关闭</Button>
      </div>
    );
  };
  edit = record => {
    this.setState({
      editvisible: true,
      newypUid:record.uid,
    });

  };
  CaseDetail = (record, flag) => {
    this.setState({
      visibleVideo: !!flag,
    });
    // <video
    //   controls
    //   preload="auto"
    //   width='100%'
    //   height="40%"
    //   poster="video/cover.png"
    //   data-setup="{}"
    //   autoPlay
    // >
    //   <source src={require('@/assets/video4.mp4')} type="video/mp4" />
    // </video>
  };
  CloseEditmodal = () => {
    this.setState({
      editvisible: false,
    });
  };
  Onok = () => {
    const {newypUid} = this.state;
    const newData = [...this.state.data];

    const index = newData.findIndex((item)=>{
      return item.uid === newypUid
    })
    newData[index].name = this.state.addInputValue;

    this.setState({
      editvisible: false,
      data:newData,
    });
  };
  Delete = (record) => {
    this.setState({
      DeleteVisible: true,
      newypUid:record.uid,
    });
    const { data,newypUid } = this.state;
    const newData = [...this.state.data]
    // const record = [...this.props.record];
    // console.log('record',record);
    // console.log()
    const index = newData.findIndex((item)=>{
      return item.uid === newypUid
    })
    newData.splice(index, 1);
    this.setState({
      data:newData,
    })
  };
  CloseDeletemodal = () => {
    this.setState({
      DeleteVisible: false,
    });
  };
  OnDeleteOk = () => {
    message.success('删除成功');
  };
  ypOnChange = (val) => {
    console.log('value',val.target.value)
    this.setState({
      addInputValue:val.target.value,
    })
  }
  render() {
    const that = this;
    const {
      form: { getFieldDecorator },
      treeDefaultExpandedKeys,
      depTree,
      CaseStatusType,
      record,
    } = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, md: { span: 8 }, xl: { span: 6 } },
      wrapperCol: { xs: { span: 24 }, md: { span: 16 }, xl: { span: 18 } },
    };
    const { editvisible, visibleVideo, DeleteVisible } = this.state;
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList:this.state.uploadloading,
      onChange(info) {
        console.log('info',info)
        that.setState({
          uploadloading:true,
        });
        if (info.file.status !== 'uploading'){
          const mewyp = {
            uid: '3',
            name: info.file.name,
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          };
          const newData = [...that.state.data];
          newData.push(mewyp);
          that.setState({
            data: newData,
            uploadloading:false,
          });
        }
      },
    };
    const columns = [
      {
        title: '音频名称',
        dataIndex: 'name',
        width: 900,
        render: text => {
          return (
            <Ellipsis tooltip length="24">
              {text}
            </Ellipsis>
          );
        },
      },

      {
        title: '操作',
        width: 200,
        render: record => (
          <div>
            <a onClick={() => this.CaseDetail(record, true)}>
              <img src={videoimg} />
            </a>
            <a onClick={() => this.edit(record)} style={{ marginLeft: 32 }}>
              编辑
            </a>
            <a onClick={() => this.Delete(record)} style={{ marginLeft: 32 }}>
              删除
            </a>
          </div>
        ),
      },
    ];
    console.log('record', record, this.state.data);
    return (
      <div>
        <Modal
          visible={this.props.visible}
          className={styles.shareHeader}
          title="音频信息"
          centered
          width={1200}
          maskClosable={false}
          onCancel={this.props.CloseVideoComponent}
          footer={this.foot()}
        >
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 添加
            </Button>
          </Upload>
          <Table
            size={'middle'}
            rowKey={record => record.key}
            dataSource={this.state.data}
            columns={columns}
            style={{ width: '100%' }}
          />
        </Modal>

        {editvisible ? (
          <Modal
            title="音频编辑"
            visible={editvisible}
            centered
            maskClosable={false}
            onCancel={this.CloseEditmodal}
            onOk={this.Onok}
          >
            音频名称：
            <input placeholder="请输入音频名称" onChange={this.ypOnChange} />
          </Modal>
        ) : null}

        {visibleVideo ? (
          <Modal
            title="音频播放"
            visible={visibleVideo}
            width={825}
            footer={null}
            onCancel={() => {
              this.setState({
                visibleVideo: false,
              });
            }}
          >
            <audio src={video1} controls="controls" />
          </Modal>
        ) : null}

      </div>
    );
  }
}

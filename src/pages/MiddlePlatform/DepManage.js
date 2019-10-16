/**
 * DepManage.js 机构管理
 * author： lyp
 * 20191015
 */
import React, { PureComponent } from 'react';
import {Layout, Card, Form, Select, Modal, Button, Icon, Input, message } from 'antd';
import moment from 'moment/moment';
import GroupTree from './GroupTree';
import GroupTable from './GroupTable';
import styles from './GroupManagement.less';
import groupTreeDefaultData from './group';
import { makeUuid } from '../../utils/utils';

const { Content, Sider } = Layout;
const { confirm } = Modal;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()

export default class DepManage extends PureComponent {
  state = {
    selectedkeys: [],
    addModalVisible: false,
    formValues: {},
    modalType: '',
    treeId: 0,
    selectedNodePName: '', // 选中节点的父节点名称
    selectedDepth: 0, // 选中节点的父节深度
    selectedDepCode: '', // 选中节点的父节点编码
    currentPage: 1, // 当前页数
    currentPageList: 10, // 当前分页数
    treeData: [],
    tableData: [{ name: '辽宁省', code: '210000000000' }],
      groupInfo: {},
  };

    componentDidMount() {
        this.getGroupTree();
    }

  getGroupTree = () => {
      const {treeId} = this.state;
      const groupData = localStorage.getItem('groupDefaultData');
      let groupDataJson;
      if(!groupData){
          localStorage.setItem('groupDefaultData', JSON.stringify(groupTreeDefaultData));
          groupDataJson = groupTreeDefaultData;
      } else {
          groupDataJson = JSON.parse(groupData);
      }
      const defaultTableData = [];
      const findGroupArry = this.findGroup(treeId, groupDataJson) || [];
      findGroupArry.forEach(item => defaultTableData.push({name: item.name, code: item.code, id: item.id, pid: item.pid}))
      this.setState({
          treeData: groupDataJson,
          tableData: defaultTableData,
      })
  }

    addGroup = (id, list, param) => {
        if(id === 0){
            list.push(param);
            return true;
        }
        for(let i=0; i< list.length; i++) {
            console.log('forid', list[i].id, id)
            if(list[i].id == id) {
              console.log('idididididididid', id)
              list[i].children.push(param);
                return true;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.addGroup(id, list[i].children, param);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }
    editGroup = (id, list, param) => {
        for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                list[i].name = param.name;
                list[i].code = param.code;
                return true;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.editGroup(id, list[i].children, param);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }
    removeGroup = (id, list) => {
        for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                list.splice(i,1);
                return true;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.removeGroup(id, list[i].children);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }
    findGroup = (id, list) => {
        if(id === 0) {
            return list;
        }
        for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                return list[i].children;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.findGroup(id, list[i].children);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }

  // 点击树时，更换treeId并查询右侧表数据
  changeTreeId = (id, pName, depth, code, childrenData) => {
    this.setState({
      treeId: id,
      selectedDepth: depth,
      selectedDepCode: code,
      selectedkeys: [],
      formValues: {},
      selectedNodePName: pName,
      tableData: childrenData,
    });
  };
    openModal = (modalType) => {
      this.setState({
          addModalVisible: true,
          modalType,
      })
    }
    //确定保存
    handleAdd = (e) => {
        e.preventDefault();
        console.log('aaaaaaaaaaaaaaa')
        this.props.form.validateFields(['groupName', 'groupCode'], (err, values) => {
            const { groupInfo, modalType, treeId, treeData } = this.state;
            console.log('err------------', err)
            if (!err) {
              let param = {
                  name: values.groupName,
                  code: values.groupCode,
              }
                let successMsg = '添加';
              if (modalType === 'edit') {
                    param.id = groupInfo.id;
                    successMsg = '编辑';
                  this.editGroup(groupInfo.id, treeData, param);
              } else {
                console.log('treeId----------', treeId)
                param.pid = treeId;
                param.children = [];
                param.id = makeUuid();
                this.addGroup(treeId, treeData, param);
              }
              localStorage.setItem('groupDefaultData', JSON.stringify(treeData));
              this.getGroupTree();
              message.success(`${successMsg}成功`);
                this.setState({
                    addModalVisible: false,
                })
            }
        });
    };
    // 删除
    delGroup= (id) => {
        let {treeData} = this.state;
        this.removeGroup(id, treeData);
        localStorage.setItem('groupDefaultData', JSON.stringify(treeData));
        message.success('删除机构成功');
        this.getGroupTree();
    }
    // 编辑
    updGroup = (record) => {
        this.setState({
            groupInfo: record,
        })
        this.openModal('edit');
    }
    handleModalVisible = (visble) => {
      this.setState({
          addModalVisible: visble,
      })
    }

  render() {
    const { treeData, tableData, addModalVisible, modalType, groupInfo } = this.state;
    const { form: { getFieldDecorator }} = this.props;
    const tree = treeData;
    const data = tableData;
    return (
      <Layout className={styles.content_layout}>
        <Sider className={styles.content_left} width={300}>
          <GroupTree data={tree} changeTreeId={this.changeTreeId} />
        </Sider>
        <Content className={styles.content_right}>
          <Card className={styles.card}>
              <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.openModal('add')}>
                      添加机构
                  </Button>
              </div>
            <div className={styles.tableList}>
              <GroupTable data={data} delGroup={this.delGroup} updGroup={this.updGroup} />
            </div>
          </Card>
        </Content>
          {
            addModalVisible ? (
                <Modal
                    key={this.state.modalKey}
                    title={
                      modalType === 'edit' ? (
                          <span>{groupInfo.name}<Icon type="right" />编辑</span>
                      ) : (
                          <span> 添加机构</span>
                      )
                    }
                    visible={addModalVisible}
                    onOk={this.handleAdd}
                    onCancel={() => this.handleModalVisible(false)}
                    maskClosable={false}
                >
                    <Form key="addGroup">
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="机构名称"
                        >
                            {getFieldDecorator('groupName', {
                                initialValue: modalType === 'edit' ? groupInfo.name : '',
                                rules: [
                                    { required: true, message: '请输入机构名称' },
                                    { max: 50, message: '请输入50字以内机构名称' },
                                ],
                            })(
                                <Input placeholder="请输入机构名称" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="机构编码"
                        >
                            {getFieldDecorator('groupCode',
                                {
                                    initialValue: modalType === 'edit' ? groupInfo.code : '',
                                    rules: [{ required: true, message: '请输入机构编码' },
                                        { len: 12, message: '请输入12位机构编码' },
                                        // { pattern: '^\\d{12}$', message: '机构编码固定为12位数字' },
                                    ],
                                }
                            )(
                                <Input placeholder="请输入机构编码" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            ) : null
          }
      </Layout>
    );
  }
}

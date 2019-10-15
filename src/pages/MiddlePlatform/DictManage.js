/**
 * DictManage.js 字典管理
 * author： lyp
 * 20191015
 */
import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Input, Button, Modal, message, Layout, Spin } from 'antd';
import DictSettingsTable from './DictSettingsTable';
import styles from './DictSettings.less';
import DictTree from './DictTree';
import dictDefaultData from './dict';

const { Content, Sider } = Layout;

const FormItem = Form.Item;
const confirm = Modal.confirm;

@Form.create()
export default class DictManage extends PureComponent {
    state = {
        modalType: '',
        modalVisible: false,
        selectedRows: [],
        formValues: {},
        searchPId: 0, // 查询用的pid
        addRecord: {},
        treeSearch: '', // 是否为通过name查树
        treeSearchValue: '', // 查询树的name值
        modalKey: 0,
        selectRowKeys: [],
        dicValidate: /^[A-Za-z0-9\u4e00-\u9fa5]{1,64}$/,
        treeData: [],
        tableData: [],
        dictInfo: {},
        dictNumber: 1000,
    };

    componentDidMount() {
        this.queryDictsTree();
    }
    // 查询字典
    queryDicts = (params) => {
        const { dispatch } = this.props;
        const { formValues, searchPId } = this.state;
        if (params) {
            dispatch({
                type: 'dictSettings/fetch',
                payload: params,
            });
        } else {
            dispatch({
                type: 'dictSettings/fetch',
                payload: {
                    currentPage: 1,
                    showCount: 10,
                    pd: {
                        id: searchPId,
                        ...formValues,
                    },
                },
            });
        }
    }
    // 查询字典树
    queryDictsTree = () => {
      const {searchPId} = this.state;
      const dictData = localStorage.getItem('dictDefaultData');
        const dictNumber = localStorage.getItem('dictNumber');
        let dictDataJson;
        let dictNumberInt = 0;
        if(!dictData){
          localStorage.setItem('dictDefaultData', JSON.stringify(dictDefaultData));
          localStorage.setItem('dictNumber', this.state.dictNumber.toString())
            dictDataJson = dictDefaultData;
            dictNumberInt = this.state.dictNumber;
        } else {
            dictDataJson = JSON.parse(dictData);
            dictNumberInt = parseInt(dictNumber);
        }
        const defaultTableData = [];
        const findDictArry = this.findDict(searchPId, dictDataJson) || []
        findDictArry.forEach(item => defaultTableData.push({name: item.name, code: item.code, id: item.id, pid: item.pid}))
        this.setState({
            treeData: dictDataJson,
            tableData: defaultTableData,
            dictNumber: dictNumberInt,
        })
    }
    // 删除字典
    delDict = (id) => {
      let {treeData} = this.state;
        this.removeDict(id, treeData);
        console.log('this.state.treeData',treeData);
        localStorage.setItem('dictDefaultData', JSON.stringify(treeData));
        message.success('删除字典成功');
        this.queryDictsTree();
    }
    // 编辑字典
    updDict = (record) => {
        const { dispatch } = this.props;
        this.setState({
            dictInfo: record,
        })
        this.openModal('updDict');
    }

    // 处理表格点击分页事件
    handleStandardTableChange = (pagination) => {
        const { formValues } = this.state;

        const params = {
            currentPage: pagination.current,
            showCount: pagination.pageSize,
            pd: {
                ...formValues,
                id: this.state.searchPId,
            },
        };

        this.queryDicts(params);
    }

    // 处理表格选中多行事件
    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }
    // 获取树点击事件的key(id)
    getSelectedTreeKey = (key, treeDataChildren) => {
        this.setState({
            tableData: treeDataChildren,
            searchPId: parseInt(key),
        })
    }

    // 显示模态框
    openModal = (param, record = {}) => {
        this.setState({
            modalVisible: true,
            modalType: param,
            addRecord: record,
        });
    }
    // 模态框标题
    handleModalTitle = () => {
        const mt = this.state.modalType;
        switch (mt) {
            case 'addChild':
                return `${this.state.addRecord.name} > 添加字典`;
            case 'updDict':
                return `${this.state.dictInfo.name} > 编辑`;
            default: return '添加字典';
        }
    }
    // 模态框显示状态
    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
            modalKey: this.state.modalKey + 1,
        });
    }

    // 处理模态框点击保存
    handleModalSaveBtn = () => {
        const mt = this.state.modalType;
        let { treeData, dictNumber} = this.state;
        const { dispatch, form } = this.props;
        let params = {};
        form.validateFields(['dictName', 'dictCode'], (err, values) => {
            if (!err) {
                params = {
                    code: values.dictCode,
                    name: values.dictName,
                };

                let successMsg = '添加';
                if (mt === 'updDict') {
                    successMsg = '编辑';
                    params.id = this.state.dictInfo.id;
                    this.editDict(this.state.dictInfo.id, treeData, params)

                } else {
                    params.pid = this.state.searchPId;
                    params.children = [];
                    params.id = dictNumber + 1;
                    this.addDict(this.state.searchPId, treeData, params);
                    localStorage.setItem('dictNumber', (dictNumber + 1).toString());
                }
                localStorage.setItem('dictDefaultData', JSON.stringify(treeData));
                this.queryDictsTree();
                message.success(`${successMsg}成功`);
                this.handleModalVisible(false)
            }
        })
    }
    addDict = (id, list, param) => {
      if(id === 0){
        list.push(param);
        return true;
      }
      for(let i=0; i< list.length; i++) {

        if(list[i].id == id) {
          list[i].children.push(param);
          return true;
        }
        if(list[i].children && list[i].children.length > 0) {
          const isExists = this.addDict(id, list[i].children, param);
          if(isExists){
            return isExists;
          }
        }
      }
      return false;
    }
    editDict = (id, list, param) => {
        for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                list[i].name = param.name;
                list[i].code = param.code;
                return true;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.editDict(id, list[i].children, param);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }
    removeDict = (id, list) => {
        for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                list.splice(i,1);
                return true;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.removeDict(id, list[i].children);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }
    findDict = (id, list) => {
      if(id === 0) {
        return list;
      }
      for(let i=0; i< list.length; i++) {
            if(list[i].id == id) {
                return list[i].children;
            }
            if(list[i].children && list[i].children.length > 0) {
                const isExists = this.findDict(id, list[i].children);
                if(isExists){
                    return isExists;
                }
            }
        }
        return false;
    }

    render() {
        const { selectedRows, modalVisible, treeData, tableData, dictInfo } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className={styles.content_layout}>
                <Sider className={styles.content_left}>
                  <DictTree
                      getSelectedTreeKey={this.getSelectedTreeKey}
                      data={treeData}
                      treeSearch={this.state.treeSearch}
                      treeSearchValue={this.state.treeSearchValue}
                      searchPId={this.state.searchPId}
                  />
                </Sider>
                <Content className={styles.content_right}>
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListOperator}>
                                <Button icon="plus" type="primary" onClick={() => this.openModal('addDict')}>
                                    添加字典
                                </Button>
                            </div>
                            <DictSettingsTable
                                selectedRows={selectedRows}
                                data={tableData}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                                deleteDict={this.delDict}
                                openModal={this.openModal}
                                updDict={this.updDict}
                                selectedRowKeys={this.state.selectRowKeys}
                            />
                        </div>
                    </Card>
                    <Modal
                        key={this.state.modalKey}
                        title={this.handleModalTitle()}
                        visible={modalVisible}
                        onOk={() => this.handleModalSaveBtn()}
                        onCancel={() => {
                            this.handleModalVisible();
                            this.props.form.resetFields(['dictName','dictCode']);
                        }}
                        maskClosable={false}
                    >
                        <Form key="addDict">
                            <FormItem
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 15 }}
                                label="字典名称"
                            >
                                {getFieldDecorator('dictName', {
                                    rules: [{
                                        pattern: this.state.dicValidate,
                                        required: true,
                                        message: '请输入汉字、字母、数字等的字典名称!'
                                    }],
                                    initialValue: this.state.modalType === 'updDict' ? dictInfo.name : '',
                                })(
                                    <Input placeholder="请输入" />
                                )}

                            </FormItem>
                            <FormItem
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 15 }}
                                label="字典编码"
                            >
                                {getFieldDecorator('dictCode', {
                                    rules: [
                                        { required: true, message: '请输入字典编码!' },
                                        { pattern: /^[0-9]{3,6}$/, message: '请输入3-6位数字' },
                                    ],
                                    initialValue: this.state.modalType === 'updDict' ? dictInfo.code : '',
                                })(
                                    <Input placeholder="请输入" />
                                )}

                            </FormItem>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        );
    }
}

/**
 * DeviceStatus.js 设备状态
 * author： lyp
 * 20191015
 */

import React, { Component, Fragment,PureComponent } from 'react';
import { connect } from 'dva';
import styles from './DeviceServiceManagement.less';
import EquipmentUnitTable from './EquipmentUnitTable';
import { Row, Col, Form, Input, Button, Card, Tree, message, Modal, Radio } from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
@connect(({ common, equipmentUnit, loading }) => ({
    common,
    equipmentUnit,
    loading: loading.models.equipmentUnit,
}))

@Form.create()

// export default class DeviceServiceManagement extends Component {
export class DeviceStatus extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            modalVisible: false,
            configModalVisible: false,
            modalType: 'add',
            deviceId: '',
            checkList: [],
            isShow: true,
            ha_id: '0678a6c7-2549-4fc4-97dc-368c371eb6ae',
            sliderLoding: true,
            idMsgPerson: '',//
            currentS: 1,
            pageSizeS: 10
        }
    }
    componentDidMount() {
        const params = {
            currentPage: 1,
            pd: {
                ha_id: this.state.ha_id,
                key_word: '',
                key_status: null,
            },
            showCount: 10
        }
        this.equipmentListQuery(params);
    }

    // 设备单元列表
    equipmentListQuery = (params) => {
        const { dispatch } = this.props;
        if (params) {
            dispatch({
                type: 'equipmentUnit/fetchEquipmentUnit',
                payload: params,
            });
        } else {
            dispatch({
                type: 'equipmentUnit/fetchEquipmentUnit',
                payload: {},
            });
        }

    }
    // 分页
    handleStandardTableChange = (pagination) => {
        let  page  = this.props.equipmentUnit.data.page;
        if (pagination) {
            this.setState({
                currentS: pagination.current,
                pageSizeS: pagination.pageSize
            });
        }
        let { formValues } = this.state;
        const params = {
            currentPage: pagination ? pagination.current : page.currentPage,
            pd: {
                key_word: formValues.key_word ? formValues.key_word : '',
                status: formValues.key_status ? formValues.key_status : null,
                ha_id: this.state.ha_id,
            },
            showCount: pagination ? pagination.pageSize : page.showCount,
        };
        this.equipmentListQuery(params);
    }
    refreshTable = () => {
        const params = {
            currentPage: this.state.currentS,
            pd: {
                ha_id: this.state.ha_id,
                key_word: '',
                key_status: null,
            },
            showCount: 10
        }
        this.equipmentListQuery(params);
    }
    render() {
        let { modalVisible } = this.state;
        const { equipmentUnit: { data } } = this.props;
        return (
            <Row gutter={24} type="flex" justify="space-between">
                <Col md={24} lg={24}>
                    <Card>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                <Button type='primary' onClick={() => this.refreshTable()}>刷新</Button>
                            </div>
                        </div>
                        <Row className={styles.contentRow} style={{ marginTop: '24px' }}>
                            <EquipmentUnitTable
                                {...this.props}
                                data={data}
                                loading={this.props.loading}
                                onChange={this.handleStandardTableChange}
                            />
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default DeviceStatus;

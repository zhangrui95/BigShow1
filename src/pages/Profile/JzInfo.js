// 卷宗信息可共用
// by zy
// 2018-07-31
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, Radio, Card, Dropdown, Menu, Icon, Modal, message, Select, Table, Tag, Tooltip } from 'antd';
import styles from './AdvancedProfile.less';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const Option = Select.Option;


@Form.create()
export default class JzInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}

    }


    render() {
        let JZInfo = this.props.JzInfo;
        return (
            <Row>
                <Row>
                    <Col xl={8} lg={8} md={8} sm={8}>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                案件名称：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_name ? JZInfo.case_name : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                案件状态：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_linkmc ? JZInfo.case_linkmc : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                卷宗名称：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_name ? JZInfo.dossier_name : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                卷宗类别：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_categorymc ? JZInfo.dossier_categorymc : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                强制措施：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_coercive_measuresmc ? JZInfo.case_coercive_measuresmc : '无' : '无'}
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8}>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                案件编号：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_number ? JZInfo.case_number : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                办案单位：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_unit ? JZInfo.case_unit : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                卷宗编号：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_number ? JZInfo.dossier_number : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                卷宗页数：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_now_pages_number : '0'} 页
                        </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                案件级别：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_levelmc ? JZInfo.case_levelmc : '无' : '无'}
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8}>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                案件类型：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.case_typemc ? JZInfo.case_typemc : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                办案人：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.casepolice ? JZInfo.casepolice : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                立卷人：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_founder ? JZInfo.dossier_founder : '无' : '无'}
                            </Col>
                        </Row>
                        <Row className={styles.JzInfoDiv}>
                            <Col xl={6} lg={6} md={6} sm={24} className={styles.JzInfoRight}>
                                立卷时间：
                        </Col>
                            <Col xl={18} lg={18} md={18} sm={24}>
                                {JZInfo ? JZInfo.dossier_founder_time ? JZInfo.dossier_founder_time : '无' : '无'}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.JzInfoDiv}>
                    <Col xl={2} lg={2} md={2} sm={24} className={styles.JzInfoRight}>
                        卷宗描述：
                        </Col>
                    <Col xl={22} lg={22} md={22} sm={24}>
                        {JZInfo ? JZInfo.dossier_details ? JZInfo.dossier_details : '无' : '无'}
                    </Col>
                </Row>
            </Row>
        );
    }
}
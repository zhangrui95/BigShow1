import React, { PureComponent } from 'react';
import { Anchor, Tree, Input, Card, Select } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;


class DictTree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [`${this.props.searchPId}`],
            searchValue: '',
            autoExpandParent: true,
        };
    }
    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    // 点击树节点触发
    treeNodeClick = (selectedKeys, e) => {

        console.log('e.selectedNodes[0]', e.selectedNodes[0])
        if (selectedKeys.length>0) { // 第二次点击相同节点时，selectedKeys返回空
            const {
                key,
                props: { title, code, children: treeChildren },
            } = e.selectedNodes[0];
            const childrenData = [];
            treeChildren.forEach(item =>
                childrenData.push({ name: item.props.title, code: item.props.code, id: item.key, pid: item.props.pid })
            );
            this.props.getSelectedTreeKey(key, childrenData);
        }
    }

    render() {
        const { expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {

            if (typeof ((item.children).length) !== 'undefined') {
                return (
                    <TreeNode key={item.id} title={item.name} code={item.code} pid={item.pid}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.name} code={item.code} pid={item.pid} />;
        });
        return (
            <Card style={{ padding: '15px', height: '100%', overflow: 'auto' }}>
                <div style={{ height: '650px', overflow: 'auto' }}>
                    <Tree
                        showLine
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onSelect={this.treeNodeClick}
                        defaultExpandAll={(this.props.treeSearch === 'name')}
                        defaultSelectedKeys={[`${this.props.searchPId}`]}
                    >
                        <TreeNode title="全部" key="0">
                            {loop(this.props.data)}
                        </TreeNode>
                    </Tree>
                </div>
            </Card>
        );
    }
}

export default DictTree;


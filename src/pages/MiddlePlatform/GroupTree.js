import React, { PureComponent } from 'react';
import { Tree, Card, Tooltip } from 'antd';
import styles from './GroupTree.less';

const { TreeNode } = Tree;

class GroupTree extends PureComponent {
  constructor(props) {
    super(props);
    this.dataList = [];
    this.state = {
      expandedKeys: ['0'],
      searchValue: '',
      autoExpandParent: true,
      selectedKeys: ['0'],
    };
  }

  // 展开/收起节点时触发
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  getMenuData = data => {
    for (let i = 0; i < data.length; i++) {
      this.dataList.push(data[i]);
      if (data[i].children) {
        this.getMenuData(data[i].children);
      }
    }
  };

  // 点击树节点触发
  treeNodeClick = (selectedKeys, e) => {

    if (selectedKeys.length > 0) {
        const {
            key,
            props: { pName, depth, code, children: treeChildren },
        } = e.selectedNodes[0];
      // 第二次点击相同节点时，selectedKeys返回空
      const childrenData = [];
      treeChildren.forEach(item =>
        childrenData.push({ name: item.props.pName, code: item.props.code, id: item.key, pid: item.props.pid })
      );
      this.props.changeTreeId(key, pName, depth, code, childrenData);
    }
    this.setState({
      selectedKeys,
    });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent, selectedKeys } = this.state;
    const loop = data =>
      data.map(item => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            item.name.length > 10 ? (
              <Tooltip title={item.name}>
                <span>
                  {beforeStr}
                  <span style={{ color: '#f50' }}>{searchValue}</span>
                  {afterStr}
                </span>
              </Tooltip>
            ) : (
              <span>
                {beforeStr}
                <span style={{ color: '#f50' }}>{searchValue}</span>
                {afterStr}
              </span>
            )
          ) : item.name.length > 10 ? (
            <Tooltip title={item.name}>
              <span>{item.name ? item.name.substring(0, 10) + '...' : ''}</span>
            </Tooltip>
          ) : (
            item.name
          );

        if (item.children) {
          return (
            <TreeNode
              key={item.id}
              title={title}
              pName={item.name}
              depth={item.depth}
              code={item.code}
              pid={item.pid}
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.id}
            title={title}
            pName={item.name}
            depth={item.depth}
            code={item.code}
            pid={item.pid}
          />
        );
      });
    return (
      <Card style={{ height: '100%' }}>
        <div className={styles.treeHeight}>
          <Tree
            showLine
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={this.treeNodeClick}
            defaultExpandedKeys={['0']}
            defaultSelectedKeys={selectedKeys}
          >
            <TreeNode key={0} title={'全部'}>
              {this.props.data.length > 0 ? loop(this.props.data) : ''}
            </TreeNode>
          </Tree>
        </div>
      </Card>
    );
  }
}

export default GroupTree;

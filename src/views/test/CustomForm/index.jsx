import React, { useEffect, useState } from 'react';
import { Tag, Layout, Button, Modal, Divider, Form, Input, Select } from 'antd';
import Sortable from 'react-sortablejs';
import _ from 'lodash';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';
// import './index.less';
import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd } from './utils';
import { formItemData, GlobalComponent } from '../Custom/config';
import EditableTable from '../EditableTable';

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;
const sortableOption = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: {
    name: 'formItem',
    pull: true,
    put: true,
  },
};

const CustomForm = () => {

  const [itemData, setItemData] = useState(Array);                  // 组件数据
  const [isShowModal, setIsShowModal] = useState(false);            // 弹框是否显示
  const [curItemKey, setCurItemKey] = useState(String);             // 当前选中组件的Key
  const [curItemName, setCurItemName] = useState(String);           // 当前选中组件的Name
  const [curItemType, setCurItemType] = useState(String);           // 当前选中组件的Type
  const [isChoose, setIsChoose] = useState(false);                  // 组件是否处于选中状态

  useEffect(() => {

  }, []);

  const handleSubmit = () => {

  };

  const handlePreview = () => {
    console.log('itemData:'+JSON.stringify(itemData))
    setIsChoose(false)
    setIsShowModal(true)
  };

  const handleLabelChange = (e) => {
    const val = e.target.value;
    setCurItemName(val);
    itemData[curItemKey].label = val;
    setItemData(...[itemData]);
  }

  const handleDel = () => {
    let newTreeData = itemRemove(curItemKey, itemData);
    setCurItemKey('');
    setCurItemName('');
    setCurItemType('');
    setItemData([...newTreeData])
  }

  const sortableChoose = (e) => {
    console.log(e)
    setIsChoose(true);
    const curKey = e.item.getAttribute('data-id');
    const curName = e.item.firstChild.innerText;
    const curType = e.item.getAttribute('type');
    setCurItemKey(curKey);
    setCurItemName(curName);
    setCurItemType(curType)
  };

  // 拖拽的添加方法
  const sortableAdd = e => {
    // 组件名或路径
    const nameOrIndex = e.clone.getAttribute('data-id');
    // 父节点路径
    const parentPath = e.path[1].getAttribute('data-id');
    // 拖拽元素的目标路径
    const { newIndex } = e;
    // 新路径 为根节点时直接使用index
    const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;
    console.log('nameOrIndex:'+nameOrIndex,'parentPath:'+parentPath,'newIndex:'+newIndex,'newPath:'+newPath)
    // 判断是否为路径 路径执行移动，非路径为新增
    if (isPath(nameOrIndex)) {
      // 旧的路径index
      const oldIndex = nameOrIndex;
      // 克隆要移动的元素
      const dragItem = getCloneItem(oldIndex, itemData)
      // 比较路径的上下位置 先执行靠下的数据 再执行靠上数据
      if (indexToArray(oldIndex) > indexToArray(newPath)) {
        // 删除元素 获得新数据
        let newTreeData = itemRemove(oldIndex, itemData);
        // 添加拖拽元素
        newTreeData = itemAdd(newPath, newTreeData, dragItem)
        // 更新视图
        setItemData([...newTreeData])
        return
      }
      // 添加拖拽元素
      let newData = itemAdd(newPath, itemData, dragItem)
      // 删除元素 获得新数据
      newData = itemRemove(oldIndex, newData);
      setItemData([...newData])
      return
    }

    // 新增流程 创建元素 => 插入元素 => 更新视图
    const id = nameOrIndex
    const newItem = _.cloneDeep(formItemData.find(item => (item.name === id)))
    // 为容器或者弹框时增加子元素
    if ( newItem.name === 'Containers') {
      const ComponentsInfo = _.cloneDeep(GlobalComponent[newItem.name])
      // 判断是否包含默认数据
      newItem.children = [ComponentsInfo]
    }
    let Data = itemAdd(newPath, itemData, newItem)
    setItemData([...Data])
  };

  // 拖拽的排序方法
  const sortableUpdate = e => {
    // 交换数组
    const { newIndex, oldIndex } = e;
    // 父节点路径
    const parentPath = e.path[1].getAttribute('data-id');
    // 父元素 根节点时直接调用data
    let parent = parentPath ? getItem(parentPath, itemData) : itemData;
    // 当前拖拽元素
    const dragItem = parent[oldIndex];
    // 更新后的父节点
    parent = update(parent, {
      $splice: [[oldIndex, 1], [newIndex, 0, dragItem]],
    });
    // 最新的数据 根节点时直接调用data
    const Data = parentPath ? setInfo(parentPath, itemData, parent) : parent
    // 调用父组件更新方法
    setItemData([...Data])
  };

  // 递归函数
  const loop = (arr, index) => {
    return (
      arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`;
        if (item) {
          if (item.children) {
            return (
              <div {...item.attr} data-id={indexs} key={indexs}>
                <Sortable
                  key={uniqueId()}
                  style={{ minHeight: 100, margin: 10 }}
                  ref={c => c && c.sortable}
                  options={{
                    ...sortableOption,
                    onUpdate: e => sortableUpdate(e),
                    onAdd: e => sortableAdd(e),
                    onChoose: e => sortableChoose(e),
                    onSort: e => setIsChoose(false),
                  }}
                >
                  { loop(item.children, indexs) }
                </Sortable>
              </div>
            )
          }
          const ComponentInfo = GlobalComponent[item.name]
          return (
            <div
              data-id={indexs}
              key={indexs}
              type={item.name}
              className='formItemStyle'
              style={(isChoose && indexs === curItemKey) ? {border: '1px solid #FF3333'} : {}}
            >
              {
                item.name !== 'Divider' &&
                <div className='formItemLabel'>{ isChoose ? (indexs === curItemKey ? curItemName : item.label) : item.label}</div>
              }
              {
                renderDiffComponents(item, indexs, ComponentInfo)
              }
            </div>
          )
        } else {
          return null
        }
      })
    )
  };

  const renderDiffComponents = (item, indexs, ComponentInfo) => {
    switch (item.name) {
      case 'Divider':
        return <ComponentInfo key={indexs} {...item.attr}></ComponentInfo>
      case 'Select':
        return (
          <ComponentInfo key={indexs} defaultValue={item.attr.defaultValue}>
            {
              item.attr.options.map(subItem => <Option key={subItem.key} value={subItem.value + ''}>{ subItem.label }</Option>)
            }
          </ComponentInfo>
        )
      default:
        return <ComponentInfo key={indexs} {...item.attr} />
    }
  }

  const getDataSource = (options) => {
    itemData[curItemKey].attr.options = [...options];
    setItemData([...itemData])
  }

  return (
    <div className='formMain'>
      <Layout className='firstLayout'>
        <Sider style={{ padding: 10 }}>
          <h3 className='textHead'>组件列表</h3>
          <Sortable
            options = {{
              group:{
                name: 'formItem',
                pull: 'clone',
                put: false,
              },
              sort: false,
            }}
          >
            {
              formItemData.map(item => (
                <div
                  data-id={item.name}
                  key={item.name}
                  style={{ marginTop: 10 }}
                >
                  <Tag>{item.label + '-' + item.name}</Tag>
                </div>
              ))
            }
          </Sortable>
        </Sider>
        <Layout className='secondLayout'>
          <Header>
            <div className='headerWrapper'>
              <h3 className='textHead' style={{ float: 'left' }}>表单设计</h3>
              <Button className='formBtn' type='primary' onClick={handleSubmit}>保存</Button>
              <Button className='formBtn' onClick={handlePreview}>预览</Button>
            </div>
            <Divider />
          </Header>
          <Content style={{ marginTop: 15 }}>
            <Layout className='thirdLayout'>
              <Content>
                <Sortable
                  className='formContent'
                  ref={c => c && c.sortable}
                  options={{
                    ...sortableOption,
                    onUpdate: e => sortableUpdate(e),
                    onAdd: e => sortableAdd(e),
                    onChoose: e => sortableChoose(e),
                    onSort: e => setIsChoose(false),
                  }}
                  key={uniqueId()}
                >
                  { loop(itemData, '')}
                </Sortable>
              </Content>
              <Sider className='itemInfo'>
                <Header>
                  <h3 className='textHead'>字段设置</h3>
                </Header>
                <Content>
                  <Form className='itemForm'>
                    <Form.Item label="组件Key">
                      <Input value={curItemKey} disabled />
                    </Form.Item>
                    <Form.Item label="标签名">
                      <Input value={curItemName} disabled={!isChoose} onChange={handleLabelChange} />
                    </Form.Item>
                    {
                      ['CheckboxGroup', 'RadioGroup', 'Select'].includes(curItemType) &&
                      <EditableTable
                        getDataSource={getDataSource}
                        curItemKey={curItemKey}
                        options={itemData[curItemKey].attr.options}
                        disabled={!isChoose}
                      />
                    }
                  </Form>
                </Content>
                <Footer style={{ border: 'none' }}>
                  <Button className='delBtn' onClick={handleDel} disabled={!isChoose}>删除</Button>
                </Footer>
              </Sider>
            </Layout>
          </Content>
        </Layout>
      </Layout>
      {
        isShowModal &&
        <Modal
          title='表单预览'
          visible={true}
          onCancel={() => setIsShowModal(false)}
          onOk={() => setIsShowModal(false)}
        >
          { loop(itemData, '') }
        </Modal>
      }
    </div>
  );
}

export default CustomForm;
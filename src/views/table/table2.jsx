import React, { useEffect, useState } from 'react';
import RTable from '@/packages/table'

const columns = [
  { title: '序号', dataIndex: 'key', key: 'key' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];
export default () => {

  let [pageManage, setPageManage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  let [dataSource, setDataSource] = useState([]);

  function onChange(current, pageSize) {
    setPageManage({
      ...pageManage,
      current,
    });
  }

  function onShowSizeChange(current, pageSize) {
    setPageManage({
      ...pageManage,
      pageSize,
      current
    });
  }

  // 其实这里点击 onShowSizeChange 是无效的， 因为数据其实应该是 处理好 返回的， 我这里本地没有做处理，所以点击时返回的数据是不对的, 但是就是这么一个意思，组件和方法是没问题的。
  useEffect(() => {
    const dataSource = [];
    for (let i = 0; i < 100; i++) {
      dataSource.push({
        key: i + 1,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    setDataSource(dataSource)
    setPageManage({
      ...pageManage,
      total: dataSource.length
    })
  }, [])

  return <RTable
    columns={columns}
    dataSource={dataSource}
    // scroll={{x: 1000}}
    pageManage={pageManage}
    onChange={onChange}
    onShowSizeChange={onShowSizeChange}
  />
}
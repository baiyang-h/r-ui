import React from 'react';
import RTable from '@/packages/table'

const columns = [
  { title: '序号', dataIndex: 'key', key: 'key'},
  { title: '姓名', dataIndex: 'name', key: 'name'},
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];
const dataSource = [];
for (let i = 0; i < 10; i++) {
  dataSource.push({
    key: i+1,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
// 没有设置分页器，默认会分页，不过一开始要获取到所有数据，内部会进行处理
export default () => <RTable columns={columns} dataSource={dataSource} pagination={false} />
import React, {useState} from 'react';
import { Input, InputNumber, Form} from 'antd';
import RTable from '@/components/Table'

// 数据
const originData = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
// Cell 单元格
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,   // 该单元格内部文本内容
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const EditableTable = () => {
  const [form] = Form.useForm();   // 整体外层一个 form ，内部根据编辑状态时，只会有当前行的 form-item，不会因为其他行受影响
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');   // 当前编辑行 的 key
  const isEditing = (record) => record.key === editingKey;    // 是否可编辑
  // 编辑
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  // 取消
  const cancel = () => {
    setEditingKey('');
  };
  // 保存
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  // 原始 columns 配置
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,       // 可编辑
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,       // 可编辑
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,       // 可编辑
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  // 重新格式化 columns，  onCell用于 传入 td 的属性和值
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),    // 自定义 是否是编辑状态
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <RTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};
export default EditableTable
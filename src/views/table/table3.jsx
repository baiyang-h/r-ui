import React, {useEffect, useState, useRef, useContext} from 'react';
import { Input, Form} from 'antd';
import RTable from '@/components/Table'
import './index.scss'
const EditableContext = React.createContext();
const _columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '30%',
    editable: true,
  },
  {
    title: 'age',
    dataIndex: 'age',
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
];
// row 行，单行一个 form， 如果多个单元格都是 表单控件，可形成一个整的 form 表单
const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
// col 每个单元格
const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                      }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);          // 在 单元格中 获取 form， 通过 Context 传递下来
  // 编辑 true / false 状态 监听
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  // 编辑
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  // col 中保存
  const save = async (e) => {
    try {
      const values = await form.validateFields();  // 这一整行row的 form
      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  // 编辑状态和不是编辑状态时 的 显示
  // 编辑状态 有表单验证
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
function EditableTable() {
  const [dataSource, setSataSource] = useState([]);
  // 每个 col 单元格保存时
  function handleSave(row) {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setSataSource(newData)
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // 对列表重新处理
  const columns = _columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  // 初始化数据
  useEffect(() => {
    let dataSource = []
    for (let i = 0, len = 10; i < len; i++) {
      dataSource.push({
        key: i + '',
        name: `Edward King ${i}`,
        age: `${i}岁`,
        address: `London, Park Lane no. ${i}`,
      })
    }
    setSataSource(dataSource)
  }, [])
  return (
    <RTable
      rowClassName={() => 'editable-row'}
      columns={columns}
      dataSource={dataSource}
      bordered
      components={components}
    />
  );
};
export default EditableTable;
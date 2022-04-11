import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import RForm from '@/components/Form'

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  config: PropTypes.array.isRequired,
  formProps: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

FormModal.defaultProps = {
  title: '标题',
  visible: false,
  config: [],
  maskClosable: false,
  okText: '确定',
  cancelText: '取消',
  // 外部传入的表单属性
  formProps: {},
  // 内部表单的默认属性  （最终传入表单内部，需要和上面的 formProps 进行合并）
  defaultFormProps: {}
}

export default function FormModal(props) {

  const formRef = useRef();

  function onOk() {
    const current = formRef.current.getFormRef();
    current.validateFields().then(values => {
      props.onOk && props.onOk(values)
    })
  }

  function onCancel() {
    props.onCancel && props.onCancel()
  }

  useEffect(() => {
    if(!props.visible) {
      if(formRef.current) {
        const current = formRef.current.getFormRef();
        current.resetFields()
      }
    }
  }, [props.visible])

  const { title, visible, defaultFormProps, formProps, config, ..._props } = props
  // 将外部传入的表单设置和内部的默认进行合并，如相同属性，则外部覆盖内部
  const modalFormProps = {...defaultFormProps, ...formProps}

  return <Modal
    {..._props}
    className="form-modal"
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <RForm
      ref={formRef}
      {...modalFormProps}
      config={config}
    />
  </Modal>
}
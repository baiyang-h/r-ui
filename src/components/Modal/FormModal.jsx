import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import RForm from '../Form'

FormModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  config: PropTypes.array.isRequired,
  maskClosable: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
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

  return <Modal
    {...props}
    className="form-modal"
    title={props.title}
    visible={props.visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <RForm
      ref={formRef}
      layout="inline"
      config={props.config}
    />
  </Modal>
}
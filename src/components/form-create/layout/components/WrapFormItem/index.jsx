import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.scss'
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons'

WrapFormItem.propTypes = {
  // 是否被选中
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onCopy: PropTypes.func,
  onDelete: PropTypes.func,
}

WrapFormItem.defaultProps = {
  selected: false
}

function WrapFormItem(props) {

  // 点击
  const handleClick = () => {
    props.onClick && props.onClick()
  }

  // 拷贝
  const onCopy = () => {
    props.onClick && props.onCopy()
  }

  // 删除
  const onDelete = () => {
    props.onClick && props.onDelete()
  }

  return <div className={classNames('wrap-form-item', props.selected ? 'wrap-form-item--selected' : false)} onClick={handleClick}>
    { props.selected &&  <DragOutlined className="wrap-form-item--drag-icon" />}
    { props.children }
    {
      props.selected && <div className="wrap-form-item-icons">
        <CopyOutlined onClick={onCopy} />
        <DeleteOutlined onClick={onDelete} />
      </div>
    }
  </div>
}

export default WrapFormItem

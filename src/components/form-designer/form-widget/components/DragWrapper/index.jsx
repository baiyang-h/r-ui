import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.scss'
import { DeleteOutlined, CopyOutlined, DragOutlined, PlusCircleOutlined } from '@ant-design/icons'

DragWrapper.propTypes = {
  // 是否被选中
  selected: PropTypes.bool,
  level: PropTypes.string,
  field: PropTypes.string,
  onClick: PropTypes.func,
  onCopy: PropTypes.func,
  onDelete: PropTypes.func,
}

DragWrapper.defaultProps = {
  selected: false,
  level: '0',
}

function DragWrapper(props) {

  // 点击
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onClick && props.onClick()
  }

  // 拷贝（不包括数据）
  const onAdd = () => {
    props.onAdd && props.onAdd()
  }

  // 拷贝（包括数据）
  const onCopy = () => {
    props.onClick && props.onCopy()
  }

  // 删除
  const onDelete = () => {
    props.onClick && props.onDelete()
  }

  return <div
    className={classNames('drag-wrapper', props.selected ? 'drag-wrapper--selected' : false)}
    data-level={props.level}
    data-field={props.field}
    onClick={handleClick}
  >
    { props.selected &&  <DragOutlined className="drag-wrapper--drag-icon" />}
    { props.children }
    {
      props.selected && <div className="drag-wrapper-icons">
        <PlusCircleOutlined onClick={onAdd} />
        <CopyOutlined onClick={onCopy} />
        <DeleteOutlined onClick={onDelete} />
      </div>
    }
  </div>
}

export default DragWrapper

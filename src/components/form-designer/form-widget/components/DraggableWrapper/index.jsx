import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.scss'
import { DeleteOutlined, CopyOutlined, DragOutlined, PlusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

DragWrapper.propTypes = {
  // 是否被选中
  selected: PropTypes.bool,
  path: PropTypes.string,
  field: PropTypes.string,
  onClick: PropTypes.func,
  onCopy: PropTypes.func,
  onDelete: PropTypes.func,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
}

DragWrapper.defaultProps = {
  selected: false,
  path: '0',
}

function DragWrapper(props) {

  // 点击
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onClick && props.onClick()
  }

  const onUp = () => {
    props.onUp && props.onUp()
  }

  const onDown = () => {
    props.onDown && props.onDown()
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
    className={classNames('draggable-wrapper', props.selected ? 'draggable-wrapper--selected' : false)}
    data-path={props.path}
    data-field={props.field}
    onClick={handleClick}
  >
    { props.selected &&  <DragOutlined className="draggable-wrapper-icon" />}
    { props.children }
    {
      props.selected && <div className="draggable-wrapper-icons">
        <ArrowUpOutlined onClick={onUp} />
        <ArrowDownOutlined onClick={onDown} />
        <PlusCircleOutlined onClick={onAdd} />
        <CopyOutlined onClick={onCopy} />
        <DeleteOutlined onClick={onDelete} />
      </div>
    }
  </div>
}

export default DragWrapper

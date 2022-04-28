import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.scss'
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons'

DragWrapper.propTypes = {
  // 是否被选中
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onCopy: PropTypes.func,
  onDelete: PropTypes.func,
}

DragWrapper.defaultProps = {
  selected: false
}

function DragWrapper(props) {

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

  return <div className={classNames('drag-wrapper', props.selected ? 'drag-wrapper--selected' : false)} onClick={handleClick}>
    { props.selected &&  <DragOutlined className="drag-wrapper--drag-icon" />}
    { props.children }
    {
      props.selected && <div className="drag-wrapper-icons">
        <CopyOutlined onClick={onCopy} />
        <DeleteOutlined onClick={onDelete} />
      </div>
    }
  </div>
}

export default DragWrapper

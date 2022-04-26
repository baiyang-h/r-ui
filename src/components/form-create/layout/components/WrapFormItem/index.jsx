import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.scss'

WrapFormItem.propTypes = {
  // 是否被选中
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

WrapFormItem.defaultProps = {
  selected: false
}

function WrapFormItem(props) {

  const handleClick = () => {
    props.onClick && props.onClick()
  }

  return <div className={classNames('wrap-form-item', props.selected ? 'wrap-form-item--selected' : false)} onClick={handleClick}>
    { props.children }
  </div>
}

export default WrapFormItem
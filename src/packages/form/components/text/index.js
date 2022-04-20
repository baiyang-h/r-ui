import React from 'react'

export default function Text(props) {
  console.log(props)
  return <div className={`${props.prefix_form_control_name}-text`}>
    { props.value === undefined ? '-' : props.value }
  </div>
}

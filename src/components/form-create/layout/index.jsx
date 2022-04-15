import { useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import uniqueId from 'lodash/uniqueId';
import './index.scss'

function FormDragLayout(props) {

  const [list, setList] = useState([]);

  const loop = (arr) => arr.map((item, index) => {

    if(item.children) {

    } else {
      return <div key={ index }>{ item.name }</div>
    }
  })

  return <div className="form-create-layout">
    <ReactSortable
      className="drag-items"
      list={list}
      setList={setList}
      animation={150}
      group={{ name: "form-create" }}
    >
      { loop(list) }
    </ReactSortable>
  </div>
}

export default FormDragLayout
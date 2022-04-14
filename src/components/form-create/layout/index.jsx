import { useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import './index.scss'

function Layout(props) {

  const [list, setList] = useState([]);

  return <div className="form-create-layout">
    <ReactSortable
      className="drag-items"
      list={list}
      setList={setList}
      animation={150}
      group={{ name: "form-create", pull: "clone" }}
    >
      {list.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  </div>
}

export default Layout
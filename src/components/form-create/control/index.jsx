import { ReactSortable } from "react-sortablejs";
import './index.scss'
import {useState} from "react";
import { list as _list, createId } from '../util'

function Controls(props) {

  const [list, setList] = useState(_list);

  return <div className="form-create-controls">
    <ReactSortable
      id="control-items"
      list={list}
      setList={setList}
      animation={150}
      group={{ name: "form-create", pull: "clone", put: false }}
      clone={item => ({ ...item, id: createId() })}
      sort={false}
    >
      {list.map(item => (
        <div key={item.id} className="item">{ item.name }</div>
      ))}
    </ReactSortable>
  </div>
}

export default Controls
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

export default function FormCreate(props) {

  const [list1, setList1] = useState([
    { id: 'aaa-1', name: "aaa-1" },
    { id: 'aaa-2', name: "aaa-2" },
  ]);
  const [list2, setList2] = useState([
    { id: 'bbb-1', name: "bbb-1" },
    { id: 'bbb-2', name: "bbb-2" },
  ]);

  return (
    <div>
      <ReactSortable
        group="groupName"
        list={list1}
        setList={setList1}
      >
        {list1.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
      <div style={{padding: '20px'}}>分割线</div>
      <ReactSortable
        group="groupName"
        list={list2}
        setList={setList2}
      >
        {list2.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
    </div>
  );
}
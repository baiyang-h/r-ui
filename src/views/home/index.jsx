// export default function Home() {
//     return <div>
//         Home
//     </div>
// }

import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import './index.scss'

const BasicFunction = () => {
    const [operateCom, setOperateCom] = useState([
        { id: 1, name: "input", value: 213 },
        { id: 2, name: "input", value: 23 },
        { id: 3, name: "input", value: 61 },
        { id: 4, name: "input", value: 67 },
        {
            id: 5, name: "container", children: []
        }
    ]);
    const [container, setContainer] = useState([]);
    //储存全局key--方便拿到最大的key进行构造最新的key
    const [keyArr,setKeyArr]=useState([]);

    useEffect(() => {
        console.log(container, 'stated');
    }, [container])

    const renderContainer = (childNode, parentCHild) => {
        return (
          <ReactSortable
            className="ReactSortableChild"
            group={{ name: 'formItem', pull: true, put: true }}
            list={childNode.children} setList={(...args) => {
              //需要构造递增id,新拖入的组件的id必须比数组里面的最大的，进行加1
              //id不能数组下标的递增id,所以需要构造一些固定特殊字符再加上递增数字，
              //后面新增id只需改变递增数组那部分即可
              let max_id = 0
              keyArr.map(id => {
                  let pos = id.slice(3)
                  if (Number(pos) > max_id) {
                      max_id = pos
                  }
              })
              let new_id = 'key' + (++max_id)//初始时候
              let new_container = JSON.parse(JSON.stringify(args[0]))
              //需要找出哪些是新的--这里可以判断id是否函数经过处理的固定字符，没有就是新增的
              new_container.map(item => {
                  if (typeof item.id === 'number' || !item.id.includes('key')) {
                      item.id = new_id
                  }
              })
              childNode.children = new_container
              setKeyArr([...keyArr,new_id])
          }}
          >
              {childNode.children.map((item, index) => (
                <div key={item.id}>
                    {
                        item.name == 'container' ? (
                          renderContainer(item,childNode.children)
                        ) : (
                          <item.name defaultValue={item.value} onInput={e => {
                              childNode.children[index].value = e.target.value
                          }} />
                        )

                    }
                </div>
              ))}
          </ReactSortable>
        )
    }

    return (
      <div className="App">
          <div className="componentArea">
              <ReactSortable
                className="ReactSortable"
                group={{ name: 'formItem', pull: 'clone', put: false }}
                list={operateCom} setList={setOperateCom}
              >
                  {operateCom.map((item) => (
                    <div key={item.id}>
                        {
                            item.name == 'container' ? (
                              <div style={{ minHeight: '100px', background: '#fff', padding: '12px' }}>子容器</div>
                            ) : (<item.name defaultValue={item.value} onChange={e => {
                                  let temp = operateCom
                                  temp.map(itemc => {
                                      if (itemc.id == item.id) {
                                          itemc.value = e.target.value
                                      }
                                  })
                                  setOperateCom(temp)
                              }} />
                            )
                        }
                    </div>
                  ))}
              </ReactSortable>
          </div>
          <div className="drawArea">
              <ReactSortable
                className="ReactSortable"
                group={{ name: 'formItem' }}
                onAdd={(...args)=>{
                    console.log(args,'-------');
                }}
                list={container} setList={(...args) => {
                  console.log(args);
                  //需要构造递增id,新拖入的组件的id必须比数组里面的最大的，进行加1
                  //id不能数组下标的递增id,所以需要构造一些固定特殊字符再加上递增数字，
                  //后面新增id只需改变递增数组那部分即可
                  let max_id = 0
                  keyArr.map(id => {
                      let pos = id.slice(3)
                      if (Number(pos) > max_id) {
                          max_id = pos
                      }
                  })
                  let new_id = 'key' + (++max_id)//初始时候
                  let new_container = JSON.parse(JSON.stringify(args[0]))
                  //需要找出哪些是新的--这里可以判断id是否函数经过处理的固定字符，没有就是新增的
                  new_container.map(item => {
                      if (typeof item.id === 'number' || !item.id.includes('key')) {
                          item.id = new_id
                      }
                  })
                  setKeyArr([...keyArr,new_id])
                  setContainer(new_container)
              }}
              >
                  {container.map((item, index) => (
                    <div key={item.id}>
                        {
                            item.name == 'container' ? (
                              renderContainer(item,container)
                            ) : (
                              <item.name defaultValue={item.value} onChange={e => {
                                  container[index].value = e.target.value
                              }} />
                            )

                        }
                    </div>
                  ))}
              </ReactSortable>
          </div>
      </div>
    );
};
export default BasicFunction

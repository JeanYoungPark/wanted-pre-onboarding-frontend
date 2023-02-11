import React from 'react'
import TodoList from './TodoList'

export default function TodoLists({handleChanged, todoList}) {
  
  handleChanged();

  return (
    <ul>
      {todoList.map((data)=>{
        return <TodoList data={data}/>
      })}
    </ul>
  )
}

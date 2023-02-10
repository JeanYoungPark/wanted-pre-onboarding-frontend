import React, { useEffect } from 'react'
import TodoList from './TodoList'

export default function TodoLists({handleChanged, todoList}) {
  
  useEffect(()=>{
    handleChanged();
  },[handleChanged])

  return (
    <ul>
      {todoList.map((data)=>{
        return <TodoList data={data}/>
      })}
    </ul>
  )
}

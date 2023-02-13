import React from 'react'
import TodoList from './TodoList'

export default function TodoLists({todoList, userToken, setChanged}) {
  return (
    <ul>
      {todoList.map((data)=>{
        return <TodoList key={data.id} id={data.id} data={data.todo} completed={data.isCompleted} userToken={userToken} setChanged={setChanged}/>
      })}
    </ul>
  )
}

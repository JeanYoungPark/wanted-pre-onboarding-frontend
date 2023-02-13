import React from 'react'
import TodoList from './TodoList'

export default function TodoLists({todoList, userToken, setChanged}) {
  return (
    <ul>
      {todoList.map((data)=>{
        return <TodoList key={data.id} data={data} userToken={userToken} setChanged={setChanged}/>
      })}
    </ul>
  )
}

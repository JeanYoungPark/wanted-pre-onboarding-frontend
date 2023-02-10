import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoLists from '../components/TodoLists'

export default function Todo() {
  return (
    <div className='todo'>
      <div>
        <TodoForm />
        <TodoLists />
      </div>
    </div>
  )
}

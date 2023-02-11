import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function TodoForm({handleSubmit, setTodo}) {
  const navigate = useNavigate();

  if(!localStorage.getItem('access-token')){
    navigate('/signin');
  }

  return (
    <div className='form' onSubmit={handleSubmit}>
        <form>
            <input data-testid="new-todo-input" placeholder='내용을 입력해주세요.' onChange={(e) => setTodo(e.target.value)}/>
            <button type='submit' data-testid="new-todo-add-button">저장</button>
        </form>
    </div>
  )
}

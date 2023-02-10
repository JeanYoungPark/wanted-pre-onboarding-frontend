import React from 'react'

export default function TodoForm() {
  return (
    <div className='form'>
        <form>
            <input data-testid="new-todo-input" placeholder='내용을 입력해주세요.'/>
            <button type='submit' data-testid="new-todo-add-button">저장</button>
        </form>
    </div>
  )
}

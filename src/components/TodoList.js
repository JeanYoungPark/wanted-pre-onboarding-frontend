import React from 'react'

export default function TodoList({data}) {
  
  return (
    <li>
      <label>
        <input type="checkbox"/>
        <span>{data.todo}</span>
      </label>
      <p className="btn">
          <button data-testid="modify-button" id={data.id}>수정</button>
          <button data-testid="delete-button" id={data.id}>삭제</button>
        </p>
    </li>
  )
}

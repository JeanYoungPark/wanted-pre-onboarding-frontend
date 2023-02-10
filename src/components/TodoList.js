import React from 'react'

export default function TodoList() {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>1</span>
      </label>
      <p className="btn">
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </p>
    </li>
  )
}

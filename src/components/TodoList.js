import React from 'react'

export default function TodoList({data, handleChanged}) {
  const token = localStorage.getItem('access-token');

  const handelDelete = (e) => {
    if(window.confirm("삭제하시겠습니까?")){
      fetch(`https://pre-onboarding-selection-task.shop/todos/${e.target.id}`, {
        method : "DELETE",
        headers : {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then((res) => {
        handleChanged();
      });
    }
  }

  return (
    <li>
      <label>
        <input type="checkbox"/>
        <span>{data.todo}</span>
      </label>
      <p className="btn">
          <button data-testid="modify-button" id={data.id}>수정</button>
          <button data-testid="delete-button" id={data.id} onClick={(e) => handelDelete(e)}>삭제</button>
        </p>
    </li>
  )
}

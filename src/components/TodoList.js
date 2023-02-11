import React from 'react'
import TodoListBtn from './TodoListBtn';

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

  const handleListSubmit = (e) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${e.target.id}`, {
      method : "PUT",
      headers : {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        todo : e.target.todo
      })
    })
    .then(res => res.json())
    .then((res) => {
      handleChanged();
    });
  }

  return (
    <li>
      <label>
        <input type="checkbox"/>
        <span>{data.todo}</span>
      </label>
      <TodoListBtn data={data} handelDelete={handelDelete} handleListSubmit={handleListSubmit}/>
    </li>
  )
}

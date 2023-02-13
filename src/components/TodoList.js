import axios from 'axios';
import React, { useState } from 'react'

export default function TodoList({data, userToken, setChanged}) {
  const [todo, setTodo] = useState(data.todo);
  const [modify, setModify] = useState(false);

  const handleCancle = () => {
    reload();
    setModify(false);
  }

  const handelDelete = async (e) => {
    if(window.confirm("삭제하시겠습니까?")){
      await axios({
        url: `https://pre-onboarding-selection-task.shop/todos/${e.target.id}`,
        method: "DELETE",
        headers : {
          "Authorization": `Bearer ${userToken}`
        }
      })
      .then((res)=>{
        console.log(res);
        setChanged(true);
        setModify(false)
      });
    }
  }

  const handleListSubmit = async (e) => {
    await axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${e.target.id}`,
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      data: {
        todo : todo
      }
    })
    .then((res)=>{
      console.log(res);
      setChanged(true);
      setModify(false)
    });
  }

  return (
    <li>
      <label>
        <input type="checkbox"/>
        <input type="text" data-testid="modify-input" value={todo} onChange={(e) => setTodo(e.target.value)} disabled={!modify}/>
      </label>
      {modify ? 
        <p className='btn'>
          <button type="submit" data-testid="submit-button" onClick={(e) => handleListSubmit(e)}>제출</button>
          <button data-testid="cancel-button" onClick={() => handleCancle()}>취소</button>
        </p>
      :
        <p className="btn">
          <button type="button" data-testid="modify-button" onClick={() => setModify(true)}>수정</button>
          <button data-testid="delete-button" onClick={() => handelDelete()}>삭제</button>
        </p>
      }
    </li>
  )
}

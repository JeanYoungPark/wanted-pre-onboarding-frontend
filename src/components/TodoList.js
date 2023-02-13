import axios from 'axios';
import React, { useState } from 'react'

export default function TodoList({id, data, completed, userToken, setChanged}) {
  
  const [modifyMode, setModifyMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleClick = async (e) => {
    await axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      data: {
        todo : data,
        isCompleted : !isCompleted
      }
    })
    .then((res)=>{
      setChanged(true);
      setModifyMode(false)
    });
    setIsCompleted(!isCompleted);
  }

  const handelDelete = async (e) => {
    if(window.confirm("삭제하시겠습니까?")){
      await axios({
        url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
        method: "DELETE",
        headers : {
          "Authorization": `Bearer ${userToken}`
        }
      })
      .then((res)=>{
        setChanged(true);
        setModifyMode(false)
      });
    }
  }

  const handleListSubmit = async (e) => {
    await axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${e.target.getAttribute('data-id')}`,
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      data: {
        todo : editedTitle,
        isCompleted : isCompleted
      }
    })
    .then((res)=>{
      setChanged(true);
      setModifyMode(false)
    });
  }

  if(modifyMode){
    return(
      <li>
        <label>
          <input type="checkbox" defaultChecked={isCompleted} onClick={(e) => handleClick(e)}/>
          <input type="text" data-testid="modify-input" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>
        </label>
        <p className='btn'>
          <button type="submit" data-testid="submit-button" onClick={(e) => handleListSubmit(e)}>제출</button>
          <button data-testid="cancel-button" onClick={() => {setModifyMode(false); setEditedTitle(data);}}>취소</button>
        </p>
      </li>
    )
  }else{
    return(
      <li>
        <label>
          <input type="checkbox" defaultChecked={isCompleted} onClick={(e) => handleClick(e)}/>
          <span>{data}</span>
        </label>
        <p className='btn'>
          <button type="button" data-testid="modify-button" onClick={() => setModifyMode(true)}>수정</button>
          <button data-testid="delete-button" onClick={() => handelDelete()}>삭제</button>
        </p>
      </li>
    )
  }
}

import axios from 'axios';
import React, { useState } from 'react'

export default function TodoList({key, data, userToken, setChanged}) {
  const [modifyMode, setModifyMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data);

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
        setModifyMode(false)
      });
    }
  }

  const handleListSubmit = async (e) => {
    await axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${e.target.key}`,
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      data: {
        todo : editedTitle
      }
    })
    .then((res)=>{
      console.log(res);
      setChanged(true);
      setModifyMode(false)
    });
  }

  if(modifyMode){
    return(
      <li>
        <label>
          <input type="checkbox"/>
          <input type="text" data-testid="modify-input" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>
        </label>
        <p className='btn'>
          <button type="submit" data-testid="submit-button" key={key} onClick={(e) => handleListSubmit(e)}>제출</button>
          <button data-testid="cancel-button" onClick={() => setModifyMode(false)}>취소</button>
        </p>
      </li>
    )
  }else{
    return(
      <li>
        <label>
          <input type="checkbox"/>
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

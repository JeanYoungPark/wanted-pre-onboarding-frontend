import React, { useState } from 'react'

export default function TodoListBtn({data, handelDelete, handleListSubmit}) {
  const [modify, setModify] = useState(false);

  if(modify){
    return (
      <p className='edit'>
        <input data-testid="modify-input" value={data.todo}/>
        <button data-testid="submit-button" id={data.id} onClick={(e) => {handleListSubmit(e); setModify(false);}}>제출</button>
        <button data-testid="cancel-button" onClick={setModify(false)}>취소</button>
      </p>
    )
  }else{
    return (
      <p className="btn">
        <button data-testid="modify-button" id={data.id} onClick={setModify(true)}>수정</button>
        <button data-testid="delete-button" id={data.id} onClick={(e) => {handelDelete(e); setModify(false);}}>삭제</button>
      </p>
    )
    
  }
}

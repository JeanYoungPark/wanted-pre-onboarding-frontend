import axios from 'axios';
import React, {useState} from 'react'

export default function TodoForm({userToken, setChanged}) {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "POST",
      headers : {
        "Authorization":`Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      data: {
        todo : todo
      }
    })
    .then((res)=>{
      setChanged(true);
      setTodo('');
    });
  }

  return (
    <div className='form'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input data-testid="new-todo-input" placeholder='내용을 입력해주세요.' value={todo} onChange={(e) => setTodo(e.target.value)}/>
            <button type='submit' data-testid="new-todo-add-button">저장</button>
        </form>
    </div>
  )
}

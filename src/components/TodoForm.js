import axios from '../api/axios';
import React, {useState} from 'react'

export default function TodoForm({userToken, setChanged}) {
  const [todo, setTodo] = useState('');

  // 최초 리스트 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      url: "/todos",
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
    })
    .catch((error)=>{
      alert(error.response.data.message);
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

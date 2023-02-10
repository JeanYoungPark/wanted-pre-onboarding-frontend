import React,{useState} from 'react'
import TodoForm from '../components/TodoForm'
import TodoLists from '../components/TodoLists'

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const token = localStorage.getItem('access-token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://pre-onboarding-selection-task.shop/todos`, {
      method : "POST",
      headers : {
        "Authorization":`Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        todo : todo
      })
    })
    .then(res => res.json())
    .then((res) => {
      handleChanged();
    })
  }

  const handleChanged = () => {
    fetch(`https://pre-onboarding-selection-task.shop/todos`, {
      method : "GET",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then((res) => {
      setTodoList(res);
    });
  }

  return (
    <div className='todo'>
      <div>
        <TodoForm handleSubmit={handleSubmit} setTodo={setTodo}/>
        <TodoLists handleChanged={handleChanged} todoList={todoList}/>
      </div>
    </div>
  )
}

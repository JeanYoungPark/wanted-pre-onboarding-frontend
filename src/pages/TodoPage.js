import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm'
import TodoLists from '../components/TodoLists'

export default function Todo() {
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [userToken] = useState(localStorage.getItem('access-token'));

  useEffect(()=>{
    if(!userToken) navigate('/signin');
    handleChanged();
  },[]);

  useEffect(()=>{
    if(!userToken) navigate('/signin');
  }, [userToken]);

  useEffect(()=>{
    if(changed) handleChanged();
  },[changed]);

  const handleChanged = async () => {
    await axios({
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    })
    .then((res)=>{
      setTodoList(res.data);
      setChanged(false);
    });
  }

  return (
    <div className='todo'>
      <div>
        <TodoForm userToken={userToken} setChanged={setChanged}/>
        <TodoLists todoList={todoList} userToken={userToken} setChanged={setChanged}/>
      </div>
    </div>
  )
}

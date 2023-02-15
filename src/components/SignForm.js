import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignForm({type, userLocation}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);

  // 로그인 되어 있는 상태인지 확인
  useEffect(()=>{
    if(localStorage.getItem('access-token')){
      alert("현재 로그인 되어있는 상태입니다. todo페이지로 이동하겠습니다.");
      navigate('/todo');
    }
  }, [navigate]);

  // 하나라도 조건에 충족하지 않으면 버튼 비활성화
  useEffect(() => {
    let regex = new RegExp('[a-z0-9]+@[a-z0-9]');

    if(regex.test(email) && password.length >= 8){
      setBtnState(false);
    }else{
      setBtnState(true);
    }
  }, [email, password]);

  // sign in , sign up 공통 form 요청
  const handleSubmit = async (e, callback) => {
    e.preventDefault();

    await axios({
      url: `/auth/${type}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email : email,
        password : password
      }
    })
    .then((res) => {
      if(typeof(callback) === 'function') callback(res);
    })
    .catch((error) => {
      alert(error.response.data.message);
    });

  }

  if(userLocation === 'signin'){
    return (
      <div className='form'>
        <form onSubmit={(e) => handleSubmit(e, (res) => {
          localStorage.setItem("access-token",res.data.access_token);
          navigate('/todo');
        })}>
          <div>
            <p><input id="email" type="email" name="email" data-testid="email-input" placeholder='이메일을 입력해주세요.' onChange={e => setEmail(e.target.value)} required/></p>
            <p><input id="password" type="password" name="password" minLength="8" data-testid="password-input" placeholder='비밀번호를 입력해주세요.' onChange={e => setPassword(e.target.value)} required/></p>
          </div>
          <div className='btn-wrap'><button type="submit" data-testid="signin-button" disabled={btnState}>로그인</button></div>
        </form>
      </div>
    )
  }else{
    return (
      <div className='form'>
        <form onSubmit={(e) => handleSubmit(e, (res) => {
          navigate('/signin');
        })}>
          <div>
            <p><input id="email" type="email" name="email" data-testid="email-input" placeholder='이메일을 입력해주세요.' onChange={e => setEmail(e.target.value)} required/></p>
            <p><input id="password" type="password" name="password" minLength="8" data-testid="password-input" placeholder='비밀번호를 입력해주세요.' onChange={e => setPassword(e.target.value)} required/></p>
          </div>
          <div className='btn-wrap'><button type="submit" data-testid="signup-button" disabled={btnState}>회원가입</button></div>
        </form>
      </div>
    )
  }
}

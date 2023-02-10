import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignForm({type}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);

  // 하나라도 조건에 충족하지 않으면 버튼 비활성화
  useEffect(() => {
    // 로그인 되어 있는 상태인지 확인
    if(localStorage.getItem('access-token')){
      navigate('/todo');
    }else{
      let regex = new RegExp('[a-z0-9]+@[a-z0-9]');

      if(regex.test(email) && password.length >= 8){
        setBtnState(false);
      }else{
        setBtnState(true);
      } 
    }
  }, [email, password, navigate]);

  // sign in , sign up 공통 form 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://pre-onboarding-selection-task.shop/auth/${type}`, {
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        email : email,
        password : password
      })
    })
    .then(res => res.json())
    .then((res) => {
      if(res){
        if(type === 'signin'){
          localStorage.setItem("access-token",res.access_token);
          navigate('/todo');
        }else if(type === 'signup'){
          navigate('/signin');
        }
      }
    });
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          <p><input id="email" type="email" name="email" data-testid="email-input" placeholder='이메일을 입력해주세요.' onChange={e => setEmail(e.target.value)} required/></p>
          <p><input id="password" type="password" name="password" minLength="8" data-testid="password-input" placeholder='비밀번호를 입력해주세요.' onChange={e => setPassword(e.target.value)} required/></p>
        </div>
        <div className='btn-wrap'>
          <p><button type="submit" data-testid="signup-button" disabled={btnState}>회원가입</button></p>
          <p><button type="submit" data-testid="signin-button" disabled={btnState}>로그인</button></p>
        </div>
      </form>
    </div>
  )
}

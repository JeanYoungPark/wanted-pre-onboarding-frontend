import React, { useEffect, useState } from 'react'

export default function SignForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);

  // 하나라도 조건에 충족하지 않으면 버튼 비활성화
  useEffect(() => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let regex = new RegExp('[a-z0-9]+@[a-z0-9]');

    if(regex.test(email) && password.length >= 8){
      setBtnState(false);
    }else{
      setBtnState(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

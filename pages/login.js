import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useState } from "react";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await auth.createUserWithEmailAndPassword(email, password);
      } else {
        data = await auth.signinWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const signIn = () => {
    auth.signInWithPopup(provider).catch(error);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/img/kakao-talk-logo.png" />
      </Head>
      <LoginContainer>
        <Logo src="/img/kakao-talk-logo.png" />
        <EmailLogin onSubmit={onSubmit}>
          <EmailInput
            placeholder="Email Address"
            name="email"
            type="text"
            required={true}
            value={email}
            onChange={onChange}
          />
          <PasswordInput
            placeholder="Password"
            name="password"
            type="password"
            required={true}
            value={password}
            onChange={onChange}
          />
          <LoginButton
            type="submit"
            disabled={(!email, !password)}
            value={newAccount ? "가입하기" : "로그인"}
          />

          {error}
          <ToggleContainer onClick={toggleAccount}>
            {newAccount ? "로그인 하기" : "가입하기"}
          </ToggleContainer>
        </EmailLogin>
        <GoogleLogin>
          <Button variant="outlined" onClick={signIn}>
            Google 로그인
          </Button>
        </GoogleLogin>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #fafafa;
`;

const LoginContainer = styled.div`
  padding: 100px;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ffe812;
  border-radius: 5px;
  box-shadow: 0px 4px 10px -3px rgba(0, 0, 0, 0.7);
`;

const ToggleContainer = styled.span`
  font-size: 12px;
  opacity: 0.6;
  margin-top: 5px;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-bottom: 50px;
`;

const EmailLogin = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmailInput = styled.input`
  margin-bottom: 5px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #ffe812;

  :active,
  :focus {
    outline-color: none;
    outline-width: 0;
  }
`;

const PasswordInput = styled.input`
  margin-bottom: 5px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #ffe812;

  :active,
  :focus {
    outline-color: none;
    outline-width: 0;
  }
`;

const LoginButton = styled.input`
  width: 100%;
  border-radius: 6px;
  height: 30px;
  margin: 5px;
  color: white;
  background-color: #964b00;
  border: none;
`;

const GoogleLogin = styled.div`
  margin-top: 10px;
`;

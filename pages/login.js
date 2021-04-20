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
    auth.signInWithPopup(provider).catch(alert);
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
          <LoginButton type="submit" disabled={(!email, !password)}>
            Login
          </LoginButton>
        </EmailLogin>
        <GoogleLogin>
          <Button variant="outlined" onClick={signIn}>
            Sign in with Google
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

const EmailInput = styled.input``;

const PasswordInput = styled.input``;

const LoginButton = styled(Button)``;

const GoogleLogin = styled.div``;

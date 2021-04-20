import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function login() {
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
        <Logo />
        <EmailLogin></EmailLogin>
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

const Container = styled.div``;

const LoginContainer = styled.div``;

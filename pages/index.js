import Head from "next/head";
import styled from "styled-components";
import Footer from "../components/Footer";
import Friends from "./friends";
import Header from "../components/Header";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>kakaotalk</title>
        <link rel="icon" href="/img/kakao-talk-logo.png" />
      </Head>

      {/* Header */}
      <Header title="친구" />

      {/* FriendList */}
      <MainContainer>
        <Friends />
      </MainContainer>

      {/* Footer */}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  flex: 1;
`;

import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import styled from "styled-components";

function setting() {
  return (
    <Container>
      <Head />
      <Header />
      <h1>this is setting page</h1>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
}

export default setting;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FooterContainer = styled.div`
  bottom: 0;
  position: sticky;
`;

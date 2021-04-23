import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <h1>ChatScreen</h1>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  background-color: #a7b9cb;
  flex: 1;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style {
    scrollbar-width: none;
  }
`;

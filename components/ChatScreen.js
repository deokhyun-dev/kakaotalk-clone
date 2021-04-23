import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  return (
    <Container>
      <MessageContainer>
        {showMessage()}
        <EndOfMessage />
      </MessageContainer>
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

const MessageContainer = styled.div``;

const EndOfMessage = styled.div``;

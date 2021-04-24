import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import Message from "./Message";

function ChatScreen({ chat, messages, endOfMessageRef }) {
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          chat={chat}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={message}
          chat={chat}
        />
      ));
    }
    scrollToBottom();
  };

  return (
    <Container>
      <MessageContainer>
        {showMessage()}
        <EndOfMessage ref={endOfMessageRef} />
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

const MessageContainer = styled.div`
  margin-top: 10px;
  padding: 4px;
`;

const EndOfMessage = styled.div`
  margin-bottom: 150px;
`;

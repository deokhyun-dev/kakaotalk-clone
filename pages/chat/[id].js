import styled from "styled-components";
import Head from "next/head";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ChatScreen from "../../components/ChatScreen";
import SendIcon from "@material-ui/icons/Send";
import { useState, useRef } from "react";
import firebase from "firebase";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessageRef = useRef(null);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };
  return (
    <Container>
      <Head></Head>
      <ChatHeader>
        <GoBack>
          <IconButton onClick={() => router.push("/chatPage")}>
            <ArrowBack />
          </IconButton>
        </GoBack>
        <ChatTitle>{getRecipientEmail(chat.users, user)}</ChatTitle>
        <HeaderIcons>
          <IconButton onClick={() => auth.signOut()}>
            <MeetingRoomIcon />
          </IconButton>
        </HeaderIcons>
      </ChatHeader>
      <ChatContainer>
        <ChatScreen
          chat={chat}
          messages={messages}
          endOfMessageRef={endOfMessageRef}
        />
      </ChatContainer>
      <ChatInputForm>
        <ChatInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ChatSubmit type="submit" disabled={!input} onClick={sendMessage}>
          <SendIcon />
        </ChatSubmit>
      </ChatInputForm>
    </Container>
  );
}

export default Chat;
// function
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // PREP the chat
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

// style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #a7b9cb;
  border-bottom: 1px solid whitesmoke;
  top: 0;
  position: sticky;
  z-index: 100;
`;

const GoBack = styled.div``;

const ArrowBack = styled(ArrowBackIcon)``;
const ChatTitle = styled.span`
  flex: 1;
`;
const HeaderIcons = styled.div``;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style {
    scrollbar-width: none;
  }
`;

const ChatInputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  bottom: 0;
  position: sticky;
  height: 50px;
`;

const ChatInput = styled.input`
  flex: 1;
  height: 100%;
  align-items: center;
  padding: 5px;
  border: none;
  border-radius: 10px;
  position: sticky;
  bottom: 0;
  outline: 0;
  margin: 0px 5px;
`;

const ChatSubmit = styled.button`
  height: 100%;
  border: none;
  background-color: #ffe812;
`;

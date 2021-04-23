import styled from "styled-components";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import Chat from "../components/Chat";

function chat() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("채팅 할 상대방의 이메일을 입력해 주세요");
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    chatSnapshot?.docs?.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <>
      <Container>
        <Head></Head>
        <Header title="채팅" />
        <ChatContainer>
          {/* list of Chat */}
          {chatSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </ChatContainer>
        <Footer />
      </Container>

      <CreateChatButton>
        <IconButton onClick={createChat}>
          <AddIcon />
        </IconButton>
      </CreateChatButton>
    </>
  );
}

export default chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const ChatContainer = styled.div``;

const CreateChatButton = styled.div`
  background-color: whitesmoke;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid lightgray;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
  margin-bottom: 65px;
`;

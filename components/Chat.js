import styled from "styled-components";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import PersonIcon from "@material-ui/icons/Person";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipent = recipientSnapshot?.docs?.[0]?.data();
  const recipentEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      <ChatInfo>
        <ChatInfoLeft>
          {recipent ? (
            <ChatProfile src={recipent?.photoURL} />
          ) : (
            <ChatAvatarNone>
              <NoAvatar />
            </ChatAvatarNone>
          )}
          <ChatInfoContainer>
            <ChatInfoEmail>{recipentEmail}</ChatInfoEmail>
            <LastChat>오늘 뭐했으?</LastChat>
          </ChatInfoContainer>
        </ChatInfoLeft>
        <ChatInfoDesc>10:58</ChatInfoDesc>
      </ChatInfo>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 12px 0px; */
  margin-top: 10px;
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`;

const ChatInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChatProfile = styled.img`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 35%;
  border: 1px solid whitesmoke;
`;

const ChatAvatarNone = styled.div`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 35%;
  border: 1px solid whitesmoke;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  background-color: #a7b9cb;
`;

const NoAvatar = styled(PersonIcon)``;

const ChatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatInfoEmail = styled.span``;

const LastChat = styled.span`
  opacity: 0.6;
  font-size: 15px;
`;

const ChatInfoDesc = styled.span`
  opacity: 0.5;
  font-size: 10px;
`;

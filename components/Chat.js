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
    <Container>
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
            <ChatInfoName>
              {recipentEmail[0][0]}
              {recipentEmail[0][1]}
              {recipentEmail[0][2]}
            </ChatInfoName>
            <ChatInfoEmail>{recipentEmail}</ChatInfoEmail>
          </ChatInfoContainer>
        </ChatInfoLeft>
        <ChatInfoDesc>상태메세지</ChatInfoDesc>
      </ChatInfo>
    </Container>
  );
}

export default Chat;

const Container = styled.div``;

const ChatInfo = styled.div``;

const ChatInfoLeft = styled.div``;

const ChatProfile = styled.img``;

const ChatAvatarNone = styled.div``;

const NoAvatar = styled(PersonIcon)``;

const ChatInfoContainer = styled.div``;

const ChatInfoName = styled.span``;

const ChatInfoEmail = styled.span``;

const ChatInfoDesc = styled.span``;

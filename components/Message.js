import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";
import PersonIcon from "@material-ui/icons/Person";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const MessageContainer =
    user === userLoggedIn.email ? MyContainer : FriendsContainer;
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  const TypeOfMessageTime =
    user === userLoggedIn.email ? SenderTime : ReceiverTime;
  const ProfileImg = user === userLoggedIn.email ? MyProfile : FriendProfile;
  return (
    <Container>
      <MessageContainer>
        <ProfileImg>
          <Person />
        </ProfileImg>
        <TypeOfMessage>{message.message}</TypeOfMessage>
        <TypeOfMessageTime>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TypeOfMessageTime>
      </MessageContainer>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MyContainer = styled.div``;

const FriendsContainer = styled.div``;

const MyProfile = styled.div`
  display: none;
`;

const FriendProfile = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 35%;
  background-color: #15a5c1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Person = styled(PersonIcon)`
  color: #a7b9cb;
`;

const SenderTime = styled.div`
  text-align: right;
  margin: 12px;
  font-size: 12px;
  opacity: 0.6;
`;

const ReceiverTime = styled.div`
  margin: 12px;
  font-size: 12px;
  opacity: 0.6;
`;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #ffe812;
`;

const Receiver = styled(MessageElement)`
  background-color: #fafafa;
  text-align: left;
`;

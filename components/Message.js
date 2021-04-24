import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";
import PersonIcon from "@material-ui/icons/Person";

function Message({ user, message, chat }) {
  const [userLoggedIn] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  const MessageContainer =
    user === userLoggedIn.email ? MyContainer : FriendsContainer;
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  const TypeOfMessageTime =
    user === userLoggedIn.email ? SenderTime : ReceiverTime;
  const ProfileImg = user === userLoggedIn.email ? MyProfile : FriendProfile;
  const NameTag = user === userLoggedIn.email ? MyName : FriendName;
  return (
    <Container>
      <MessageContainer>
        <MessageContainerLeft>
          {recipient ? (
            <ProfileImg>
              <img src={recipient?.photoURL} />
            </ProfileImg>
          ) : (
            <ProfileImg>
              <Person />
            </ProfileImg>
          )}
        </MessageContainerLeft>
        <MessageContainerRight>
          <NameTag>
            {userLoggedIn.email === recipientEmail[0]
              ? `${recipientEmail[1][0]}${recipientEmail[1][1]}${recipientEmail[1][2]}`
              : `${recipientEmail[0][0]}${recipientEmail[0][1]}${recipientEmail[0][2]}`}
          </NameTag>
          <TypeOfMessage>{message.message}</TypeOfMessage>
          <TypeOfMessageTime>
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
          </TypeOfMessageTime>
        </MessageContainerRight>
      </MessageContainer>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageContainerLeft = styled.div``;
const MessageContainerRight = styled.div``;

const MyContainer = styled.div``;

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyName = styled.span`
  display: none;
`;

const FriendName = styled.span`
  font-size: 15px;
  opacity: 0.7;
`;

const MyProfile = styled.div`
  display: none;
`;

const FriendProfile = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 35%;
  background-color: #15a5c1;
  display: flex;
  margin-right: 10px;
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
  margin-left: 0px;
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

import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import PersonIcon from "@material-ui/icons/Person";

function FriendProfile({ users, email, photoURL }) {
  // const [user] = useAuthState(auth);
  // const [recipientSnapshot] = useCollection(
  //   db.collection("users").where("email", "==", getRecipientEmail(users, user))
  // );
  // const recipient = recipientSnapshot?.docs?.[0]?.data();
  // const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container>
      {/* {photoURL ? (
        <UserAvatar src={photoURL} />
      ) : (
        <UserAvatar>
          <PersonIcon />
        </UserAvatar>
      )}
      <p>{email}</p> */}
      <FriendProfileLeft>
        {photoURL ? (
          <UserAvatar src={photoURL} />
        ) : (
          <UserAvatarNone>
            <NoAvatar />
          </UserAvatarNone>
        )}
        <FriendsInfo>
          <FriendName>
            {email[0]}
            {email[1]}
            {email[2]}
          </FriendName>
          <FriendEmail>{email}</FriendEmail>
        </FriendsInfo>
      </FriendProfileLeft>
      <FriendProfileRight>
        <span>상태메세지</span>
      </FriendProfileRight>
    </Container>
  );
}

export default FriendProfile;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const UserAvatar = styled.img`
  margin-right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 35%;
  border: 1px solid whitesmoke;
`;

const NoAvatar = styled(PersonIcon)``;

const UserAvatarNone = styled.div`
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

const FriendsInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.span`
  flex: 1;
  font-size: 22px;
`;
const FriendEmail = styled.span`
  font-size: 15px;
  opacity: 0.5;
`;

const FriendProfileLeft = styled.div`
  display: flex;
`;
const FriendProfileRight = styled.div`
  border: 1px solid gray;
  height: 40px;
  width: auto;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 14px;
  background-color: transparent;
  opacity: 0.7;
`;

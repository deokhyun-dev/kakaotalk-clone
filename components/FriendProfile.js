import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";

function FriendProfile({ users, email }) {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container>
      <h2>{recipientEmail[0][0]}</h2>
      <h5>{email}</h5>
      <img src={recipient?.photoURL} />
    </Container>
  );
}

export default FriendProfile;

const Container = styled.div`
  margin-top: 10px;
`;

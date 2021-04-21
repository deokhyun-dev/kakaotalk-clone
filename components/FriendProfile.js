import styled from "styled-components";

function FriendProfile({ user, photoURL, email }) {
  return (
    <Container>
      <h1>{email}</h1>
      <img src={photoURL} />
    </Container>
  );
}

export default FriendProfile;

const Container = styled.div`
  margin-top: 10px;
`;

import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import FriendProfile from "../components/FriendProfile";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PersonIcon from "@material-ui/icons/Person";

function Friends() {
  const [users] = useAuthState(auth);
  const [userList] = useCollection(db.collection("users"));
  const [friendNum, setFriendNum] = useState("");

  const showUsers = () => {
    if (userList) {
      return userList.docs.map((user) => (
        <FriendProfile
          key={user.id}
          id={user.id}
          users={user.data().user}
          email={user.data().email}
          photoURL={user.photoURL}
        />
      ));
    }
  };
  useEffect(() => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        setFriendNum(querySnapshot.size);
      });
  }, [userList]);

  return (
    <Container>
      <MyInfo>
        <MyInfoLeft>
          {users.photoURL ? (
            <MyProfile src={users.photoURL} />
          ) : (
            <UserAvatarNone>
              <NoAvatar />
            </UserAvatarNone>
          )}
          <MyInfoContainer>
            <MyInfoName>
              {users.email[0]}
              {users.email[1]}
              {users.email[2]}
            </MyInfoName>
            <MyInfoEmail>{users.email}</MyInfoEmail>
          </MyInfoContainer>
        </MyInfoLeft>
        <MyInfoDesc>상태메세지</MyInfoDesc>
      </MyInfo>
      <MiddleInfo>
        <span>친구 {friendNum}</span>
        <ExpandLessIcon />
      </MiddleInfo>
      <FriendList>
        <MyFriend>
          {/* <FriendProfile src="/img/kakao-talk-logo.png" /> */}
          {showUsers()}
        </MyFriend>
      </FriendList>
    </Container>
  );
}

export default Friends;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
`;

const MyInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyProfile = styled.img`
  margin-right: 10px;
  width: 70px;
  height: 70px;
  border-radius: 35%;
  border: 1px solid whitesmoke;
`;

const UserAvatarNone = styled.div`
  margin-right: 10px;
  width: 70px;
  height: 70px;
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

const MyInfoName = styled.span`
  font-size: 22px;
  flex: 1;
`;

const MyInfoEmail = styled.span`
  opacity: 0.5;
`;

const MyInfoDesc = styled.span`
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

const MiddleInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  opacity: 0.5;
`;

const FriendList = styled.div``;

const MyFriend = styled.div`
  display: flex;
  flex-direction: column;
`;

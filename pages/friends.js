import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import FriendProfile from "../components/FriendProfile";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState, useEffect } from "react";

function Friends() {
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
          <MyProfile src="/img/kakao-talk-logo.png" />
          <MyInfoName>조준형</MyInfoName>
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
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
`;

const MyInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyProfile = styled.img`
  margin-right: 10px;
  width: 80px;
  height: 80px;
  border-radius: 35%;
  border: 1px solid whitesmoke;
`;

const MyInfoName = styled.span`
  font-size: 20px;
  margin-left: 5px;
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

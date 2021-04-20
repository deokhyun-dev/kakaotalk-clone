import styled from "styled-components";
import { Avatar } from "@material-ui/core";

function Friends() {
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
        <span>친구 330</span>
        <span>^</span>
      </MiddleInfo>
      <FriendList>
        <MyFriend>
          <FriendProfile src="/img/kakao-talk-logo.png" />
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

const MyFriend = styled.div``;

const FriendProfile = styled.img`
  width: 60px;
  height: 60px;
`;

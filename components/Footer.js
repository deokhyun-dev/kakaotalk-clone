import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  return (
    <Container>
      <Friends>
        <IconButtons
          onClick={() => {
            router.push("/");
          }}
        >
          <PersonIcon />
        </IconButtons>
      </Friends>
      <Chats>
        <IconButtons
          onClick={() => {
            router.push("/chatPage");
          }}
        >
          <ChatBubbleIcon />
        </IconButtons>
      </Chats>

      <HashEvent>
        <IconButtons>
          <LiveHelpIcon />
        </IconButtons>
      </HashEvent>
      <More>
        <IconButtons
          onClick={() => {
            router.push("/setting");
          }}
        >
          <MoreHorizIcon />
        </IconButtons>
      </More>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  position: sticky;
  background-color: #964b00;
`;

const IconButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;

  :active,
  :focus {
    border: none;
    border-inline-color: none;
  }

  :hover {
    color: whitesmoke;
  }
`;
const Friends = styled.div``;
const Chats = styled.div``;
const HashEvent = styled.div``;
const More = styled.div``;

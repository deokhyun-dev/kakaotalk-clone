import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Footer() {
  return (
    <Container>
      <Friends></Friends>
      <Chats></Chats>
      <HashEvent></HashEvent>
      <More></More>
    </Container>
  );
}

export default Footer;

const Container = styled.div``;
const Friends = styled.div``;
const Chats = styled.div``;
const HashEvent = styled.div``;
const More = styled.div``;

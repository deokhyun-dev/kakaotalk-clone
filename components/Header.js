import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function Header() {
  return (
    <Container>
      <PageInfo>title</PageInfo>
      <IconContainer>
        <IconButtons>
          <SearchIcon />
        </IconButtons>
        <IconButtons>
          <PersonAddIcon />
        </IconButtons>
        <IconButtons>
          <SettingsIcon />
        </IconButtons>
      </IconContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  top: 0;
  position: sticky;
`;

const PageInfo = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const IconContainer = styled.div``;

const IconButtons = styled.button`
  background-color: transparent;
  border: none;
`;

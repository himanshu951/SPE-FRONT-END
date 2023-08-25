import React from "react";
import styled from "styled-components";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Typography)`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Description = styled(Typography)`
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage = () => {

  // useEffect(()=>{
  //   setInit();
  // });
  // const setInit= async()=>{
  //   localStorage.setItem("isAdminAuthenticated",'fasle');
  //   localStorage.setItem("isGamerAuthenticated",'false');
  // };
  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Content>
          <Title variant="h2">Welcome to <div variant="h1">Gaming-Cafe</div></Title>
          <br/>
          <Description variant="body1">
            Play games like never before. Welcome to our gaming cafe where all games are available on rental basics.
            You can rent any game availble in our huge collection and get charged only for the duration you played for.
          </Description>
          <br/>
          <Link to={`/gamer/login`}>
            <ButtonWrapper>
                <Button variant="contained" color="primary">
                Gamer Login
                </Button>
            </ButtonWrapper>
          </Link>
          <br/> 
          <Link to={`/admin/login`}>
            <ButtonWrapper>
                <Button variant="contained" color="primary">
                Admin Login
                </Button>
            </ButtonWrapper>
          </Link>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default HomePage;

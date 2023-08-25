import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { getConfig, initUrl } from "../config/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Typography)`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;


const GamerRegisterPage = () => {
    const navigator= useNavigate();
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname,SetLastname]= useState("");
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [email,SetEmail]= useState("");
    const [gamertag,SetGamertag]= useState("");
    const [level,SetLevel] = useState("");
    const [age,SetAge]= useState("");
    const [gender,SetGender]= useState(null);
    const radioOptions = [
        { value: "male", label: 'Male' },
        { value: "female" , label: 'Female' }
      ];
    const handleSubmit = async(event) => {
        if(username==='' || firstname==='' || lastname==='' || password==='' || password !== confirmpassword || email==="" || gamertag==='' || level==='' || age==='' || gender===null){
            console.log("Error in filling form");
            alert("missing fields");
        }
        else{
            const intage=parseInt(age,10);
            const data={username,firstname,lastname,password,email,gamertag,level,age:intage,gender};
            const data1={
              username,
              email,
              password,
              role:1,
              verified:0
            }
            const config= getConfig();
            const res1= await axios.post(initUrl+"/gamer/register",data1,config);
            const gid= res1.data;
            const data2={
              gid,
              firstname,
              lastname,
              gamertag,
              age:intage,
              level,
              gender:gender
            }
            console.log(data2);
            const res2=await axios.post(initUrl+"/gamer/save",data2,config);
            // .catch(function (error){
            //   console.log(error);
            // });
            alert(res2.data);
            navigator('/gamer/login');
        }
    };
  return (
    <Wrapper style={{height: '1200px', overflowY: 'scroll'}}>
      <Container maxWidth="sm">
        <Content>
          <Title variant="h4">Create your account</Title>
          <Form>
          <InputWrapper>
              <TextField 
                name="username" 
                label="User name" 
                variant="outlined" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                fullWidth 
              />
            </InputWrapper>
            <InputWrapper>
              <TextField 
                name="firstname" 
                label="First name" 
                variant="outlined" 
                value={firstname} 
                onChange={(e) => setFirstname(e.target.value)}
                fullWidth 
              />
            </InputWrapper>
            <InputWrapper>
              <TextField 
                name="lastname" 
                label="Last name" 
                variant="outlined" 
                value={lastname} 
                onChange={(e) => SetLastname(e.target.value)}
                fullWidth 
              />
            </InputWrapper>
            <InputWrapper>
              <TextField 
                name="email" 
                label="Email" 
                variant="outlined" 
                value={email} 
                onChange={(e) => SetEmail(e.target.value)} 
                fullWidth 
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                label="Level"
                variant="outlined"
                value={level}
                onChange={(e) => SetLevel(e.target.value)}
                fullWidth
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                label="Age"
                variant="outlined"
                value={age}
                onChange={(e) => SetAge(e.target.value)}
                fullWidth
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                label="Gamer Tag"
                variant="outlined"
                value={gamertag}
                onChange={(e) => SetGamertag(e.target.value)}
                fullWidth
              />
            </InputWrapper>
            <InputWrapper>
                Select Gender
                <RadioGroup value={gender} onChange={(e) => SetGender(e.target.value)}>
                    {radioOptions.map((option) => (
                    <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="primary" />}
                    label={option.label}
                    />
                    ))}
                </RadioGroup>
            </InputWrapper>
            <InputWrapper>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                label="Confirm password"
                variant="outlined"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                fullWidth
              /> 
            </InputWrapper>
            
            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
              Sign up
            </Button>
          </Form>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default GamerRegisterPage;

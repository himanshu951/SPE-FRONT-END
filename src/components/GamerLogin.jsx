import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getConfig, initUrl , isTokenExist, checkForGamerTokenExist } from '../config/auth';
import axios from 'axios';

const Container = styled(Box)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to right bottom, #b392ac, #6a8d8f)',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '300px',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
  backgroundColor: '#fff',
});

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
});

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const LoginError = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'center',
}));

const GamerLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToken, setIsToken] = useState();
  useEffect(() => {
    setIsToken(isTokenExist());
  }, []);
  const navigate= useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    const data={username,password,role:1};
    console.log(data);
    const config= getConfig();
    const result= await axios.post(initUrl+"/gamer/authenticate",data,config)
    .catch(function (err){
      alert("Invalid Creds or User Not Approved");
    })
    if (result.status !== 200) {
      setIsLoggedIn(false);
      alert("Problem Faced");
      setError("ghfhg");
    } else {
      setIsLoggedIn(true);
    }
    if (result.status === 200) {
      const token = result.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("isGamerAuthenticated",'true');
      navigate("/gamer/home");
    }
    else{
      setError("Invalid creds");
    }
    console.log(isToken);
  };

  if (isToken !==null && checkForGamerTokenExist()!==null) {
    if(localStorage.getItem('isAdminAuthenticated'))
    localStorage.removeItem('isAdminAuthenticated')
    navigate("/gamer/home");
  }

  return (
    <Container>
      <Form>
        <Title>Gamer Login</Title>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <LoginError>{error}</LoginError>}
        <LoginButton onClick={handleLogin} variant="contained" type="submit">
          Login
        </LoginButton>
        <Grid container>
            <Grid item>
              <Link to={`/gamer/register`}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </Form>
    </Container>
  );
};

export default GamerLoginPage;

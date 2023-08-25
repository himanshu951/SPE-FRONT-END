import { useState ,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { checkForAdminTokenExist, initUrl, isTokenExist } from "../config/auth";
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

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToken, setIsToken] = useState();
  useEffect(() => {
    setIsToken(isTokenExist());
  }, []);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    const data={username,password,role:0};
    console.log(data);
    const result= await axios.post(initUrl+"/admin/authenticate",data)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Invalid Creds");
        setError("Invalid Creds");
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
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
      localStorage.setItem("isAdminAuthenticated",'true');
      if(localStorage.getItem('isGamerAuthenticated'))
    localStorage.removeItem('isGamerAuthenticated')
      navigate("/admin/home");
    }
    else{
      setError("Invalid creds");
    }
    console.log(isToken);
    
  };
  if (isToken !==null && checkForAdminTokenExist() !==null) {
    if(localStorage.getItem('isGamerAuthenticated'))
    localStorage.removeItem('isGamerAuthenticated')
    navigate("/admin/home");
  }
  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Admin Login</Title>
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
        <LoginButton variant="contained" type="submit">
          Login
        </LoginButton>
      </Form>
    </Container>
  );
};

export default AdminLoginPage;

import * as React from 'react';
import { Link } from 'react-router'
import styled from 'styled-components'
import imgSkin from '../assets/images/pexels-cottonbro-6542718.jpg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Header from '../components/Header';
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ContainerImg = styled.div`
  height: 80vh;
  width: 50%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`
const ImgInContainer = styled.img`
  width: 100%;
  height: 90vh
`
const ContainerForm = styled.div`
  width: 50%;
  margin: 50px;
  
`

const ContainerButtons = styled.div`
  display: flex;
  gap:20px;
  margin-bottom: 60px;
`
const ContainerBoxForm = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #9D5B76;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  border: 1px solid #9D5B76;
  border-radius: 30px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    background-color: #9D5B76;`}
`

const ButtonSubmit = styled.button`
  padding: 10px 15px;
  color: white; 
  background-color: #9D5B76;
  width: 150px;
  text-decoration: none;
  border-radius: 30px;
  font-size: 14px;
  text-align: center;
  border: 0px;
`

const TitleH2 = styled.h1`
  font-size: 22px;
  color: #9D5B76;
  padding-bottom: 25px;
  margin-top:5px;
`

function Signup() {

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
  let navigate = useNavigate();

  //console.log(email.value)
  console.log(process.env.REACT_APP_BACKENDURL);

  const handleSubmit = (event) => {
    event.preventDefault();
    //validateInputs();
    /*if (emailError || passwordError) {
      event.preventDefault();
      console.log("erreur");
      return;
    }*/
      const email = document.getElementById('email').value;
      const name = document.getElementById('name').value;
      const password = document.getElementById('password').value;
    const userData = {
      email: email,
      password: password,
      name: name,
    };

    console.log(userData);

    fetch(`${process.env.REACT_APP_BACKENDURL}users/register`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log("ca a marché");
        console.log("voici les data : ", data);
        //navigate('/periodtracker');
        navigate('/signin');
      })
      .catch(error => {
        // Handle any errors
        console.log("il y a une erreur : ", error)
      });

    console.log("je suis dans handleSubmit");
  };

  /*const validateInputs = () => {

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      console.log(setEmailErrorMessage)
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    console.log("je suis dans validateInputs");
    //TODO : revoir la redirection
    //navigate('/periodtracker');
    return isValid;
  };*/

    return (
      <div>
        <Header />
        <Container>
          <ContainerImg>
            <ImgInContainer src={imgSkin} alt="img"></ImgInContainer>
          </ContainerImg>
          <ContainerForm>
            <ContainerButtons>
              <StyledLink to="/signup" $isFullLink>Signup</StyledLink>
              <StyledLink to="/signin">Signin</StyledLink>
            </ContainerButtons>
            <TitleH2>Create your account</TitleH2>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="off">
            <ContainerBoxForm>
              <FormControl>
                <TextField required id="email" error={emailError} helperText={emailErrorMessage} label="Email Address" />
              </FormControl>
              <FormControl>
                <TextField required id="name" label="Name" />
              </FormControl>
              <FormControl>
                <TextField required id="password" error={passwordError} helperText={passwordErrorMessage} label="Password" type="password" autoComplete="current-password" />
              </FormControl>
              <ButtonSubmit type="submit" onClick={console.log("je clique")}>Let's go !</ButtonSubmit>
              </ContainerBoxForm>
            
            </Box>
          </ContainerForm>
        </Container>
      </div>
    )
}

export default Signup
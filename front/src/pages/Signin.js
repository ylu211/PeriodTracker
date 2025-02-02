import * as React from 'react';
import { Link } from 'react-router'
import styled from 'styled-components'
import imgSkin from '../assets/images/pexels-cottonbro-6542718.jpg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Header from '../components/Header'
import { useNavigate } from "react-router";

// STYLES CSS

const Container = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`
// Partie img
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

// Partie formulaire de connexion
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

function Signin() {

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const userData = {
        email: email.value,
        password: password.value,
      };

      // Appel API
      fetch(`${process.env.REACT_APP_BACKENDURL}users/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(userData),
      })
        .then(response => 
          response.json()
        )
        .then(data => {
            window.localStorage.setItem("token", data.token);
            navigate('/periodtracker', { state: { token: data.token} });
        })
        .catch(error => {
          console.log("il y a une erreur : ", error)
        });
  };

    return (
      <div>
        <Header />
        <Container>
          <ContainerImg>
            <ImgInContainer src={imgSkin} alt="img"></ImgInContainer>
          </ContainerImg>
          <ContainerForm>
            <ContainerButtons>
              <StyledLink to="/signup">Signup</StyledLink>
              <StyledLink to="/signin" $isFullLink>Signin</StyledLink>
            </ContainerButtons>
            <TitleH2>Log into your account</TitleH2>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="off">
            <ContainerBoxForm>
              <FormControl>
                <TextField required id="email" label="Email Address" />
              </FormControl>
              <FormControl>
                <TextField required id="password" label="Password" type="password" autoComplete="current-password" />
              </FormControl>
              <ButtonSubmit type="submit" onClick={console.log("submit")}>Let's go !</ButtonSubmit>
              </ContainerBoxForm>
            
            </Box>
          </ContainerForm>
        </Container>
      </div>
    )
}

export default Signin
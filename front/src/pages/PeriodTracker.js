import { Link } from 'react-router'
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 30px;
  }
`

const ContainerImg = styled.div`
  width: 50%;
  @media only screen and (max-width: 768px) {
    height: 30vh;
    width: 100%;
  }
`
const ContainerTxt = styled.div`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`

const TitleH1 = styled.h1`
  font-size: 44px;
  color: #9D5B76;
  margin-bottom: 1px;
  @media only screen and (max-width: 768px) {
    font-size: 35px;
  }
`
const TitleH2 = styled.h1`
  font-size: 22px;
  color: #9D5B76;
  padding-bottom: 25px;
  margin-top:5px;
  font-weight: 500;
`

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #9D5B76;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; 
    background-color: #9D5B76;`}
`

const ButtonSubmit = styled.button`
  padding: 10px 5px;
  color: white; 
  background-color: #9D5B76;
  width: 150px;
  text-decoration: none;
  border-radius: 30px;
  font-size: 14px;
  text-align: center;
  border: 0px;
  margin-top: 15px;
`

const ContainerBoxForm = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`

function PeriodTracker() {

  const [value, setValue] = React.useState(dayjs());
  const [periodArray, setPeriodArray] = React.useState([]);
  let periodArray2 = [];
  // form
  const flow = document.getElementsByName('row-radio-buttons-group');


  //Récupération du token stocké dans le localStorage
  let tokenStored = window.localStorage.getItem('token');
  let idStored = window.localStorage.getItem('id');
  console.log(tokenStored);
  console.log("est-ce que ça s'affiche ?");

  if (tokenStored === null){
    console.log("il n'y a pas de token");
  }else{
    const decodedToken = jwtDecode(tokenStored);
    // récupérer l'id du user grâce au mail contenu dans le token
    fetch(`${process.env.REACT_APP_BACKENDURL}users/mail/${decodedToken.email}`, {
      mode: 'cors',
      method: "GET",
      headers: {
        'Authorization': `Bearer ${tokenStored}`, // Ajout du token pour vérifier l'authentification côté backend
      },
    })
    .then(response => response.json())
        .then(data => {
          window.localStorage.setItem("id", data._id);
        })
        .catch(error => {
          console.log("erreur : ", error)
        });
    
  }

  // récupérer l'id du user
  const userId = window.localStorage.getItem('id');

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => { 
      signal.onabort = () => {
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }
  
  const initialValue = dayjs();

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🩸' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  let daysFromDbArray = [];

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();

      fetch(`${process.env.REACT_APP_BACKENDURL}cycles/user/${userId}`, {
        mode: 'cors',
        method: "GET",
        headers: {
          'Authorization': `Bearer ${tokenStored}`, // Ajout du token pour vérifier l'authentification côté backend
        },
      })
      .then(response => response.json())
          .then(data => {
            data.forEach(oneData => {
              let dateOfPeriod = new Date(oneData.startDate);
              dateOfPeriod = {"day" : dateOfPeriod.getDate(), "month": dateOfPeriod.getMonth(), "year": dateOfPeriod.getFullYear()};
              periodArray2.push(dateOfPeriod);              
              periodArray2.forEach(element => {
                daysFromDbArray.push(element.day);
              });
            setHighlightedDays(daysFromDbArray);

            });
          })
          .catch(error => {
            console.log("erreur : ", error)
          });
    requestAbortController.current = controller;
  };
  

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    let flowValue;
      for (let radio of flow) {
        if (radio.checked) {
          flowValue = radio.value;
        }
      }

      const userData = {
          startDate: value.$d,
          endDate: value.$d,
          symptoms: flowValue
      };

      fetch(`${process.env.REACT_APP_BACKENDURL}cycles/user/${userId}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          //'Authorization': `Bearer ${tokenStored}`, // Ajout du token pour vérifier l'authentification côté backend
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          console.log("voici les data : ", data);
          fetchHighlightedDays(initialValue);
        })
        .catch(error => {
          console.log("il y a une erreur : ", error);
        });

  };

  return (
    <div>
      <Header />
      <Container>
        <ContainerImg>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={initialValue}
              value={value} 
              onChange={(newValue) => setValue(newValue)}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </LocalizationProvider>
        </ContainerImg>
        <ContainerTxt>
          <TitleH1>{value.$d.getDate()} {new Intl.DateTimeFormat("en-US", {month: "long"}).format(value.$d.getMonth())} {value.$d.getFullYear()} 🩸</TitleH1>
          <TitleH2>What is happening today ?</TitleH2>

          <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="off">
            <ContainerBoxForm>
              <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" id="flow">
                  <FormControlLabel value="Light" control={<Radio />} label="Light 🩸" id="flow-light" />
                  <FormControlLabel value="Moderate" control={<Radio />} label="Moderate 🩸🩸" id="flow-moderate" />
                  <FormControlLabel value="Heavy" control={<Radio />} label="Heavy 🩸🩸🩸" id="flow-heavy" />
                </RadioGroup>
              </FormControl>
              <ButtonSubmit type="submit" onClick={console.log("submit")}>Save</ButtonSubmit>
            </ContainerBoxForm>
            
          </Box>
        </ContainerTxt>
      </Container>
    </div>
  );
}

export default PeriodTracker;

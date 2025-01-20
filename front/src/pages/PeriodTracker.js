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
    fetch(`http://localhost:3001/users/mail/${decodedToken.email}`, {
      mode: 'cors',
      method: "GET",
      headers: {
        'Authorization': `Bearer ${tokenStored}`, // Ajout du token pour vérifier l'authentification côté backend
      },
    })
    .then(response => response.json())
        .then(data => {
          // Handle the response data here
          console.log("voici les data : ", data);
          window.localStorage.setItem("id", data._id);
        })
        .catch(error => {
          // Handle any errors
          console.log("erreur : ", error)
        });
    
  }

  // récupérer l'id du user
  const userId = window.localStorage.getItem('id');
  //console.log(userId);

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      //const timeout = setTimeout(() => {
        //const daysInMonth = date.daysInMonth();
        //const daysToHighlight = periodArray2 > 0 ? periodArray2 : [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
  
        //resolve({ daysToHighlight });
      //}, 500);
  
      signal.onabort = () => {
        //clearTimeout(timeout);
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
  //let highlightedDays =[]; //les jours où il y a la goutte, à remplacer par les dates de la bdd
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  //console.log(highlightedDays)
  let daysFromDbArray = [];

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    
    /*fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });*/

      fetch(`http://localhost:3001/cycles/user/${userId}`, {
        mode: 'cors',
        method: "GET",
        headers: {
          'Authorization': `Bearer ${tokenStored}`, // Ajout du token pour vérifier l'authentification côté backend
        },
      })
      .then(response => response.json())
          .then(data => {
            // Handle the response data here
            //console.log("voici les data : ", data);
            data.forEach(oneData => {
              //console.log(oneData.startDate);
              let dateOfPeriod = new Date(oneData.startDate);
              dateOfPeriod = {"day" : dateOfPeriod.getDate(), "month": dateOfPeriod.getMonth(), "year": dateOfPeriod.getFullYear()};
              periodArray2.push(dateOfPeriod);
              //console.log(periodArray2.length)
              
              periodArray2.forEach(element => {
                daysFromDbArray.push(element.day);
              });
            setHighlightedDays(daysFromDbArray);

            });
          })
          .catch(error => {
            // Handle any errors
            console.log("erreur : ", error)
          });

          
          
      

    requestAbortController.current = controller;
  };
  
  //console.log(daysFromDbArray);
  //console.log(highlightedDays);

  React.useEffect(() => {
    //setHighlightedDays(daysFromDbArray);
    /*for(let i=0; i<periodArray2.length; i++){
      highlightedDays.push(periodArray2[i].day);
      console.log(periodArray2[i].day)
    }*/

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
    //highlightedDays = []
    fetchHighlightedDays(date);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event);
    console.log("je valide");

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

      fetch(`http://localhost:3001/cycles/user/${userId}`, {
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
          // Handle any errors
          console.log("il y a une erreur : ", error);
        });

  };

  const validateInput = () => {
    
  }

  //console.log("je veux voir periodArray : ", periodArray);
  console.log("je veux voir periodArray2 : ", periodArray2);


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

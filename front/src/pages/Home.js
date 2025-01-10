import { Link } from 'react-router'
import styled from 'styled-components'
import Header from '../components/Header'
import imgFlower from '../assets/images/pexels-cottonbro-3737816-resized2.jpg'

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
    height: 20vh;
  }
`
const ImgInContainer = styled.img`
  width: 100%;
`
const ContainerTxt = styled.div`
  width: 50%;
  align-items: center;
  text-align: center;
`

const TitleH1 = styled.h1`
  font-size: 44px;
  color: #9D5B76;
  margin-bottom: 1px;
`
const TitleH2 = styled.h1`
  font-size: 22px;
  color: #9D5B76;
  padding-bottom: 25px;
  margin-top:5px;
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

function Home() {
  return (
    <div>
      <Header />
      <Container>
        <ContainerImg>
          <ImgInContainer src={imgFlower} alt="logo" />
        </ContainerImg>
        <ContainerTxt>
          <TitleH1>Never be surprised again 🩸</TitleH1>
          <TitleH2>Track your menstrual cycle with PeriodTracker, it's free 💞</TitleH2>
          <StyledLink to="/signup" $isFullLink>Join us now</StyledLink>
          <StyledLink to="/signup">Sign in</StyledLink>
        </ContainerTxt>
      </Container>
    </div>
  );
}

export default Home;

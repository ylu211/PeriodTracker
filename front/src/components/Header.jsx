import { Link } from 'react-router'
import styled from 'styled-components'
//import logoPink from "../assets/images/PeriodTracker-logo-pink-1"
import logoPurple from "../assets/images/PeriodTracker-logo-purple-1.png"
 

const PtLogo = styled.img`
    height: 30px;
    align-self: center;
    border-radius: 50%;
`

const NavContainer = styled.nav`
  padding: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function Header() {
    return (
        <NavContainer>
            <Link to="/"><PtLogo src={logoPurple} alt='PeriodTracker' /></Link>
            <div>
            <StyledLink to="/signin">Signin</StyledLink>
            <StyledLink to="/signup" $isFullLink>
                Signup
            </StyledLink>
            </div>

        </NavContainer>
    )
}

export default Header
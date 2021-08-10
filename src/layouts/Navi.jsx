import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Menu,
  Icon,
} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Navi() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  function handleSignOut(params) {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      <Menu size="huge" inverted className="navi">
        <Container>
          <Menu.Item className="text">
           
          <Link to={`/`} >
            {/* <Icon  name="braille"/><b>   </b>
              <b className="aer">H</b> <b className="aer">R</b> <b className="aer">M</b> <b className="aer">S</b> */}

              HRMS <span className='text-secondary'>Project</span>
            </Link>
            
            
          </Menu.Item>

          <Menu.Menu position="right">
            
            {authItem[0].loggedIn?<SignedIn/>:<SignedOut/>}

            
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}

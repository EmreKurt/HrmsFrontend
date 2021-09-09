import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Menu,
  Icon,
  Divider,
  Grid,
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

  const { authItem } = useSelector((state) => state.auth);
  return (
    <Menu size="massive" className="navi">
      <Menu.Item onClick>
        <Link to={`/`}>
          <span className="erte">HRMS Project</span>
        </Link>
      </Menu.Item>

      <Menu.Item onClick>
        <Link to={`/advertisements`}>
          <span className="sear">İlan ara</span>
        </Link>
      </Menu.Item>

      {authItem[0].user.userType===2 && 
       <Menu.Item onClick>
        <Link to={`/addJobAdvertisement`}>
          <span class="sear">İlan Ekle</span>
        </Link>
      </Menu.Item> }

      <Menu.Menu position="right">
        <span className="loog">
          {authItem[0].loggedIn ? <SignedIn /> : <SignedOut />}
        </span>
      </Menu.Menu>
    </Menu>
  );
}

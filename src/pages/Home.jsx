import React, { createRef, useEffect, useState } from "react";
import {
  Divider,
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Card,
  List,
  Menu,
  Segment,
  Label,
  ButtonGroup,
} from "semantic-ui-react";

import { Container } from "reactstrap";
import SignedIn from "../layouts/SignedIn";
import SignedOut from "../layouts/SignedOut";
import Navi from "../layouts/Navi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <div style={{ position: "relative" }}>
          <Image
            style={{ position: "absolute" }}
            src={require("../assets/img/header1.jpg").default}
          />
          <div>
            <Menu size="massive" className="navi">
              <Menu.Item onClick>
                <Link to={`/`}>
                  <span className="erte">HRMS Project</span>
                </Link>
              </Menu.Item>

              <Menu.Item position="right" onClick>
                <Link style={{ color: "white" }}>
                  <Icon name="info" />
                  <span>Hakkımızda</span>
                </Link>
              </Menu.Item>

              <Menu.Item onClick>
                <Icon style={{ color: "white" }} name="id card outline" />
                <Link style={{ color: "white" }} to={`/advertisements`}>
                  <span>İş ilanları</span>
                </Link>
                <a
                  href={`https://www.instagram.com/`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <span style={{ paddingLeft: 50, color: "white" }}>
                    <Icon name="instagram" />
                  </span>
                </a>
                <a
                  href={`https://twitter.com/`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                <span style={{ paddingLeft: 25, color: "white" }}>
                  <Icon name="twitter" />
                </span>
                </a>
                <a
                  href={`https://www.facebook.com/`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                <span
                  style={{ paddingLeft: 25, color: "white" }}
                  className="loog"
                >
                  <Icon name="facebook" />
                </span>
                </a>
              </Menu.Item>
            </Menu>
          </div>
          <Image
            src={require("../assets/img/logo3.png").default}
            style={{
              position: "absolute",
              paddingTop: 300,
              paddingLeft: 650,
            }}
          />

          <h1
            style={{
              position: "absolute",
              paddingTop: 600,
              paddingLeft: 780,
              color: "white",
            }}
          >
            KARİYER PLATFORMUNUZ.
          </h1>
          <h3
            style={{
              position: "absolute",
              paddingTop: 650,
              paddingLeft: 820,
              color: "white",
            }}
          >
            Hayalinizdeki işe son bir adım . . .
          </h3>
          <div style={{ paddingRight: 450 }}>
            <Button.Group style={{ paddingTop: 780, position: "absolute" }}>
              <Link style={{ paddingRight: 50 }} to={`/login`}>
                {" "}
                <Button
                  size="big"
                  primary
                  style={{
                    marginLeft: "0.5em",
                    borderRadius: "25px",
                    padding: "15px 65px",
                  }}
                >
                  Giriş Yap
                </Button>
              </Link>
              <Link style={{ paddingRight: 50 }} to={`/recort`}>
                {" "}
                <Button
                  size="big"
                  style={{ borderRadius: "25px", padding: "15px 65px" }}
                  positive
                >
                  Kayıt Ol
                </Button>
              </Link>
            </Button.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

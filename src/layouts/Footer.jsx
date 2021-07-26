import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Divider,
  Image,
  Card,
  Menu,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Dropdown } from "bootstrap";

export default function Footer() {
  return (
      
    <div className="bg">
        
      <Container textAlign="center">
        <Grid divided inverted stackable textAlign="center">
            
          <MDBCol md="3" lg="4" xl="3" className="mb-4">
          <Grid.Row></Grid.Row>
            <h3 className="text-uppercase font-weight-bold">
              <strong>HRMS</strong>
            </h3>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p style={{ fontWeight: "bolder" }}>
              
            <p>İş verenler ve iş arayanları buluşturmayı amaçladığımız bu</p>
            <p> platform ile iş verme ve iş bulma süreçlerinde hayatı</p>
            <p> kolaylaştırmayı amaçlıyoruz.</p>
            </p>
          </MDBCol>
          <Grid.Column width={3}>
            <List>
              <h3 className="text-uppercase font-weight-bold">
                <strong>Sayfalar</strong>
              </h3>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <a href="#">İş Verenler</a>
              </p>
              <p>
                <a href="#">İş Arayanlar</a>
              </p>
              <p>
                <a href="#">İş İlanları</a>
              </p>
              <p>
                <a href="#">Yöneticiler</a>
              </p>
            </List>
          </Grid.Column>

          <Grid.Column width={3}>
            <List>
              <h3 className="text-uppercase font-weight-bold">
                <strong>Linkler</strong>
              </h3>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <a href="#">Hesabınız</a>
              </p>
              <p>
                <a href="#">İş Veren Ortaklık Programları</a>
              </p>
              <p>
                <a href="#">Uygulama</a>
              </p>
              <p>
                <a href="#">Yardım</a>
              </p>
            </List>
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <List>
              <h3 className="text-uppercase font-weight-bold">
                <strong>İletişim</strong>
              </h3>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <i className="fa fa-home mr-3" /> Samsun,Türkiye
              </p>
              <p>
                <i className="fa fa-envelope mr-3" /> emrekurtt76@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3" /> +05539719478
              </p>
            </List>
          </Grid.Column>
        </Grid>
        <Grid textAlign="center">
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
            Telif Hakkı © 2021 HRMS App Inc. Tüm Hakları Saklıdır.
            </MDBContainer>
          </div>
        </Grid>
        <Divider inverted section />
      </Container>
    </div>
  );
}

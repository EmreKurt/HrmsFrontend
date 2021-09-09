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
  Button,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Dropdown } from "bootstrap";

export default function Footer() {
  return (
    <div className="bg">
      <Container textAlign="center">
        <Grid >
          <MDBCol >
            <Grid.Row></Grid.Row>
            <div style={{ paddingTop: 30 ,paddingRight:50}}>
              <h3 className="text-uppercase font-weight-bold">
                <strong style={{ fontSize: 23 }}>HRMS</strong>
              </h3>

              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "150px" }}
              />
              <p style={{ fontWeight: "bolder" }}>
                <p>
                  İş verenler ve iş arayanları buluşturmayı amaçladığımız bu
                </p>
                <p> platform ile iş verme ve iş bulma süreçlerinde hayatı</p>
                <p> kolaylaştırmayı amaçlıyoruz.</p>
              </p>
            </div>
          </MDBCol>
          <Grid.Column width={3}>
            <List>
              <div style={{ paddingTop: 15,paddingRight:50 }}>
                <h3 className="text-uppercase font-weight-bold">
                  <strong style={{ fontSize: 23 }}>Sayfalar</strong>
                </h3>
                <hr
                  className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "120px" }}
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
              </div>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <div style={{ paddingTop: 15,paddingRight:50 }}>
                <h3 className="text-uppercase font-weight-bold">
                  <strong style={{ fontSize: 23, paddingLeft: 15 }}>
                    İletişim
                  </strong>
                </h3>
                <hr
                  className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "120px" }}
                />

                <p style={{ paddingLeft: 15 }}>
                  <i className="fa fa-home mr-3" /> Samsun,Türkiye
                </p>
                <p>
                  <i className="fa fa-envelope mr-3" /> emrekurtt76@gmail.com
                </p>
                <p style={{ paddingLeft: 15 }}>
                  <i className="fa fa-phone mr-3" /> +05539719478
                </p>
              </div>
            </List>
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <div>
            <Grid.Column>
              <List>
                <div style={{ paddingTop: 30,paddingLeft:50 }}>
                  <div style={{ paddingLeft: 48 }}>
                    <h3 className="text-uppercase font-weight-bold">
                      <strong style={{ fontSize: 23 }}>Bize Ulaşın!</strong>
                    </h3>
                    <hr
                      className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                      style={{ width: "120px" }}
                    />
                    <div style={{paddingTop:10}}>
                      <Button size="large" circular color="facebook" icon="facebook" />
                      <Button size="large" circular color="twitter" icon="twitter" />
                      <Button size="large" circular color="instagram" icon="instagram" />
                      <Button size="large" circular color="linkedin" icon="linkedin" />
                      <Button size="large" circular color="google plus" icon="google plus" />
                    </div>
                  </div>
                </div>
              </List>
            </Grid.Column>
          </div>
        </Grid>
        <Grid textAlign="center">
          <div>
              <div style={{fontWeight:"bold",fontSize:20,fontFamily:"initial",paddingTop:120}}>Telif Hakkı © 2021 HRMS App Inc. Tüm Hakları Saklıdır.</div>
          </div>
        </Grid>
        <Divider inverted section />
      </Container>
    </div>
  );
}

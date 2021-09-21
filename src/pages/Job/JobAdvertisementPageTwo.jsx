import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Table,
} from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import CvService from "../../services/cvService";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ShadowBoxWithHeader from "../../layouts/ShadowBoxWithHeader";
import JobSeekerService from "../../services/jobSeekerService";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import Navi from "../../layouts/Navi";
import GradientBox from "../../layouts/GradientBox";
import { FaEllipsisV } from "react-icons/fa";
import { style } from "dom-helpers";
import { MdBorderBottom } from "react-icons/md";
import Employer from "../Employer/Employer";
import JobAdvertisementDetail from "./JobAdvertisementDetail";
import EmployerService from "../../services/employerService";
import EmployerDetail from "../Employer/EmployerDetail";

export default function JobAdvertisementPageTwo() {
  let { id } = useParams();
  const [advertisements, setAdvertisement] = useState([]);
  const [cvs, setCv] = useState([]);
  const [jobSeekers, setJobSeeker] = useState([]);
  const colors = ["red"];
  const { authItem } = useSelector((state) => state.auth);

  useEffect(() => {
    let jobSeekers = new JobSeekerService();
    jobSeekers.getJobSeeker().then((result) => setJobSeeker(result.data.data));
  });

  useEffect(() => {
    let jobSeekers = new JobSeekerService();
    jobSeekers
      .getAllByJobSeeker(authItem[0].user.id)
      .then((result) => setCv(result.data.data));
  }, [id]);

  useEffect(() => {
    let advertisementService = new AdvertisementService();
    advertisementService
      .getByJobAdId(id)
      .then((result) => setAdvertisement(result.data.data));
  }, [id]);
  return (
    <div style={{ paddingBottom: 90 }}>
      <JobAdvertisementDetail />
      <div>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <div style={{paddingLeft:150}}>
                <Card style={{width:880,paddingBottom:680}} fluid><Card.Content >
                    <Card.Content
                      style={{
                        paddingTop: 5,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {advertisements.employer?.companyName}
                    </Card.Content>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingLeft: 260,
                        paddingTop: 40,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Şehir:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        position: "absolute",
                        paddingTop: 40,
                      }}
                    >
                      {advertisements.city?.name}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 100,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      İş Pozisyonu:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 100,
                        position: "absolute",
                      }}
                    >
                      {advertisements.position?.name}
                    </span>
                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 160,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Minimum Ücret:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 160,
                        position: "absolute",
                      }}
                    >
                      {advertisements.minSalary}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 220,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Maximum Ücret:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 220,
                        position: "absolute",
                      }}
                    >
                      {advertisements.maxSalary}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 280,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Pozisyon Adedi:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 280,
                        position: "absolute",
                      }}
                    >
                      {advertisements.openPosition}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 340,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Çalışma Zamanı:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 340,
                        position: "absolute",
                      }}
                    >
                      {advertisements.workTime?.workTime}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 400,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Çalışma Tipi:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 400,
                        position: "absolute",
                      }}
                    >
                      {advertisements.workType?.workType}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 460,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Yayın Tarihi:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 460,
                        position: "absolute",
                      }}
                    >
                      {advertisements.releaseDate}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 520,
                        paddingLeft: 260,
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                      }}
                    >
                      Son başvuru tarihi:
                    </Card.Content>
                    <span
                      style={{
                        paddingLeft: 100,
                        paddingTop: 520,
                        position: "absolute",
                      }}
                    >
                      {advertisements.applicationDeadline}
                    </span>

                    <Card.Content
                      style={{
                        position: "absolute",
                        paddingTop: 600,
                        paddingLeft: 700,
                      }}
                    >
                      <Button
                        color="teal"
                        animated
                        //as={Link}
                        //to={`/cvs/${cvs.id}`}
                        //onClick={handle()}
                      >
                        <Button.Content visible>İlana Başvur</Button.Content>
                        <Button.Content hidden>
                          <Icon name="check" />
                        </Button.Content>
                      </Button>
                    </Card.Content>
                  </Card.Content></Card>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div style={{paddingRight:127,paddingLeft:120}}>
              <Card  style={{paddingBottom:300,borderRadius: "25px"}} fluid>
                  <Card.Content
                    style={{
                      position: "absolute",
                      paddingLeft: 18,
                      fontWeight: "bold",
                      fontFamily: "Trebuchet MS",
                      fontSize: 17,
                    }}
                  >
                    İlan hakkında açıklama
                  </Card.Content>
                  <div
                    style={{
                      position: "absolute",
                      paddingLeft: 20,
                      paddingTop: 50,
                    }}
                  >
                    {advertisements.jobDescription}
                  </div>
                </Card>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

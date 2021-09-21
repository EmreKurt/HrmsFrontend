import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
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

export default function JobAdvertisementDetailPage() {
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

  const [employer, setEmployer] = useState({});
  const [advertisement, setAdvertisements] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let advertisementService = new AdvertisementService();
    advertisementService
      .getActiveAdsByCompanyId(advertisements.employer?.id)
      .then((result) => setAdvertisements(result.data.data));
  }, [advertisements.employer?.id]);

  return (
    <div>
      <JobAdvertisementDetail/>
      <div>
        <Card.Group itemsPerRow={2}></Card.Group>
        <Card.Group
          style={{
            paddingLeft: 140,
            paddingTop: 10,
            paddingBottom: 20,
            paddingRight: 1100,
          }}
          itemsPerRow={1}
        >
          <Card fluid>
            <Card.Content>
              <div
                style={{
                  position: "absolute",
                  paddingLeft: 10,
                  fontWeight: "bold",
                  fontFamily: "Trebuchet MS",
                  fontSize: 17,
                }}
              >
                <span style={{ paddingRight: 5 }}>
                  {advertisements.employer?.companyName}
                </span>{" "}
                Hakkında
              </div>

              <div
                style={{
                  paddingLeft: 15,
                  paddingTop: 25,
                }}
              >
                {advertisements.employer?.explanation}
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
        <Card.Group
          style={{
            paddingLeft: 140,
            paddingTop: 10,
            paddingBottom: 100,
            paddingRight: 1100,
          }}
          itemsPerRow={1}
        >
          <Card fluid>
            <Card.Content>
              <div
                style={{
                  paddingLeft: 10,
                  position: "absolute",
                  fontWeight: "bold",
                  fontFamily: "Trebuchet MS",
                  fontSize: 17,
                }}
              >
                <span style={{ paddingRight: 4 }}>
                  {advertisements.employer?.companyName}
                </span>{" "}
                İş İlanları
              </div>
              <div style={{ position: "absolute" }}>
                <span
                  style={{
                    paddingLeft: 430,
                    color: "#bf00bf",
                    fontSize: 17,
                    fontWeight: "bold",
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  Tüm İş İlanlarını Gör({advertisement?.length})
                </span>
              </div>
              <div style={{ paddingTop: 80 }}>
                <Card.Group  itemsPerRow={2}>
                  {advertisement.map((advertisements) => (
                    <Card style={{ color: "black", paddingBottom:85 }} onClick>
                      <Grid  divided="vertically">
                        <Grid.Row >
                        <div style={{ paddingLeft: 15}}>
                          <span
                            style={{
                              position: "absolute",
                              paddingLeft: 10,
                              fontWeight: "bold",
                              fontSize: 15,
                              paddingTop: 10,
                            }}
                          >
                            {advertisements.position?.name}
                          </span>
                        </div>
                        <div style={{paddingLeft:10}}>
                          <span
                            style={{
                              position: "absolute",
                              paddingTop: 30,
                            }}
                          >
                            {advertisements.city?.name}
                          </span>
                          </div>
                          
                         
                          
                        </Grid.Row>
                         <div style={{paddingTop:45,paddingLeft:25}}>
                        <hr style={{width:270}}/></div> 
                        <span
                            style={{
                              position: "absolute",
                              paddingTop: 120,
                              paddingLeft: 25,
                              fontFamily: "Trebuchet MS",
                              //fontWeight:"bold",
                              fontSize:15
                            }}
                          >
                            {advertisements.employer?.companyName}
                          </span>


                          <div
                            style={{
                              position: "absolute",
                              paddingTop: 95,
                              paddingLeft: 210,
                            }}
                          >
                            <Image
                              src={advertisements.employer?.image.imageUrl}
                              size="tiny"
                              bordered="40px solid transparent"
                            />
                          </div>
                      </Grid>
                    </Card>
                  ))}
                </Card.Group>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </div>
  );
}

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

export default function JobAdvertisementDetail() {
  let { id } = useParams();
  const [advertisements, setAdvertisement] = useState([]);
  const [cvs, setCv] = useState([]);
  const [jobSeekers, setJobSeeker] = useState([]);
  const colors = ["red"];
  const { authItem } = useSelector((state) => state.auth);

  /*function handle(){
    if (cv.active === true) {
      swal({
        title: "Başarılı!",
        text: "Bilgileriniz başarılı bir şekilde güncellenmiştir!",
        icon: "success",
        button: "Ok",
      });
    } else {
      swal({
        title: "İşlem Başarısız!",
        //text: result.data.message,
        icon: "error",
        button: "Ok",
      });
    }
  }*/

  function era() {
    style = { borderBottomStyle: "inset", borderColor: "purple" };
  }

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
    <div>
      {/* <div style={{ paddingLeft: 250, paddingRight: 200 }}>
        <Image
          src={
            "https://assets.new.siemens.com/siemens/assets/api/uuid:51e9b5ab-2621-47d0-8f00-ba076a460cb0/width:2000/quality:high/key-visual-smartoffice-1920x1080px.jpg"
          }
        />
      </div> */}
      <div className="cr7">
        <div className="col">
          <div style={{ paddingLeft: 150, paddingRight: 128 }}>
            <GradientBox>
              <div
                style={{
                  paddingTop: 80,
                  paddingRight: 900,
                  backgroundColor: "#7f007f",
                }}
              >
                <ShadowBoxWithHeader
                  margined={-20}
                  padding={40}
                  width={"140vh"}
                  unanimated
                  className="d-flex flex-column"
                ></ShadowBoxWithHeader>
              </div>
            </GradientBox>
          </div>

          <div style={{ paddingLeft: 110 }}>
            <ShadowBoxWithHeader
              margined={-269}
              padding={40}
              width={"182vh"}
              unanimated
              className="d-flex flex-column"
            >
              <Card fluid>
                <ShadowBoxWithHeader
                  margined={-100}
                  padding={40}
                  width={"173vh"}
                  unanimated
                  className="d-flex flex-column"
                >
                  <Grid divided="vertically">
                    <Grid.Row style={{ paddingBottom: 30 }}>
                      <div>
                        <div style={{ paddingLeft: 15 }}>
                          <Image
                            style={{ height: 115 }}
                            floated="left"
                            size="small"
                            bordered="40px solid transparent"
                            src={advertisements.employer?.image.imageUrl}
                          />
                        </div>{" "}
                        {""}{" "}
                        <div
                          style={{
                            position: "absolute",
                            paddingTop: 80,
                            paddingLeft: 185,
                            fontSize: 21,
                            fontFamily: "Trebuchet MS",
                          }}
                        >
                          {advertisements.employer?.companyName}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            paddingTop: 110,
                            paddingLeft: 185,
                            fontSize: 19,
                          }}
                        >
                          {advertisements.employer?.waitingUpdate ? (
                            <span style={{ color: "#bf00bf" }}>
                              (Son güncelleme onay bekliyor)
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            paddingTop: 85,
                            paddingLeft: 1380,
                          }}
                        >
                          
                          <div >
                               
                               <Button
                               //size="small"
                               style={{
                                //backgroundColor: "white",
                               // color: "purple",
                                //border: "2px solid purple",
                                padding: "10px 45px",
                              }}
                                 //icon="edit"
                                 content="Ayarlar"
                                 color="purple"
                                 inverted
                               />
                               <FaEllipsisV
                               //size="small"
                            style={{ color: "purple", paddingLeft: 5 }}
                          />
                           </div>
                            
                          
                        </div>
                      </div>
                    </Grid.Row>
                    <Grid.Row>
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        Web Site
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 10,
                          paddingLeft: 220,
                          fontFamily: "monospace",
                          opacity: 0.6,
                        }}
                      >
                        {advertisements.employer?.webSite}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 55,
                          paddingLeft: 15,
                        }}
                      >
                        Email Adresi
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 55,
                          paddingLeft: 220,
                          fontFamily: "monospace",
                          opacity: 0.6,
                        }}
                      >
                        {advertisements.employer?.email}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 10,
                          paddingLeft: 750,
                        }}
                      >
                        Kuruluş Yılı
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 10,
                          paddingLeft: 950,
                          fontFamily: "monospace",
                          opacity: 0.6,
                        }}
                      >
                        {advertisements.employer?.foundationYear}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 55,
                          paddingLeft: 750,
                        }}
                      >
                        Telefon Numarası
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: 55,
                          paddingLeft: 950,
                          fontFamily: "monospace",
                          opacity: 0.6,
                        }}
                      >
                        {advertisements.employer?.phoneNumber}
                      </div>
                      {/*  */}
                    </Grid.Row>
                  </Grid>
                </ShadowBoxWithHeader>
                <div style={{ paddingTop: 70 }}>
                  <Card style={{ paddingTop: 50 }} fluid>
                    <ShadowBoxWithHeader
                      margined={-80}
                      padding={40}
                      width={"170vh"}
                      unanimated
                      className="d-flex flex-column"
                    >
                      <div style={{ position: "absolute", paddingLeft: 650 }}>
                        <Link
                          as={Link}
                          to={`/advertisement/detail/${advertisements.id}`}
                        >
                          <Button
                            style={{
                              color: "black",
                              padding: "8px 10px",
                              fontFamily: "monospace",
                              opacity: 0.6,
                              backgroundColor: "white",
                              //borderBottomStyle: "inset",
                              //borderColor: "purple",
                            }}
                            //className="tutrte"
                          >
                            Hakkında
                          </Button>
                        </Link>
                        <Link
                          as={Link}
                          to={`/advertisement/details/${advertisements.id}`}
                        >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            padding: "8px 5px",
                            fontFamily: "monospace",

                            opacity: 0.6,
                          }}
                        >
                          İş ilanı
                        </Button>
                        </Link>
                      </div>
                    </ShadowBoxWithHeader>
                  </Card>
                </div>
              </Card>
            </ShadowBoxWithHeader>
          </div>
        </div>
      </div>
    </div>
  );
}

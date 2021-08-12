import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Card,
  Image,
  Table,
  Header,
  Button,
  Icon,
  Popup,
  Grid,
  Rating,
} from "semantic-ui-react";
import Categories from "../../layouts/Categories";
import CvService from "../../services/cvService";
import UpdateBiography from "../CvUpdate/UpdateBiography";
import UpdateGithub from "../CvUpdate/UpdateGithub";
import UpdateLinkedin from "../CvUpdate/UpdateLinkedin";
import UpdateSchools from "../CvUpdate/UpdateSchools";
import GradientBox from "../../layouts/GradientBox";
import {
  FaGithub,
  FaLinkedin,
  FaPlusCircle,
  FaTrophy,
  FaUserEdit,
  FaUserGraduate,
  FaUserTie,
  FaEdit,
} from "react-icons/fa";
import CvNavItem from "../../layouts/CvNavItem";
import { Avatar } from "@material-ui/core";
import { MdLanguage } from "react-icons/md";
import ShadowBoxWithHeader from "../../layouts/ShadowBoxWithHeader";
import SchoolItem from "../../layouts/SchoolItem";
import JobExpItem from "../../layouts/JobExpItem";
import TalentItem from "../../layouts/TalentItem";
import * as Yup from "yup";
import { Formik } from "formik";

export default function CvDetail() {
  const { authItem } = useSelector((state) => state.auth);
  let { id } = useParams();

  let cvService = new CvService();
  const [cv, setCv] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getBySeekerId(id).then((result) => setCv(result.data.data));
  }, [id]);

  const updateCvValues = () => {
    cvService.getBySeekerId(id).then((result) => {
      setCv(result.data.data);
    });
  };

  return (
    <div>
      {authItem[0].loggedIn === false && (
        <div style={{ paddingTop: 30 }}>
          <div style={{ paddingTop: 40 }} className="ui negative message">
            <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
            <p>
              Giriş yapmayı yada bir iş veren hesabı oluşturmayı
              deneyebilirsiniz
            </p>
            <div style={{ paddingTop: 30 }}> </div>
          </div>
        </div>
      )}

      {authItem[0].loggedIn && (
        <Grid>
          <Grid.Column width={3}>
            <div className="d-flex">
              <div
                className="col-2 bg-white min-vh-100"
                style={{ paddingTop: 60, paddingLeft: 20, paddingRight: 90 }}
              >
                <div className="d-flex flex-column">
                  <span
                    className="navlinkcolor"
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      paddingRight: 45,
                    }}
                  >
                    Eklediğim Alanlar
                  </span>

                  <div
                    style={{ fontSize: 17, paddingRight: 44, paddingTop: 10 }}
                  >
                    <CvNavItem
                      text={"Eğitim Bilgileri"}
                      icon={<FaUserGraduate />}
                    />
                  </div>

                  <div
                    style={{ fontSize: 17, paddingRight: 130, paddingTop: 10 }}
                  >
                    <CvNavItem text={"Dil"} icon={<MdLanguage />} />
                  </div>

                  <div
                    style={{ fontSize: 17, paddingRight: 69, paddingTop: 10 }}
                  >
                    <CvNavItem text={"Yetenekler"} icon={<FaTrophy />} />
                  </div>

                  <div
                    style={{ ffontSize: 17, paddingRight: 74, paddingTop: 10 }}
                  >
                    <CvNavItem text={"İş Deneyimi"} icon={<FaUserTie />} />
                  </div>

                  <div
                    style={{ fontSize: 17, paddingRight: 100, paddingTop: 10 }}
                  >
                    <CvNavItem text={"Önsöz"} icon={<FaUserEdit />} />
                  </div>
                </div>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column width={13}>
            <div className="cr7">
              <div className="col">
                <GradientBox>
                  <div
                    style={{
                      paddingTop: 40,
                      paddingRight: 1000,
                      backgroundColor: "#7f007f",
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: 180,
                        paddingRight: 290,
                        fontSize: 17,
                      }}
                    >
                      <h2>25.06.2021</h2>
                      <small>Son Güncelleme</small>
                    </div>
                  </div>
                </GradientBox>
                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-250}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                  >
                    <Card.Group>
                      <Card fluid>
                        <Card.Content>
                          <Grid divided="vertically">
                            <Grid.Row columns={1}>
                              <Grid.Column>
                                <div>
                                  <div>
                                    <Card.Header
                                      style={{
                                        fontFamily: "cursive",
                                        fontSize: 17,
                                        paddingRight: 1070,
                                      }}
                                    >
                                      <Card.Header>
                                        İletişim Bilgileri
                                      </Card.Header>
                                    </Card.Header>
                                  </div>
                                </div>
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                              <div>
                                <div style={{ paddingLeft: 25 }}>
                                  <div className="telk">
                                    <Image
                                      circular
                                      floated="left"
                                      size="small"
                                      src={cv.image?.imageUrl}
                                      key={cv.image?.id}
                                    />
                                  </div>
                                </div>
                              </div>
                              <Card.Header
                                style={{
                                  marginTop: "0.1em",
                                  fontSize: 20,
                                  fontFamily: "Courier",
                                  fontWeight: "bold",
                                  paddingLeft: 25,
                                }}
                                textAlign="left"
                              >
                                {cv.jobseeker?.firstName +
                                  " " +
                                  cv.jobseeker?.lastName}
                                <div
                                  style={{
                                    paddingTop: 10,
                                    fontWeight: "normal",
                                    fontSize: 15,
                                    font: "menu",
                                    fontSize: "13px",
                                  }}
                                >
                                  <Card.Header>E-posta Adresi</Card.Header>
                                  <div
                                    style={{
                                      fontSize: 16,
                                      font: "menu",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <Card.Description>
                                      {cv.jobseeker?.email}
                                    </Card.Description>
                                  </div>
                                  <div style={{ paddingTop: 10 }}>
                                    <Card.Header>Telefon Numarası</Card.Header>{" "}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 16,
                                      font: "menu",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <Card.Description>
                                      {cv.jobseeker?.phoneNumber}
                                    </Card.Description>
                                  </div>
                                </div>
                              </Card.Header>
                              <Card.Header
                                style={{
                                  marginTop: "0.1em",
                                  fontSize: 20,
                                  fontFamily: "Courier",
                                  fontWeight: "bold",
                                  paddingLeft: 25,
                                }}
                                textAlign="left"
                              >
                                <div
                                  style={{ paddingLeft: 280, paddingTop: 28 }}
                                >
                                  <div
                                    style={{
                                      fontWeight: "normal",
                                      fontSize: 15,
                                      font: "menu",
                                      fontSize: "13px",
                                    }}
                                  >
                                    <Card.Header>Doğum Tarihi</Card.Header>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 16,
                                      font: "menu",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <Card.Description>
                                      {cv.jobseeker?.birthDate}
                                    </Card.Description>
                                  </div>
                                  <div style={{ paddingTop: 10 }}>
                                    <Card.Description>
                                      <a
                                        href={cv.githubAdress}
                                        target={"_blank"}
                                        rel="noopener noreferrer"
                                      >
                                        <Icon
                                          size="large"
                                          name="github"
                                          color="black"
                                        />
                                      </a>

                                      <a
                                        href={cv.linkedinAdress}
                                        target={"_blank"}
                                        rel="noopener noreferrer"
                                      >
                                        <Icon
                                          size="large"
                                          name="linkedin"
                                          color="purple"
                                        />
                                      </a>
                                    </Card.Description>
                                  </div>
                                </div>
                              </Card.Header>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                    </Card.Group>
                  </ShadowBoxWithHeader>
                </div>

                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-20}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                    // headerText={"Önsöz"}
                    //button={"Güncelle"}
                    buttonState={true}
                    secondary
                  >
                    {/*  */}
                    <Card fluid>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row>
                            <div
                              style={{
                                fontFamily: "cursive",
                                fontSize: 17,
                                //paddingRight: 1135,
                                paddingLeft: 25,
                                paddingTop: 7,
                              }}
                            >
                              <span>Ön Söz</span>
                            </div>
                            <div style={{ paddingLeft: 1032, paddingTop: 3 }}>
                              <Popup
                                onClose
                                trigger={
                                  <Button
                                    icon="edit"
                                    content="Düzenle"
                                    color="google plus"
                                  />
                                }
                                modal
                              >
                                <UpdateBiography
                                  cvId={cv.id}
                                  updateCvValues={updateCvValues}
                                  currentCoverLatter={cv.coverLatter}
                                />
                              </Popup>
                            </div>
                          </Grid.Row>

                          <Grid.Row>
                            <div
                              style={{
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 300,
                              }}
                            >
                              {/* <textarea  style={{paddingRight:1050,paddingBottom:400}} value={cv.coverLatter} ></textarea> */}
                              <div style={{ fontWeight: "bold", fontSize: 16 }}>
                                <Card.Content>{cv.coverLatter}</Card.Content>
                              </div>
                            </div>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </ShadowBoxWithHeader>
                </div>

                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-20}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                  >
                    <Card fluid>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row>
                            <div
                              style={{
                                fontFamily: "cursive",
                                fontSize: 17,
                                paddingLeft: 25,
                                paddingTop: 7,
                              }}
                            >
                              <span>Eğitim</span>
                            </div>
                            {/* <div style={{ paddingLeft: 1040, paddingTop: 3 }}>
                              <Button
                                icon="edit"
                                content="Düzenle"
                                color="google plus"
                              />
                            </div> */}
                          </Grid.Row>
                          {/* <Popup onClose trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateSchools cvId={cv.id} updateCvValues={updateCvValues}/>
                          </Popup> */}

                          <Grid.Row>
                            <SchoolItem />
                            <Card.Header
                              style={{
                                marginTop: "0.1em",
                                fontSize: 20,
                                fontFamily: "Courier",
                                fontWeight: "bold",
                                paddingLeft: 25,
                              }}
                              textAlign="left"
                            >
                              <div
                                style={{
                                  paddingTop: 35,
                                  paddingLeft: 70,
                                  fontWeight: "normal",
                                  fontSize: 15,
                                  font: "menu",
                                  fontSize: "13px",
                                }}
                              >
                                <Card.Content>Okul Adı</Card.Content>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Description>
                                    {cv.school?.schoolName}
                                  </Card.Description>
                                </div>
                                <div
                                  style={{ paddingTop: 15, paddingRight: 10 }}
                                >
                                  <Card.Header>Departman</Card.Header>{" "}
                                </div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Description>
                                    {cv.school?.departmentName}
                                  </Card.Description>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Header
                              style={{
                                marginTop: "0.1em",
                                fontSize: 20,
                                fontFamily: "Courier",
                                fontWeight: "bold",
                                paddingLeft: 25,
                              }}
                              textAlign="left"
                            >
                              <div
                                style={{
                                  paddingTop: 30,
                                  paddingLeft: 280,
                                  fontWeight: "normal",
                                  fontSize: 15,
                                  font: "menu",
                                  fontSize: "13px",
                                }}
                              >
                                <Card.Header>Başlangıç Tarihi</Card.Header>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Content>
                                    {cv.school?.startYear}
                                  </Card.Content>
                                </div>
                                <div style={{ paddingTop: 15 }}>
                                  <Card.Header>Mezuniyet Durumu</Card.Header>
                                </div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Content>
                                    {cv.school?.graduationYear ? (
                                      cv.school?.graduationYear
                                    ) : (
                                      <p>Devam Ediyor</p>
                                    )}
                                  </Card.Content>
                                </div>
                              </div>
                            </Card.Header>
                            <div style={{ paddingLeft: 70, paddingTop: 30 }}>
                              <button
                                style={{ border: "none", background: "none" }}
                                onClick
                              >
                                <FaEdit
                                  size={30}
                                  color={"#840eb6"}
                                  style={{ cursor: "pointer" }}
                                />
                              </button>
                            </div>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </ShadowBoxWithHeader>
                </div>

                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-20}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                    // headerText={"Önsöz"}
                    //button={"Güncelle"}
                    buttonState={true}
                    secondary
                  >
                    <Card fluid>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row>
                            <div
                              style={{
                                fontFamily: "cursive",
                                fontSize: 17,
                                paddingLeft: 25,
                                paddingTop: 7,
                              }}
                            >
                              <span>İş Deneyimi</span>
                            </div>
                            {/* <div style={{ paddingLeft: 995, paddingTop: 3 }}>
                              <Button
                                icon="edit"
                                content="Düzenle"
                                color="google plus"
                              />
                            </div> */}
                          </Grid.Row>
                          <Grid.Row>
                            <JobExpItem />
                            <Card.Header
                              style={{
                                fontSize: 20,
                                fontFamily: "Courier",
                                fontWeight: "bold",
                                paddingLeft: 25,
                              }}
                              textAlign="left"
                            >
                              <div
                                style={{
                                  paddingTop: 20,
                                  paddingLeft: 70,
                                  fontWeight: "normal",
                                  fontSize: 15,
                                  font: "menu",
                                  fontSize: "13px",
                                }}
                              >
                                <Card.Content>İş Yeri Adı</Card.Content>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Description>
                                    {cv.jobExperience?.workPlaceName}
                                  </Card.Description>
                                </div>
                                <div
                                  style={{ paddingTop: 15, paddingRight: 10 }}
                                >
                                  <Card.Header>Departman</Card.Header>{" "}
                                </div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Description>
                                    {cv.jobExperience?.position}
                                  </Card.Description>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Header
                              style={{
                                marginTop: "0.1em",
                                fontSize: 20,
                                fontFamily: "Courier",
                                fontWeight: "bold",
                                paddingLeft: 25,
                              }}
                              textAlign="left"
                            >
                              <div
                                style={{
                                  paddingTop: 20,
                                  paddingLeft: 292,
                                  fontWeight: "normal",
                                  fontSize: 15,
                                  font: "menu",
                                  fontSize: "13px",
                                }}
                              >
                                <Card.Header>Başlangıç Tarihi</Card.Header>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Content>
                                    {cv.jobExperience?.startYear}
                                  </Card.Content>
                                </div>
                                <div style={{ paddingTop: 15 }}>
                                  <Card.Header>İş Durumu</Card.Header>
                                </div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    font: "menu",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <Card.Content>
                                    {cv.jobExperience?.leavingWorkYear ? (
                                      cv.jobExperience?.leavingWorkYear
                                    ) : (
                                      <p>Devam Ediyor</p>
                                    )}
                                  </Card.Content>
                                </div>
                              </div>
                            </Card.Header>
                            <div
                              className="d-flex flex-column"
                              style={{ paddingLeft: 91, paddingTop: 30 }}
                            >
                              <button
                                style={{ border: "none", background: "none" }}
                                onClick
                              >
                                <FaEdit
                                  size={30}
                                  style={{
                                    color: "#666666",
                                    cursor: "pointer",
                                  }}
                                />
                              </button>
                            </div>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </ShadowBoxWithHeader>
                </div>

                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-20}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                    // headerText={"Önsöz"}
                    //button={"Güncelle"}
                    buttonState={true}
                    secondary
                  >
                    <Card fluid>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row>
                            <div
                              style={{
                                fontFamily: "cursive",
                                fontSize: 17,
                                paddingLeft: 25,
                                paddingTop: 7,
                              }}
                            >
                              <span>Yetenek</span>
                            </div>
                            <div style={{ paddingLeft: 1025, paddingTop: 3 }}>
                              <Button
                                icon="edit"
                                content="Düzenle"
                                color="google plus"
                              />
                            </div>
                          </Grid.Row>
                          <Grid.Row>
                            {/* <TalentItem/> */}
                            <div style={{ paddingLeft: 40 }}>
                              <button
                                style={{ width: "100%", marginRight: 100,backgroundColor:"#3abc3a",color:"white",borderRadius: "14px",border: "2px teal",padding: "10px 15px" }}
                                
                              >
                                {cv.programLanguage?.programLanguage}
                              </button>
                            </div>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </ShadowBoxWithHeader>
                </div>

                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <ShadowBoxWithHeader
                    margined={-20}
                    padding={30}
                    width={"140vh"}
                    unanimated
                    className="d-flex flex-column"
                    // headerText={"Önsöz"}
                    //button={"Güncelle"}
                    buttonState={true}
                    secondary
                  >
                    <Card fluid>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row>
                            <div
                              style={{
                                fontFamily: "cursive",
                                fontSize: 17,
                                paddingLeft: 25,
                                paddingTop: 7,
                              }}
                            >
                              <span>Yabancı Dil</span>
                            </div>
                            <div style={{ paddingLeft: 1000, paddingTop: 3 }}>
                              <Button
                                icon="edit"
                                content="Düzenle"
                                color="google plus"
                              />
                            </div>
                          </Grid.Row>
                          <Grid.Row>
                            <div
                              style={{
                                paddingTop: 25,
                                paddingLeft: 50,
                                fontSize: 18,
                                color: "#ff7f00",
                                fontWeight: "bold",
                              }}
                            >
                              <Card.Content>Dil</Card.Content>
                            </div>
                            <div
                              style={{
                                paddingTop: 25,
                                paddingLeft: 40,
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              <Card.Content>
                                {cv.language?.languageName}
                              </Card.Content>
                            </div>
                            <div style={{ paddingLeft: 900, paddingTop: 25 }}>
                              <Card.Content>Seviye</Card.Content>
                            </div>
                            <div style={{ paddingTop: 25, paddingLeft: 15 }}>
                              <Rating
                                icon="star"
                                size="huge"
                                disabled
                                rating={cv.language?.languageLevel}
                                maxRating={5}
                              />
                            </div>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </ShadowBoxWithHeader>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

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
      <div style={{ paddingLeft: 190, paddingRight: 290, paddingTop: 50 }}>
        <Card fluid color={"black"} style={{ borderRadius: "25px" }}>
          <Card.Content
            style={{ paddingBottom: 20, paddingTop: 20, paddingRight: 1250 }}
            header="Firma Açıklaması"
          />
          <Card.Content style={{ paddingBottom: 25, paddingTop: 20 }}>
            {advertisements.employer?.explanation}
          </Card.Content>
        </Card>
      </div>

      <div style={{ paddingLeft: 200 }}>
        <Card.Group style={{ paddingTop: 50 }} itemsPerRow={2}>
          <Card style={{ borderRadius: "25px" }}>
            <Card.Content
              style={{
                paddingRight: 150,
                paddingTop: 30,
                fontWeight: "bold",
                fontFamily: "Helvatica",
              }}
            >
              {/* <ShadowBoxWithHeader
                margined={0}
                padding={30}
                width={"75vh"}
                unanimated
                className="d-flex flex-column"
              >
                <Card.Content style={{ paddingRight: 480, paddingBottom: 40 }}>
                  <Grid>
                    <Grid.Row>
                      <Image
                        size="medium"
                        src={advertisements.employer?.image.imageUrl}
                      />
                      <Card.Content style={{ paddingLeft: 50 }}>
                        se
                      </Card.Content>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </ShadowBoxWithHeader> */}
              <Card.Content style={{ paddingLeft: 25 }}>
                Şehir: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingLeft: 55,
                  }}
                >
                  {advertisements.city?.name}
                </span>
              </Card.Content>
              <Card.Content style={{ paddingTop: 35, paddingLeft: 78 }}>
                İş Pozisyonu: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingLeft: 25,
                  }}
                >
                  {advertisements.position?.name}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 20 }}>
                Minimum Ücret: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingRight: 12,
                  }}
                >
                  {advertisements.minSalary}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 30 }}>
                Maximum Ücret: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingRight: 25,
                  }}
                >
                  {advertisements.maxSalary}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingRight: 18 }}>
                Pozisyon Adedi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                  }}
                >
                  {advertisements.openPosition}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 72 }}>
                Çalışma Zamanı: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingRight: 20,
                  }}
                >
                  {advertisements.workTime?.workTime}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 75 }}>
                Çalışma Tipi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                  }}
                >
                  {advertisements.workType?.workType}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 65 }}>
                Yayın Tarihi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingRight: 25,
                  }}
                >
                  {advertisements.releaseDate}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 35, paddingLeft: 78 }}>
                Son başvuru tarihi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    paddingRight: 36,
                  }}
                >
                  {advertisements.applicationDeadline}
                </span>
              </Card.Content>

              <Card.Content style={{ paddingTop: 40, paddingLeft: 480 }}>
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
            </Card.Content>
          </Card>

          <Card.Group
            style={{ paddingLeft: 100, paddingTop: 10, paddingBottom: 100 }}
            itemsPerRow={1}
          >
            <Card style={{ borderRadius: "25px" }} fluid>
              <div
                style={{ paddingLeft: 150, paddingTop: 25, paddingBottom: 20 }}
              >
                <Image
                  floated="left"
                  size="small"
                  src={advertisements.employer?.image.imageUrl}
                />
              </div>
              
              <Card.Content
                style={{
                  fontWeight: "bold",
                  fontFamily: "Helvatica",
                  paddingTop: 30,
                  paddingRight: 60
                }}
              >
                Firma Adı: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;{" "}
                <span style={{ fontWeight: "normal", fontFamily: "Arial" }}>
                  {advertisements.employer?.companyName}
                </span>
                <Card.Content style={{ paddingTop: 30, paddingLeft: 85 }}>
                  Email: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp;{" "}
                  <span
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Arial",
                      paddingLeft: 25,
                    }}
                  >
                    {advertisements.employer?.email}
                  </span>
                </Card.Content>
                <Card.Content style={{ paddingTop: 30, paddingLeft: 15 }}>
                  Telefon: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;{" "}
                  <span
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Arial",
                      paddingLeft: 18,
                    }}
                  >
                    {advertisements.employer?.phoneNumber}
                  </span>
                </Card.Content>
                <Card.Content style={{ paddingTop: 30, paddingLeft: 30 }}>
                  Web Sitesi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;{" "}
                  <a
                    href={advertisements.employer?.webSite}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Button size="mini" animated color="twitter">
                      <Button.Content visible>
                        <Icon name="world" color="olive" />
                        Web Site
                      </Button.Content>
                      <Button.Content hidden>
                        <Icon name="angle double right" />
                      </Button.Content>
                    </Button>
                  </a>
                </Card.Content>
                <Card.Content style={{ paddingTop: 30, paddingLeft: 47 }}>
                  Detay: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <Button
                    size="mini"
                    animated
                    as={Link}
                    to={`/employers/${advertisements.employer?.id}`}
                  >
                    <Button.Content visible>Şirket Detayları</Button.Content>
                    <Button.Content hidden>
                      <Icon name="angle double right" />
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card.Content>
            </Card>
          </Card.Group>
        </Card.Group>
      </div>
      <div style={{ paddingLeft: 190, paddingTop: 1 }}>
        <Card.Group style={{ paddingTop: 50 }} itemsPerRow={2}>
          <Card fluid color={"black"} style={{ borderRadius: "25px" }}>
            <Card.Content
              style={{ paddingBottom: 20, paddingTop: 20, paddingRight: 650 }}
              header="İlan Açıklaması"
            />
            <Card.Content style={{ paddingBottom: 20, paddingTop: 25 }}>
              {advertisements.jobDescription}
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </div>
  );
}

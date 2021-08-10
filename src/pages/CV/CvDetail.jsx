import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  NavLink } from 'react-router-dom';
import { Card, Image, Table, Header, Button, Icon, Popup } from "semantic-ui-react";
import CvService from "../../services/cvService";
import UpdateBiography from "../CvUpdate/UpdateBiography";
import UpdateGithub from "../CvUpdate/UpdateGithub";
import UpdateLinkedin from "../CvUpdate/UpdateLinkedin";
import UpdateSchools from "../CvUpdate/UpdateSchools";

export default function CvDetail() {
  let { id } = useParams();

  let cvService = new CvService()
  const [cv, setCv] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getBySeekerId(id).then((result) => setCv(result.data.data));
  }, [id]);


  const updateCvValues = () => {
    cvService.getBySeekerId(id).then((result) => {
      setCv(result.data.data)
    })
  }

  return (
    <div>
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
            <Image
              floated="left"
              size="small"
              src={cv.image?.imageUrl}
              circular
              key={cv.image?.id}
            />
            
             <Popup onClose trigger={<Button  icon="edit" content="Düzenle" color="teal" style={{marginLeft:"55em"}} />} modal>
                            <UpdateBiography  cvId={cv.id} updateCvValues={updateCvValues} currentCoverLatter={cv.coverLatter}/>
                          </Popup>
            <Card.Header style={{ marginTop: "0.1em" }} textAlign="left">
              {cv.jobseeker?.firstName + " " + cv.jobseeker?.lastName}
            </Card.Header>

            <Card.Meta textAlign="left" style={{ marginTop: "0.6em" }}>
              <strong>{cv.coverLatter}</strong>
                          
            </Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
      <Table celled textAlign="center" color={"green"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Ad</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{cv.jobseeker?.firstName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Soyad</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{cv.jobseeker?.lastName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Doğum Tarihi</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{cv.jobseeker?.birthDate}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Email</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{cv.jobseeker?.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>GitHub</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <a
                href={cv.githubAdress}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <Button secondary color="vk">
                  <Icon name="github" color="teal" />
                  GitHub
                </Button>
              </a>
              <Popup onClose trigger={<Button icon="edit" content="Düzenle" color="teal" /> } modal>
                            <UpdateGithub cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Linkedin</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <a
                href={cv.linkedinAdress}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <Button color="linkedin">
                  <Icon name="linkedin" color="teal" />
                  Linkedin
                </Button>
              </a>
              <Popup onClose trigger={<Button icon="edit" content="Düzenle" color="teal" /> } modal>
                            <UpdateLinkedin cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Card fluid color={"olive"}>
        <Card.Content>
          <Card.Header textAlign="center">Okuduğu Okullar
          {/* <Popup onClose trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateSchools cvId={cv.id} updateCvValues={updateCvValues}/>
                          </Popup> */}
                          </Card.Header>
        </Card.Content>
        <Table celled color={"olive"} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={cv.school?.id}>
              <Table.Cell>{cv.school?.schoolName}</Table.Cell>
              <Table.Cell>{cv.school?.departmentName}</Table.Cell>
              <Table.Cell>{cv.school?.startYear}</Table.Cell>
              <Table.Cell>
                {cv.school?.graduationYear ? (
                  cv.school?.graduationYear
                ) : (
                  <p>Devam Ediyor</p>
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
      
      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>İş Tecrübeleri</Card.Header>
        </Card.Content>
        <Table celled color={"black"} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Firma Adı</Table.HeaderCell>
              <Table.HeaderCell>Pozisyonu</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={cv.jobExperience?.id}>
              <Table.Cell>{cv.jobExperience?.workPlaceName}</Table.Cell>
              <Table.Cell>{cv.jobExperience?.position}</Table.Cell>
              <Table.Cell>{cv.jobExperience?.startYear}</Table.Cell>
              <Table.Cell>
                {cv.jobExperience?.leavingWorkYear ? 
                  cv.jobExperience?.leavingWorkYear
                 : 
                  <p>Devam Ediyor</p>
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>Programlama Dilleri</Card.Header>
        </Card.Content>
        <Table celled color={"red"} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={cv.programLanguage?.id}>
              <Table.Cell>{cv.programLanguage?.programLanguage}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}

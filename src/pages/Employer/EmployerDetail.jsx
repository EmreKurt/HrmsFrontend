import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdvertisementService from "../../services/advertisementService";
import EmployerService from "../../services/employerService";
import { Header, Table, Icon, Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import JobSeekerService from "../../services/jobSeekerService";
import { useSelector } from "react-redux";

export default function EmployerDetail() {
  let { id } = useParams();

  const [employer, setEmployer] = useState({});
  const [advertisement, setAdvertisement] = useState([]);



  useEffect(() => {
    let employerService = new EmployerService();
    let advertisementService = new AdvertisementService();
    employerService
      .getEmployerById(id)
      .then((result) => setEmployer(result.data.data));
    advertisementService
      .getActiveAdsByCompanyId(id)
      .then((result) => setAdvertisement(result.data.data));
  }, [id]);

  return (
    <div>
      <Table celled color={"black"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş veren</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="building" />
                  Şirket Adı
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer?.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="world" />
                  Web Sitesi
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <a
                href={employer?.webSite}
                target={"_blank"}
                rel="noopener noreferrer"
              >
              <Button animated color="twitter">
                <Button.Content visible>
                  <Icon name="world" color="olive" />
                  Web Site
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="angle double right" />
                </Button.Content>
              </Button></a>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer?.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Telefon
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer?.phoneNumber}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Card fluid color={"black"}>
        <Card.Content header="Bu Şirkete Ait İş İlanları" />
        <Card.Content>
          <Table textAlign="center" color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {advertisement.map((advertisements) => (
                <Table.Row key={advertisements.id}>
                  <Table.Cell>{advertisements.position?.name}</Table.Cell>
                  <Table.Cell>{advertisements.city?.name}</Table.Cell>
                  <Table.Cell>{advertisements.openPosition}</Table.Cell>
                  <Table.Cell>{advertisements.workType?.workType}</Table.Cell>
                  <Table.Cell>{advertisements.workTime?.workTime}</Table.Cell>
                  <Table.Cell>
                    <Button
                      animated
                      as={Link}
                      to={`/advertisements/${advertisements.id}`}
                    >
                      <Button.Content visible>İlanı Gör</Button.Content>
                      <Button.Content hidden>
                        <Icon name="angle double right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
        
      </Card>
      <Card.Content extra>
          <Icon name="list" />
          {advertisement?.length} Adet İş ilanı mevcut
        </Card.Content>
    </div>
  );
}

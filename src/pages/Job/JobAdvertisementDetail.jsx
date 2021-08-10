import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Header, Icon, Table } from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function JobAdvertisementDetail() {
  let { id } = useParams();
  const [advertisements, setAdvertisement] = useState([]);
  const colors = ["red"];

  useEffect(() => {
    let advertisementService = new AdvertisementService();
    advertisementService
      .getByJobAdId(id)
      .then((result) => setAdvertisement(result.data.data));
  }, [id]);
  return (
    <div>
      <Card fluid color={"black"} style={{ borderRadius: "25px" }}>
        <Card.Content header="Açıklama" />
        <Card.Content>{advertisements.jobDescription}</Card.Content>
      </Card>
      <Grid>
        <Grid.Column width={5}>
          <Table celled color={"black"} stackable textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>İş veren</Table.HeaderCell>
                <Table.HeaderCell>Bilgiler</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row textAlign={"left"}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      <Icon name="building" />
                      Şirket Adı
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{advertisements.employer?.companyName}</Table.Cell>
              </Table.Row>

              <Table.Row textAlign={"left"}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      <Icon name="mail" />
                      Email
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{advertisements.employer?.email}</Table.Cell>
              </Table.Row>

              <Table.Row textAlign={"left"}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      <Icon name="phone" />
                      Telefon
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{advertisements.employer?.phoneNumber}</Table.Cell>
              </Table.Row>

              <Table.Row textAlign={"left"}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      <Icon name="world" />
                      Web Sitesi
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={advertisements.employer?.webSite}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Button animated color="twitter">
                      
                      <Button.Content visible><Icon name="world" color="olive" />Web Site</Button.Content>
                      <Button.Content hidden>
                        <Icon name="angle double right" />
                      </Button.Content>
                    </Button>
                  </a>
                </Table.Cell>
              </Table.Row>

              <Table.Row textAlign="left">
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      <Icon name="list ul" />
                      Detay
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    animated
                    as={Link}
                    to={`/employers/${advertisements.employer?.id}`}
                  >
                    <Button.Content visible>Detaylara Git</Button.Content>
                    <Button.Content hidden>
                      <Icon name="angle double right" />
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={11}>
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
                    <Header.Content>Şehir</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.city?.name}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>İş Pozisyon</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.position?.name}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Minimum Ücret</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.minSalary} TL
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Maximum Ücret</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.maxSalary} TL
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Poziyon Adedi</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.openPosition}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Çalışma Zamanı</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.workTime?.workTime}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Çalışma Yeri</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.workType?.workType}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Yayın Tarihi</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.releaseDate}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Son başvuru tarihi</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {advertisements.applicationDeadline}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}

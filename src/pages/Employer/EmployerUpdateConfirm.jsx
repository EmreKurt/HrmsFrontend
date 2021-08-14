import React, { useEffect, useState } from "react";
import EmployerService from "../../services/employerService";
import swal from "sweetalert";
import {
  Table,
  Segment,
  Container,
  Icon,
  Card,
  Button,
} from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function EmployerUpdateConfirm() {
  const { authItem } = useSelector((state) => state.auth);
  const [employers, setEmployers] = useState([]);
  let employerService = new EmployerService();

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getByVerifyedFalse()
      .then((result) => setEmployers(result.data.data));
  }, []);

  const confirmStatusTrue = (employerUpdateId, staffId) => {
    employerService.verifyUpdate(employerUpdateId, staffId).then(
      swal({
        title: "Başarılı!",
        text: "Şirket bilgileri onaylandı!",
        icon: "success",
        button: "OK",
      }).then(function () {
        window.location.reload();
      })
    );
  };
  return (
    <div>
        {authItem[0].user.userType !== 3 && (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <div style={{paddingTop:15,paddingBottom:10}}><p>
            Bu sayfa sadece sistem personelleri tarafından görüntülenebilir!
          </p></div>
        </div>
      )}
      {authItem[0].loggedIn && authItem[0].user.userType === 3 && (
        <Segment style={{ padding: "12em 0em" }} vertical>
          <Container>
            <Card fluid color="orange">
              <Card.Header
                as="h2"
                textAlign="center"
                style={{
                  fontSize: "2em",
                  marginBottom: "1em",
                  marginTop: "1em",
                }}
              >
                <Icon name="edit outline" color="orange" />
                Onay Bekleyen Şirketler
              </Card.Header>
              <Card.Content>
                <Table color="orange">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                      <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                      <Table.HeaderCell>Web Adresi</Table.HeaderCell>
                      <Table.HeaderCell>Mail Adresi</Table.HeaderCell>
                      <Table.HeaderCell>Değiştirilme Tarihi</Table.HeaderCell>
                      <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                      <Table.HeaderCell>Onay İşlemi</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {employers.map((employer) => (
                      <Table.Row key={employer.id}>
                        <Table.Cell>{employer.companyName}</Table.Cell>
                        <Table.Cell>{employer.phoneNumber} </Table.Cell>
                        <Table.Cell>{employer.webSite}</Table.Cell>
                        <Table.Cell>{employer.email}</Table.Cell>
                        <Table.Cell>{employer.createDay}</Table.Cell>
                        <Table.Cell>
                          {employer.waitingUpdate === false
                            ? "Onaylandı"
                            : "Onaylanmadı"}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            animated
                            basic
                            color="green"
                            onClick={(e) => confirmStatusTrue(employer.id, 1)}
                          >
                            <Button.Content visible>Onayla</Button.Content>
                            <Button.Content hidden>
                              <Icon name="check" />
                            </Button.Content>
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card.Content>
            </Card>
          </Container>
        </Segment>
      )}
    </div>
  );
}

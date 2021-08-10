import React, { useState, useEffect } from "react";
import { Container, Icon, Segment } from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import { Table, Card, Button, Divider } from "semantic-ui-react";
import swal from "sweetalert";
import { useSelector } from "react-redux";

export default function ConfirmJobAdvertisement() {
  const { authItem } = useSelector((state) => state.auth);
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  let jobAdvertisementService = new AdvertisementService();

  useEffect(() => {
    let jobAdvertisementService = new AdvertisementService();
    jobAdvertisementService
      .getAllPassiveJob()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  const active = (id) => {
    jobAdvertisementService.activate(id, true).then(
      swal({
        title: "Başarılı!",
        text: "İş ilanı onaylandı!",
        icon: "success",
        button: "OK",
      }).then(function () {
        window.location.reload();
      })
    );
  };

  const deleteJob = (id) => {
    swal({
      title: "Emin Misiniz?",
      text: "Bir kez silindiğinde, bu iş ilanını geri alamazsınız!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        jobAdvertisementService.delete(id).then(
          swal("İş ilanı silindi.", { icon: "success" }).then(function () {
            window.location.reload();
          })
        );
      } else {
        swal("İptal edildi!");
      }
    });
  };
  return (
    <div>
      {authItem[0].user.userType !== 3 && (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <p>
            Bu sayfa sadece sistem personelleri tarafından görüntülenebilir!
          </p>
        </div>
      )}
      {authItem[0].loggedIn && authItem[0].user.userType === 3 && (
        <Segment style={{ padding: "12em 0em" }} vertical>
          <Container>
            <Card fluid color="orange">
              {" "}
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
                Onay Bekleyen İlanlar
              </Card.Header>
              <Card.Content>
                <Table color="orange">
                  <Table.Header>
                    <Table.Row textAlign="center">
                      <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                      <Table.HeaderCell>Şehir</Table.HeaderCell>
                      <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                      <Table.HeaderCell>Alınacak Kişi Sayısı</Table.HeaderCell>
                      <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                      <Table.HeaderCell>Maaş Aralığı</Table.HeaderCell>
                      <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                      <Table.HeaderCell>Onay İşlemi</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {jobAdvertisements.map((jobAdvertisement) => (
                      <Table.Row key={jobAdvertisement.id} textAlign="center">
                        <Table.Cell>
                          {jobAdvertisement.employer.companyName}
                        </Table.Cell>
                        <Table.Cell>{jobAdvertisement.city.name} </Table.Cell>
                        <Table.Cell>
                          {jobAdvertisement.position.name}
                        </Table.Cell>
                        <Table.Cell>{jobAdvertisement.openPosition}</Table.Cell>
                        <Table.Cell>
                          {jobAdvertisement.applicationDeadline}
                        </Table.Cell>
                        <Table.Cell>
                          {jobAdvertisement.minSalary}-
                          {jobAdvertisement.maxSalary}
                        </Table.Cell>
                        <Table.Cell>
                          {jobAdvertisement.isActive === true
                            ? "Onaylandı"
                            : "Onaylanmadı"}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            animated
                            basic
                            color="green"
                            onClick={(e) => active(jobAdvertisement.id)}
                          >
                            <Button.Content visible>Onayla</Button.Content>
                            <Button.Content hidden>
                              <Icon name="check" />
                            </Button.Content>
                          </Button>
                          <Divider />
                          <Button
                            animated
                            basic
                            color="orange"
                            onClick={(e) => deleteJob(jobAdvertisement.id)}
                          >
                            <Button.Content visible>İlanı Sil</Button.Content>
                            <Button.Content hidden>
                              <Icon name="trash alternate" />
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

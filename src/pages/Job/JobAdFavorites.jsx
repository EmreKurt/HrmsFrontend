import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Grid, Icon, Button } from "semantic-ui-react";
import FavoritesService from "../../services/favoritesService";
import swal from "sweetalert";

export default function JobAdFavorites() {
  const { authItem } = useSelector((state) => state.auth);

  const [favorites, setFavorites] = useState([]);

  let favoritesService = new FavoritesService();
  useEffect(() => {
    let favoritesService = new FavoritesService();
    favoritesService.getBySeekerId(authItem[0].user.id).then((result) => {
      setFavorites(result.data.data);
    });
  }, [authItem]);

  const handleRemoveFavorite = (favoriteId) => {
    favoritesService
      .removeFavorite(favoriteId)
      .then((result) => {
        setFavorites(
          favorites.filter((favoriAd) => favoriAd.id !== favoriteId)
        );
        if (result.data.success === true) {
          swal({
            title: "Başarılı!",
            text: result.data.message,
            icon: "success",
            button: "Ok",
          });
        }
        //toast.info(result.data.message);
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };
  return (
    <div>
      <Grid>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
      {favorites?.length === 0 && authItem[0].loggedIn === true && (
        <div className="ui negative message">
          <p></p>
          <div className="header">Favorilerinizde ilan bulunamadı...</div>
          <p></p>
          <p>
            <Link className="erak" to="/advertisements">
              {" "}
              Şimdi ilanları görüntüle
            </Link>
            'ye tıklayarak iş ilanlarını inceleyebilirsiniz.
          </p>
        </div>
      )}

      {authItem[0].loggedIn === false && (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <p>Bu sayfayı görüntülemek için lütfen giriş yapınız</p>
        </div>
      )}

      {favorites?.map((favorite) => (
        <Card fluid color={"black"} style={{ borderRadius: "25px" }}>
          <Card.Content>
            <Grid>
              <Grid.Row></Grid.Row>
            </Grid>
            <div className="ac">
              <Card.Header textAlign="center" key={favorite.id}>
                {favorite.advertisement.employer.companyName}
              </Card.Header>
            </div>
            <h5>
              <div className="teat">
                <Card.Description textAlign="right">
                  <Button
                    icon="trash alternate"
                    color={"red"}
                    circular
                    onClick={() => handleRemoveFavorite(favorite.id)}
                  />

                </Card.Description>
              </div>
              Maaş :
              <span>
                {" "}
                {favorite.advertisement.minSalary} -{" "}
                {favorite.advertisement.maxSalary}₺
              </span>
            </h5>

            <h5>
              Başvuru : Son{" "}
              <span>
                {(
                  (new Date(
                    favorite.advertisement.applicationDeadline
                  ).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                gün
              </span>
            </h5>

            <h5>
              Çalışma Şekli :
              <span>{favorite.advertisement.workType.workType}</span>
            </h5>

            <h5>
              <Icon name="map marker alternate" />{" "}
              <span>{favorite.advertisement.city.name}</span>
            </h5>

            <Link as={Link} to={`/advertisements/${favorite.advertisement.id}`}>
              <Button animated color="vk" floated="right">
                <Button.Content visible>
                  <Icon name="list ul" />
                  Detayları gör
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="angle double right" />
                </Button.Content>
              </Button>
            </Link>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

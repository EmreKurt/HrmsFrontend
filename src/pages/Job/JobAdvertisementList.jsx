import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Icon,
  Image,
  Pagination,
  Table,
} from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import FavoritesService from "../../services/favoritesService";
import { Link, useParams } from "react-router-dom";
import { addToFavorite } from "../../store/actions/cartActions";
import { toast } from "react-toastify";
import JobAdFilter from "./JobAdFilter";
import { result } from "lodash";

export default function JobAdvertisementList() {
  const dispatch = useDispatch();
  let [activePage, setActivePage] = useState(1);
  let [filterOption, setFilterOption] = useState({});
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  const [advertisements, setAdvertisement] = useState([]);
  let [favorites, setFavorites] = useState([]);

  const colors = ["red"];

  const { authItem } = useSelector((state) => state.auth);

  useEffect(() => {
    let advertisementService = new AdvertisementService();
    let favoriteService = new FavoritesService();
    advertisementService
      .getPageableAndFilterJobPostings(activePage, pageSize, filterOption)
      .then((result) => {
        setAdvertisement(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });
    if (authItem[0].loggedIn === true && authItem[0].user.userType === 1) {
      favoriteService.getBySeekerId(authItem[0].user.id).then((result) => {
        setFavorites(
          result.data.data.map((favoriteAd) => favoriteAd.advertisement.id)
        );
      });
    }
  }, [filterOption, activePage, pageSize, authItem]);

  let favoriteService = new FavoritesService();
  const handleAddToFavorite = (advertisementId) => {
    favoriteService
      .addFavorite(authItem[0].user.id, advertisementId)
      .then((result) => {
        toast.success(result.data.message);
        favorites.push(advertisementId);
        setFavorites([...favorites]);
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
    console.log(pageSize);
  };

  const handleFilterClick = (filterOption) => {
    
    if (filterOption.cityId.length === 0) {
      filterOption.cityId = null;
    }
    if (filterOption.positionId.length === 0) {
      filterOption.positionId = null;
    }
    if (filterOption.workTypeId.length === 0) {
      filterOption.workTypeId = null;
    }
    if (filterOption.workTimeId.length === 0) {
      filterOption.workTimeId = null;
    }
 
    setFilterOption(filterOption);
    setActivePage(1);
  };

  

  const paginationOptions = [
    { key: 2, text: "2 İlan", value: 2 },
    { key: 10, text: "10 İlan", value: 10 },
    { key: 25, text: "25 İlan", value: 25 },
    { key: 50, text: "50 İlan", value: 50 },
    { key: 100, text: "100 İlan", value: 100 },
  ];

  return (
    <div>
      <Grid>
      <Grid.Column width={5}>
        
        <JobAdFilter clickEvent={handleFilterClick} />
      </Grid.Column>
     
     
      <Grid.Column width={11}>
      <Card.Group >
        {advertisements?.map((advertisement) => (
          <Card fluid style={{ borderRadius: "25px" }} onClick="25px">
            <Card.Content textAlign="left">
              {authItem[0].user.userType === 1 && (
                <Icon
                  onClick="25px"
                  size="large"
                  color={favorites.includes(advertisement.id)?"red":"white"}
                  name={
                    favorites.includes(advertisement.id)
                      ? "heart"
                      : "heart outline"
                  }
                  onClick={() => handleAddToFavorite(advertisement.id)}
                />
              )}

              {/* <div className="ds">
                <Image
                  width="80px"
                  height="auto"
                  style={{ marginTop: "0px" }}
                  src="data:image/jpeg;base64,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"
                />
              </div>  */}
              <div className="ac">
                <Card.Header textAlign="center" key={advertisement.id}>
                  {advertisement.employer.companyName}
                </Card.Header>
              </div>

              <h5>
                Maaş :
                <span>
                  {" "}
                  {advertisement.minSalary} - {advertisement.maxSalary}₺
                </span>
              </h5>

              <h5>
                Başvuru : Son {" "}
                <span>
                  {(
                    (new Date(advertisement.applicationDeadline).getTime() -
                      new Date(Date.now()).getTime()) /
                    86400000
                  )
                    .toString()
                    .split(".", 1)}{" "}
                  gün
                </span>
              </h5>

              <h5>
                Çalışma Şekli :<span>{advertisement.workType.workType}</span>
              </h5>

              <h5>
                <Icon name="location arrow" />{" "}
                <span>{advertisement.city.name}</span>
              </h5>

              <Card.Content extra>
                <div>
                  <Link as={Link} to={`/advertisements/${advertisement.id}`}>
                    <Button color="olive" floated="right">
                      Detay
                    </Button>
                  </Link>
                  <Button color="green" floated="right">
                    <Icon name="edit outline" />
                    İlana Başvur
                  </Button>
                </div>
              </Card.Content>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Grid>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>

      <Card.Content>
        <Pagination
          firstItem={null}
          lastItem={null}
          activePage={activePage}
          onPageChange={handlePaginationChange}
          totalPages={Math.ceil(totalPageSize / pageSize)}
        />
        {/* <Dropdown 
          onChange={(e, data) => {
            setActivePage(1)
            setPageSize(data.value);
            handlePaginationSizeChange(data.value);
          }}
          selection
          defaultValue={pageSize}
          text={"Sayfalama - " + pageSize}
          style={{ float: "right" }}
          options={paginationOptions}
      /> */}
      </Card.Content>
      </Grid.Column>
      </Grid>
    </div>
  );
}

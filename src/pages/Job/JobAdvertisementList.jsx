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
import swal from "sweetalert";
import ShadowBoxWithHeader from "../../layouts/ShadowBoxWithHeader";
import UpdateImage from "../CvUpdate/UpdateImage";

export default function JobAdvertisementList() {
  const dispatch = useDispatch();
  let [activePage, setActivePage] = useState(1);
  let [filterOption, setFilterOption] = useState({});
  let [pageSize, setPageSize] = useState(3);
  let [totalPageSize, setTotalPageSize] = useState(0);

  let { id } = useParams();

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
        //toast.success(result.data.message);
        if (result.data.success === true) {
          swal({
            title: "Başarılı!",
            text: result.data.message,
            icon: "success",
            button: "Ok",
          });
        }
        //else {
        //   swal({
        //     title: "İşlem Başarısız!",
        //     text: result.response.data.message,
        //     icon: "error",
        //     button: "Ok",
        //   });
        // }
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
        <div style={{ paddingLeft: 250, paddingTop: 100 }}>
          <Grid.Column width={5}>
            <JobAdFilter clickEvent={handleFilterClick} />
          </Grid.Column>
        </div>

        <div className="container d-flex flex-column align-items-center justify-content-center">
          <ShadowBoxWithHeader
            margined={70}
            padding={30}
            width={"125vh"}
            unanimated
            className="d-flex flex-column"
          >
            <Card.Group>
              {advertisements?.map((advertisement) => (
                <Card fluid onClick="25px">
                  <Card.Content>
                    <Grid divided="vertically">
                      <Grid.Row>
                        {/* <span style={{paddingLeft:525}}>{advertisement.employer.companyName}</span> */}

                        <div style={{ paddingBottom: 25 }}>
                          <div style={{ paddingRight: 90 }}>
                            {authItem[0].user.userType === 1 && (
                              <Icon
                                onClick="25px"
                                size="large"
                                color={
                                  favorites.includes(advertisement.id)
                                    ? "red"
                                    : "white"
                                }
                                name={
                                  favorites.includes(advertisement.id)
                                    ? "heart"
                                    : "heart outline"
                                }
                                onClick={() =>
                                  handleAddToFavorite(advertisement.id)
                                }
                              />
                            )}
                          </div>
                          <div
                            style={{
                              paddingBottom: 20,
                              paddingTop: 20,
                              fontFamily: "sans-serif",
                              paddingLeft:10
                            }}
                          >
                            <Image
                              floated="left"
                              size="small"
                              src={advertisement.employer?.image.imageUrl}
                            />
                          </div>
                        </div>
                        <Card.Header
                          style={{
                            fontFamily: "Courier",
                            fontWeight: "bold",
                            paddingLeft: 25,
                          }}
                          textAlign="left"
                        >
                          <Card.Header
                            style={{
                              paddingTop: 10,
                              paddingLeft: 300,
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            {advertisement.employer.companyName}
                          </Card.Header>

                          <div
                            style={{
                              paddingTop: 25,
                              fontWeight: "normal",
                              fontSize: 17,
                            }}
                          >
                            <Card.Header>
                              Maaş :{" "}
                              <span
                                style={{
                                  fontSize: 17,
                                  fontWeight: "bold",
                                }}
                              >
                                {advertisement.minSalary} -{" "}
                                {advertisement.maxSalary}₺{" "}
                              </span>{" "}
                            </Card.Header>
                            <div
                              style={{
                                fontSize: 17,
                              }}
                            ></div>
                            <div style={{ paddingTop: 20 }}>
                              <Card.Header>
                                Başvuru :
                                <span
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {" "}
                                  Son{" "}
                                  {(
                                    (new Date(
                                      advertisement.applicationDeadline
                                    ).getTime() -
                                      new Date(Date.now()).getTime()) /
                                    86400000
                                  )
                                    .toString()
                                    .split(".", 1)}{" "}
                                  gün
                                </span>
                              </Card.Header>{" "}
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
                              paddingTop: 49,
                              fontWeight: "normal",
                              fontSize: 17,
                            }}
                          >
                            <Card.Header>
                              Çalışma Şekli : {""}
                              <span
                                style={{
                                  fontSize: 17,
                                  fontWeight: "bold",
                                }}
                              >
                                {advertisement.workType.workType}
                              </span>
                            </Card.Header>
                            <div style={{ paddingTop: 20 }}>
                              <h5>
                                <Icon name="map marker alternate" />
                                <span>{advertisement.city.name}</span>
                              </h5>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                              <Card.Description></Card.Description>
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Content extra>
                          <div style={{ paddingTop: 120 }}>
                            <Link
                              as={Link}
                              to={`/advertisements/${advertisement.id}`}
                            >
                              <Button
                                animated
                                size="large"
                                circular="0px"
                                color="olive"
                              >
                                <Button.Content visible>Detay</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="arrow right" />
                                </Button.Content>
                              </Button>
                            </Link>
                          </div>
                        </Card.Content>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
            <Card.Content style={{ paddingTop: 50 }}>
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
          </ShadowBoxWithHeader>
        </div>
      </Grid>
    </div>
  );
}

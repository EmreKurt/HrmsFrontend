import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Icon,
  Image,
  Menu,
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
import { FaEdit } from "react-icons/fa";
import SchoolItem from "../../layouts/SchoolItem";

export default function JobAdvertisementList() {
  const dispatch = useDispatch();
  let [activePage, setActivePage] = useState(1);
  let [filterOption, setFilterOption] = useState({});
  let [pageSize, setPageSize] = useState(4);
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
      {authItem[0].loggedIn ? (
        <Card.Group>
          <Grid>
            <div style={{ paddingLeft: 250, paddingTop: 110 }}>
              <Grid.Column width={5}>
                <JobAdFilter clickEvent={handleFilterClick} />
              </Grid.Column>
            </div>

            <div
              style={{ paddingTop: 60 }}
              className="container d-flex flex-column align-items-center justify-content-center"
            >
              <ShadowBoxWithHeader
                margined={-20}
                padding={30}
                width={"140vh"}
                unanimated
                className="d-flex flex-column"
              >
                {advertisements?.map((advertisement) => (
                  <div style={{ paddingTop: 40 }}>
                    <Card fluid onClick>
                      <Card.Content>
                        <Grid divided="vertically">
                          <Grid.Row
                            as={Link}
                            to={`/advertisement/detail/${advertisement.id}`}
                          >
                            <div
                              style={{
                                paddingBottom: 10,
                                paddingTop: 5,
                                paddingLeft: 10,
                              }}
                            >
                              <div
                                style={{
                                  paddingBottom: 20,

                                  fontFamily: "sans-serif",
                                  paddingLeft: 10,
                                }}
                              >
                                <Image
                                  floated="left"
                                  size="small"
                                  bordered="40px solid transparent"
                                  src={advertisement.employer?.image.imageUrl}
                                />
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
                              <div>
                                <div
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold",
                                    fontSize: 19,
                                    color: "black",
                                  }}
                                >
                                  <Card.Description>
                                    {advertisement.employer.companyName}
                                  </Card.Description>
                                </div>

                                <div
                                  style={{
                                    paddingTop: 15,
                                    fontSize: 14,
                                    fontFamily: "courier,monospace",
                                    paddingBottom: 5,
                                    color: "black",
                                  }}
                                >
                                  <Card.Description>
                                    <Icon name="map marker alternate" />{" "}
                                    {advertisement.city.name}
                                  </Card.Description>
                                </div>

                                <div
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "courier,monospace",
                                    paddingBottom: 15,
                                    paddingTop: 5,
                                    color: "black",
                                  }}
                                >
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
                                  </Card.Header>
                                </div>

                                <div>
                                  <Card.Description>
                                    <Button
                                      style={{
                                        width: "80%",

                                        //backgroundColor: "#3abc3a",
                                        backgroundColor: "#cccccc",
                                        color: "white",
                                        borderRadius: "12px",
                                        border: "2px teal",
                                        padding: "7px 31px",
                                      }}
                                    >
                                      {advertisement.workTime?.workTime}
                                    </Button>
                                  </Card.Description>
                                </div>
                              </div>
                            </Card.Header>

                            <div style={{ paddingTop: 102 }}>
                              <Button
                                style={{
                                  //backgroundColor: "#3abc3a",
                                  backgroundColor: "#cccccc",

                                  color: "white",
                                  borderRadius: "12px",
                                  border: "4px teal",
                                  padding: "7px 30px",
                                }}
                              >
                                {advertisement.workType?.workType}
                              </Button>
                            </div>
                          </Grid.Row>

                          {authItem[0].user.userType === 1 && (
                            <Icon
                              className="sileyn"
                              //style={{ position:"initial" }}

                              onClick="25px"
                              size="large"
                              color={
                                favorites.includes(advertisement.id)
                                  ? "black"
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
                        </Grid>
                      </Card.Content>
                    </Card>
                  </div>
                ))}
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
        </Card.Group>
      ) : (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <p>Bu sayfayı görüntülemek için lütfen giriş yapınız</p>
        </div>
      )}
    </div>
  );
}

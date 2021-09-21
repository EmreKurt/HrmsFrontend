import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Image, Grid, Icon, Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { userLogout } from "../store/actions/authActions";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CvService from "../services/cvService";
import EmployerUpdate from "../pages/Employer/EmployerUpdate";

export default function SignedIn() {
  let { id } = useParams();
  const { authItem } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");
  };

  const [cv, setCv] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService
      .getBySeekerId(authItem[0].user.id)
      .then((result) => setCv(result.data.data));
  }, [id]);

  return (
    <div className="orte">
      <Grid>
        {authItem[0].user.userType === 1 && (
          <div>
              {cv.image?.map((images) => (
              <Image
                size="mini"
                src={images?.imageUrl}
                key={images?.id}
                style={{ borderRadius: "50%" }}
              />
            ))}
          </div>
        )}
        <Dropdown
          style={{ paddingLeft: 1, paddingTop: 5 }}
          pointing="top right"
          text={authItem[0].user.name}
        >
          <Dropdown.Menu>
            {authItem[0].user.userType === 1 && //cv.active === true && 
            (
              cv.active ? 
              <Dropdown.Item as={Link} to={`/cv/${authItem[0].user.id}`}>
                <Icon name="cloud upload" />
                Cv'im
              </Dropdown.Item>
              :
              <Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.id}`}>
                <Icon name="cloud upload" />
                Cv ekle
              </Dropdown.Item>
            )}

            {authItem[0].user.userType === 1 && (
              <Dropdown.Item
                as={NavLink}
                to="/jobAdFavorites"
                text="Favori İlanlarım"
                icon="favorite"
              />
            )}
            {authItem[0].user.userType === 2 && (
              <Dropdown.Item as={Link} to={`/employer/${authItem[0].user.id}`}>
                <p>
                  <i className="cloud upload icon"></i>Şirket bilgilerini
                  güncelle
                </p>
              </Dropdown.Item>
            )}
            {authItem[0].user.userType === 3 && (
              <Dropdown.Item
                as={NavLink}
                to="/confirmAdvert"
                text="İlan Onaylama"
                icon="tags"
              />
            )}

            {authItem[0].user.userType === 3 && (
              <Dropdown.Item
                as={NavLink}
                to="/employerUpdateConfirm"
                text="Şirket Bilgilerini Onayla"
                icon="tags"
              />
            )}
            <Dropdown.Item
              onClick={() => handleLogout(authItem[0].user)}
              text="Çıkış Yap"
              icon="sign-out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </div>
  );
}

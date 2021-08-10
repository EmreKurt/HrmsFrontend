import React, { useState,useEffect } from "react";
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

  useEffect(() => {
    let cvService = new CvService();
    cvService.getBySeekerId(id).then((result) => setCv(result.data.data));
  }, [id]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getByImageId(id).then((result) => setCv(result.data.data));
  }, [id]);


  return (
    <div>
      <Menu.Item >
        {authItem[0].user.userType === 2 && (
          <Link to={`/addJobAdvertisement`}>
            <Button color="google plus" type="submit">İlan Ekle</Button>
          </Link>
        )}
        <Grid>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
        <Menu.Menu >
          <Dropdown  pointing="top right" text={authItem[0].user.name}>
          
            <Dropdown.Menu className="last">
 
              {authItem[0].user.userType===1 &&<Dropdown.Item as={Link} to={`/cv/${authItem[0].user.id}`}><Icon name="cloud upload"/>Cv'ni güncelle</Dropdown.Item>}
              {authItem[0].user.userType===1 &&<Dropdown.Item
                as={NavLink}
                to="/jobAdFavorites"
                text="Favori İlanlarım"
                icon="favorite"
              />}
              {/* {authItem[0].user.userType===2 &&<Dropdown.Item><Popup trigger={<p><i className="cloud upload icon"></i>Şirket bilgilerini güncelle</p>} modal><EmployerUpdate/></Popup></Dropdown.Item> } */}
              {authItem[0].user.userType ===3 && <Dropdown.Item
                as={NavLink}
                to="/confirmAdvert"
                text="İlan Onaylama"
                icon="tags"
              />}
              <Dropdown.Item
                onClick={() => handleLogout(authItem[0].user)}
                text="Çıkış Yap"
                icon="sign-out"
              />

            </Dropdown.Menu>
            
          </Dropdown>
        </Menu.Menu>
      </Menu.Item>
    </div>
  );
}



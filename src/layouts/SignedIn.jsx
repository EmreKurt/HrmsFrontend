import React from "react";
import { Dropdown, Menu, Image, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { userLogout } from "../store/actions/authActions";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignedIn({ signOut }) {
  const { authItem } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");
  };

  return (
    <div>
      <Menu.Item>
        {authItem[0].user.userType === 2 && (
          <Link to={`/addJobAdvertisement`}>
            <Button color="google plus" type="submit">İlan Ekle</Button>
          </Link>
        )}
        <Grid>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
        <Menu.Menu>
          <Image
            avatar
            spaced="right"
            src="https://s.gravatar.com/avatar/6e961e3661251a51b991f6a7cd23c5e5?d=mm"
          />
          <Dropdown pointing="top right" text={authItem[0].user.name}>
            <Dropdown.Menu>
              <Dropdown.Item text="Bilgilerim" icon="info" />
              <Dropdown.Item
                as={NavLink}
                to="/jobAdFavorites"
                text="Favori İlanlarım"
                icon="favorite"
              />
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



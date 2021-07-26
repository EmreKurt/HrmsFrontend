import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

export default function SignedOut({signIn}) {
  return (
    <div>
      <Menu.Item>
        <Button.Group>
        
        <Link to={`/login`}> <Button primary style={{marginLeft:'0.5em'}} >Giriş Yap</Button></Link>
          <Button.Or />
          <Link to={`/recort`}> <Button positive>Kayıt Ol</Button></Link>
        </Button.Group>
      </Menu.Item>
    </div>
  );
}

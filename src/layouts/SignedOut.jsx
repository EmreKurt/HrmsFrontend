import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

export default function SignedOut({signIn}) {
  return (
    <div>

        <Button.Group>
        
        <Link to={`/login`}> <Button size="large" primary style={{marginLeft:'0.5em',position:"absolute"}} >Giriş Yap</Button></Link>
          <Button.Or />
          <Link  to={`/recort`}> <Button size="large" style={{position:"absolute"}} positive>Kayıt Ol</Button></Link>
        </Button.Group>

    </div>
  );
}

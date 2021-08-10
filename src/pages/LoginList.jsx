import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  SegmentGroup,
  Table,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function LoginList({ signIn }) {
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    dispatch(userLogin(user));
  };

  const history = useHistory();

  let userService = new UserService();
  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Bu alan boş bırakılamaz!")
      .email("Geçerli bir email adresi giriniz!"),
    password: Yup.string().required("Bu alan boş bırakılamaz!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      userService
        .login(values)
        .then((result) => {
          handleLogin(result.data.data);
          history.push("/");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div>
      <Grid>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width={8}>
          <Segment  placeholder="39d8">
            <Grid>
              <Grid.Row></Grid.Row>
              <Grid.Row></Grid.Row>
            </Grid>

            <Image
              src="https://www.cutehr.io/wp-content/uploads/2019/04/HRMS-Key-Features.jpg"
              size="huge"
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked color="violet">
              <Grid>
                <Grid.Row></Grid.Row>
              </Grid>
              <Header as="h2" color="teal" textAlign="center">
                <Image
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/35/05/a3/3505a363-39d8-be87-0929-a1b7fcead262/source/512x512bb.jpg"
                  avatar="0px"
                  bordered="ANd9GcQm7TG2npOURRQ8mE8tM6ouWaS_JR7OEASJUg"
                />
                Giriş Yap
              </Header>

              <Grid>
                <Grid.Row></Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
              <div>
                <label>
                  <b>Email</b>
                </label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E mail"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Şifre</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "2em" }}>
                <Button primary fluid size="large" type="submit">
                  Giriş Yap
                </Button>
              </div>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

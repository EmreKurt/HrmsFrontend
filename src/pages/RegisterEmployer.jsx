import React from "react";
import {
  Button,
  Form,
  Icon,
  Message,
  Header,
  Image,
  Segment,
  Grid,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import EmployerService from "../services/employerService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Component } from "react";

export default function RegisterEmployer() {
  
  const history = useHistory();

  let employerService = new EmployerService();
  const employerAddSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Bu alan zorunludur!")
      .min(3, "Şirket adı minimum 3 karakter olmalıdır!"),
    phoneNumber: Yup.string()
      .required("Bu alan zorunludur!")
      .length(10, "Telefon numarası hatalı,lütfen 0 olmadan yazınız!")
      .matches(/^[0-9]+$/, "Lütfen sadece rakam giriniz!"),
    webSite: Yup.string().required("Bu alan zorunludur!"),
    email: Yup.string()
      .required("Bu alan zorunludur!")
      .email("Lütfen geçerli bir email adresi giriniz!"),
    password: Yup.string()
      .required("Bu alan zorunludur!")
      .min(8, "Şifre minimum 8 karakter olmalıdır!"),
    rePassword: Yup.string()
      .required("Bu alan zorunludur!")
      .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor!"),
    //image: Yup.string(),
    explanation: Yup.string().required("Firma açıklaması zorunludur!"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      phoneNumber: "",
      webSite: "",
      email: "",
      password: "",
      rePassword: "",
      //image: "",
      explanation: "",
    },
    validationSchema: employerAddSchema,
    onSubmit: (values) => {
      employerService
        .registerEmployer(values)
        .then((result) => {
          toast.success(result.data.message);
          history.push("/login");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div>
      <Form style={{paddingBottom:25,paddingTop:100}} size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <Grid>
            <Grid.Row></Grid.Row>
          </Grid>
          <Header as="h2" color="violet" textAlign="center">
            <Image
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/35/05/a3/3505a363-39d8-be87-0929-a1b7fcead262/source/512x512bb.jpg"
              avatar="0px"
              bordered="ANd9GcQm7TG2npOURRQ8mE8tM6ouWaS_JR7OEASJUg"
            />
            İşveren Olarak Kayıt Ol
          </Header>
          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>

          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Şirket Adı</b>
                </label>
                <Form.Input
                  fluid
                  icon="building"
                  iconPosition="left"
                  placeholder="Şirket Adı"
                  type="text"
                  value={formik.values.companyName}
                  name="companyName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.companyName && formik.touched.companyName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.companyName}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Firma Açıklaması</b>
                </label>
                <Form.Input
                  fluid
                  icon="building outline"
                  iconPosition="left"
                  placeholder="Firma Açıklaması"
                  type="text"
                  value={formik.values.explanation}
                  name="explanation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.explanation && formik.touched.explanation && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.explanation}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Telefon Numarası</b> (Sıfır olmadan yazınız)
                </label>
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telefon Numarası"
                  type="text"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Email</b>
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Web Sitesi</b>
                </label>
                <Form.Input
                  fluid
                  icon="world"
                  iconPosition="left"
                  placeholder="Web Sitesi"
                  type="text"
                  name="webSite"
                  value={formik.values.webSite}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.webSite && formik.touched.webSite && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.webSite}
                  </div>
                )}
              </div>

              {/* <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Firma Resimi</b>
                </label>
                <Form.Input
                  fluid
                  icon="image"
                  iconPosition="left"
                  placeholder="Firma Resimi"
                  type="text"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               
              </div> */}

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
                <label>
                  <b>Şifre Tekrar</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre Tekrar"
                  type="password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>

          <Form.Checkbox inline label="Hükümlere ve koşullara katılıyorum" />
          <Button color="olive" fluid type="submit" size="large">
            Kayıt Ol
          </Button>
        </Segment>
      </Form>
      <Message info>
        <Link to={"/recort"}>
          <b>İş Arayan olarak kaydolmak için buraya tıkla</b>
        </Link>
      </Message>
    </div>
  );
}

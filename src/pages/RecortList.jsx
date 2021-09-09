import React from "react";
import {
  Button,
  Form,
  Icon,
  Message,
  Header,
  Image,
  Grid,
  Segment,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import JobSeekerService from "../services/jobSeekerService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function RecortList() {
  let jobSeekerService = new JobSeekerService();
  const seekerRegisterSchema = Yup.object().shape({
    birthDate: Yup.date().required("Bu alan boş bırakılamaz!"),
    email: Yup.string()
      .required("Bu alan boş bırakılamaz!")
      .email("Geçerli bir email adresi giriniz!"),
    firstName: Yup.string().required("Bu alan boş bırakılamaz!"),
    lastName: Yup.string().required("Bu alan boş bırakılamaz!"),
    nationalityId: Yup.string()
      .required("Bu alan boş bırakılamaz!")
      .length(11, "Geçerli bir kimlik numarası değil!")
      .matches(/^[0-9]+$/, "Sadece rakam girilmelidir!"),
    password: Yup.string()
      .required("Bu alan boş bırakılamaz!")
      .min(8, "Şifre en az 8 karakter olmalıdır!"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Şifreler eşleşmiyor!"
    ),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      birthDate: "",
      email: "",
      firstName: "",
      lastName: "",
      nationalityId: "",
      password: "",
      rePassword: "",
    },
    validationSchema: seekerRegisterSchema,
    onSubmit: (values) => {
      jobSeekerService
        .registerSeeker(values)
        .then((result) => {
          toast.success(result.data.message);
        })
       
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

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
            İş Arayan Olarak Kayıt Ol
          </Header>
          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>
          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>İsim</b>
                </label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="İsim"
                  type="text"
                  value={formik.values.firstName}
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Soy İsim</b>
                </label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Soy isim"
                  type="text"
                  value={formik.values.lastName}
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Kimlik Numarası</b>
                </label>
                <Form.Input
                  fluid
                  icon="id card"
                  iconPosition="left"
                  placeholder="Kimlik numarası"
                  type="text"
                  value={formik.values.nationalityId}
                  name="nationalityId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.nationalityId &&
                  formik.touched.nationalityId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.nationalityId}
                    </div>
                  )}
              </div>

              <div style={{ marginTop: "2em" }}>
                <label>
                  <b>Doğum Tarihi</b>
                </label>
                <Form.Input
                  fluid
                  icon="calendar times"
                  iconPosition="left"
                  placeholder="Dogum tarihi"
                  type="date"
                  error={Boolean(formik.errors.birthDate)}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "birthDate")
                  }
                  value={formik.values.birthDate}
                  onBlur={formik.handleBlur}
                  name="birthDate"
                />
                {formik.errors.birthDate && formik.touched.birthDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.birthDate}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email</b>
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail adresi"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
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
                  placeholder="Şifre tekrar"
                  type="password"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="rePassword"
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
          <div style={{ marginTop: "2em" }}>
            <Button fluid color="olive" type="submit" size="large">
              {" "}
              Kayıt Ol
            </Button>
          </div>
        </Segment>
      </Form>
      <Message  info>
        <Link to={"/registerEmployer"}>
          <b>İşveren olarak kaydolmak için buraya tıkla</b>
        </Link>
      </Message>
    </div>
    
  );
}

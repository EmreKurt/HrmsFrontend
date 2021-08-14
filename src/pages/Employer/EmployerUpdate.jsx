import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Form, Grid, Icon, Message } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import EmployerService from "../../services/employerService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function EmployerUpdate() {
  let { id } = useParams();
  let employerService = new EmployerService();
  const { authItem } = useSelector((state) => state.auth);

  const [employer, setEmployer] = useState({});
  const employerUpdateSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Bu alan boş birakılamaz")
      .min(3, "En az 3 karakter uzunlugunda olmalıdır"),
    email: Yup.string()
      .required("Bu alan zorunludur")
      .email("Hatalı email girdiniz"),
    phoneNumber: Yup.string()
      .required("Bu alan zorunludur")
      .min(11, "Telegon numarası 11 haneli olmalıdır")
      .max(11, "Telegon numarası 11 haneli olmalıdır"),
    webSite: Yup.string().required("Bu alan zorunludur"),
  });

  let formik;

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getEmployerById(authItem[0].user.id).then((result) => {
      formik.values.companyName = result.data.data.companyName;
      formik.values.email = result.data.data.email;
      formik.values.webSite = result.data.data.webSite;
      formik.values.phoneNumber = result.data.data.phoneNumber;
      setEmployer(result.data.data);
    });
  }, [authItem, formik]);

  formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      phoneNumber: "",
      webSite: "",
    },
    validationSchema: employerUpdateSchema,
    onSubmit: (values) => {
      formik.values.employerId = authItem[0].user.id;
      employerService
        .update(values)
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Başarılı!",
              text: "Sistem yöneticisi tarafından yaptığınız güncellemenin onaylanmasını bekleyiniz!",
              icon: "success",
              button: "Ok",
             }).then(function () {
              window.location='http://localhost:3000/'
            })
          } else {
            swal({
              title: "İşlem Başarısız!",
              text: result.data.message,
              icon: "error",
              button: "Ok",
            });
          }
        })
    },
  });
  return (
    <div>
      {employer.waitingUpdate === true && (
        <Message positive>
          <Message.Header>
            Son güncelleme isteginiz onay bekliyor
          </Message.Header>
          <div style={{ paddingTop: 15,paddingBottom:15 }}><p>
            En son yaptıgınız güncelleme isteği onaylanana kadar yeni günceleme
            yapamazsınız personelimiz en kısa sürede isteğinizi onaylayacaktır
          </p></div>
        </Message>
      )}
      {employer.waitingUpdate === false && (
      <div style={{ paddingTop: 15 }}>
        <Card fluid color={"black"}>
          <Card.Content header={"Şirket Bilgilerini Güncelle"} />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Grid>
                <Grid.Column width={8}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Şirket Adı</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Şirket Adı"
                        type="text"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.companyName &&
                        formik.touched.companyName && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.companyName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div
                    style={{
                      paddingTop: 20,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <label>
                      <b>Email</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15 }}>
                    <Form.Input
                      fluid
                      placeholder="Şirket Adı"
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
                </Grid.Column>
                <Grid.Column width={8}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Web Site</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
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
                  </div>
                  <div
                    style={{
                      paddingTop: 20,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <label>
                      <b>Telefon</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15 }}>
                    <Form.Input
                      fluid
                      placeholder="Telefon"
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.phoneNumber}
                        </div>
                      )}
                  </div>
                </Grid.Column>
              </Grid>
              <div style={{ paddingTop: 40 }}>
                <Button  fluid color="green" type="submit">
                  Güncelle<Link as={Link} to={`/`}></Link>
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      </div>
      )}
    </div>
  );
}

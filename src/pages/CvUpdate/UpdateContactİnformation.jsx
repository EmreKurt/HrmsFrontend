import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Card, Table, Button, Form, Grid, Icon } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ProgramLanguageService from "../../services/programLanguageService";
import JobSeekerService from "../../services/jobSeekerService";

export default function UpdateContactİnformation() {
  let { id } = useParams();
  const [cv, setCv] = useState([]);

  let cvService = new CvService();
  let seekerService = new JobSeekerService();
  useEffect(() => {
    let cvService = new CvService();
    cvService.getBySeekerId(id).then((result) => setCv(result.data.data));
  }, [id]);

  let contactİnformationAddSchema = Yup.object().shape({
    birthDate: Yup.string().required("Bu alan zorunludur"),
    email: Yup.string()
    .required("Bu alan boş bırakılamaz!")
    .email("Geçerli bir email adresi giriniz!"),
    firstName: Yup.string().required("Bu alan zorunludur"),
    lastName: Yup.string().required("Bu alan zorunludur"),
    phoneNumber: Yup.string().required("Bu alan zorunludur"),
    github: Yup.string().required("Bu alan zorunludur"),
    linkedin: Yup.string().required("Bu alan zorunludur")
  });

  const formik = useFormik({
    initialValues: {
        birthDate: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber:"",
        github:"",
        linkedin:""
    },
    validationSchema: contactİnformationAddSchema,
    onSubmit: (values) => {
     // values.cvId = id;
      seekerService
        .updateSeeker(id,values.email,values.firstName,values.lastName,values.birthDate,values.phoneNumber,values.github,values.linkedin)
         .then((result) => {
            if (result.data.success === true) {
                swal({
                  title: "Başarılı!",
                  text: "Bilgileriniz başarılı bir şekilde güncellenmiştir!",
                  icon: "success",
                  button: "Ok",
                });
                cvService.getBySeekerId(id).then((result) => {
                    setCv(result.data.data);
                  });
              } else {
                swal({
                  title: "İşlem Başarısız!",
                  //text: result.data.message,
                  icon: "error",
                  button: "Ok",
                });
              }
           
           // updateCvValues();
         })
         .catch((result) => {
           toast.error(result.response.data.message);
         });
    },
  });
  return (
    <div>
      <Grid stackable>
        <Grid.Column>
          <Card fluid color={"black"}>
            <Card.Content header={"İletişim Bilgilerim"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <Grid stackable>
                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>İsim</b>
                      </label>
                    </div>
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      placeholder="İsim"
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>Soy isim</b>
                      </label>
                    </div>
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      placeholder="Soy İsim"
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>
                </Grid>

                <Grid stackable>
                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>E-posta Adresi</b>
                      </label>
                    </div>
                    <Form.Input
                    icon="mail"
                    iconPosition="left"
                      placeholder="Email"
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>Telefon</b>
                      </label>
                    </div>
                    <Form.Input
                    icon="text telephone"
                    iconPosition="left"
                      placeholder="Telefon"
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>
                </Grid>

                <Grid stackable>
                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>Doğum Tarihi</b>
                      </label>
                    </div>
                    <Form.Input
                    icon="birthday"
                    iconPosition="left"
                      placeholder="Doğum tarihi"
                      type="text"
                      name="birthDate"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>GitHub Adresi</b>
                      </label>
                    </div>
                    <Form.Input
                     icon="github"
                     iconPosition="left"
                      placeholder="Github adresi"
                      type="text"
                      name="github"
                      value={formik.values.github}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                      <label>
                        <b>Linkedin Adresi</b>
                      </label>
                    </div>
                    <Form.Input
                     icon="linkedin"
                     iconPosition="left"
                      placeholder="Linkedin adresi"
                      type="text"
                      name="linkedin"
                      value={formik.values.linkedin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                  <div style={{ paddingTop: 40, paddingLeft: 120 }}>
                  <Button
                    animated
                    style={{
                      width: "35%",
                      marginRight: 100,
                      backgroundColor: "#7fff00",
                      color: "white",
                      borderRadius: "14px",
                      border: "2px teal",
                      padding: "12px 15px",
                    }}
                    type="submit"
                  >
                    <Button.Content visible>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          fontFamily: "monospace",
                        }}
                      >
                        Güncelle
                      </div>
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="check" />
                    </Button.Content>
                  </Button>
                </div>
                  </Grid.Column>
                </Grid>
                
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

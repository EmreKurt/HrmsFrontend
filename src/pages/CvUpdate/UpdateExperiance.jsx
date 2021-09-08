import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Card, Table, Button, Form, Grid, Icon } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import JobExperienceService from "../../services/jobExperienceService";

export default function UpdateExperiance() {
  let { id } = useParams();
  const { authItem } = useSelector((state) => state.auth);
  let [experience, setExperience] = useState([]);
  let experienceService = new JobExperienceService();

  const experienceAddSchema = Yup.object().shape({
    position: Yup.string()
      .required("Bu alan zorunlu!")
      .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
    leavingWorkYear: Yup.date(),
    workPlaceName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
    startYear: Yup.date().required("Bu alan zorunlu!"),
  });

  let formik;

  useEffect(() => {
    let experienceService = new JobExperienceService();
    experienceService.getByCvId(id).then((result) => {
      setExperience(result.data.data);
    });
  }, [id]);

  formik = useFormik({
    initialValues: {
      position: "",
      leavingWorkYear: "",
      workPlaceName: "",
      startYear: "",
    },
    validationSchema: experienceAddSchema,
    onSubmit: (values) => {
      values.cvId = id;
      experienceService
        .updateExperience(
          id,
          values.leavingWorkYear,
          values.position,
          values.startYear,
          values.workPlaceName
        )
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Başarılı!",
              text: "Bilgileriniz başarılı bir şekilde güncellenmiştir!",
              icon: "success",
              button: "Ok",
            });
          } else {
            swal({
              title: "İşlem Başarısız!",
              //text: result.data.message,
              icon: "error",
              button: "Ok",
            });
          }
        });
    },
  });
  return (
    <div>
      <Card fluid>
        <Card fluid color={"black"}>
          <Card.Content header="İş Deneyimi Bilgilerini Düzenle" />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Grid stackable>
                <Grid.Column width={8}>
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>İş Yeri Adı</b>
                    </label>
                  </div>
                  <Form.Input
                    fluid
                    placeholder="İş Yeri Adı"
                    type="text"
                    name="workPlaceName"
                    value={formik.values.workPlaceName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>Başlangıç Tarihi</b>
                    </label>
                  </div>
                  <Form.Input
                    fluid
                    type="date"
                    name="startYear"
                    value={formik.values.startYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>Pozisyon</b>
                    </label>
                  </div>
                  <Form.Input
                    fluid
                    placeholder="Pozisyon"
                    type="text"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>Bitiş Tarihi</b>
                    </label>
                  </div>
                  <Form.Input
                    fluid
                    type="date"
                    name="leavingWorkYear"
                    value={formik.values.leavingWorkYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid.Column>
              </Grid>
              <div style={{ paddingTop: 50, paddingLeft: 600 }}>
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
            </Form>
          </Card.Content>
        </Card>
      </Card>
    </div>
  );
}

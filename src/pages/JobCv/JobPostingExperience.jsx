import React, { useEffect, useState } from "react";
import SchoolService from "../../services/schoolService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Card, Table, Button, Form, Grid, Icon } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import JobExperienceService from "../../services/jobExperienceService";

export default function JobPostingExperience() {
    let { id } = useParams();
    const { authItem } = useSelector((state) => state.auth);
    let [experience, setExperience] = useState([]);
    let experienceService = new JobExperienceService();
  
    const experienceAddSchema = Yup.object().shape({
      position: Yup.string()
        .required("Bu alan zorunlu!")
        .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
      leavingWorkYear: Yup.date().required("Bu alan zorunlu!"),
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
      <div style={{paddingLeft:200,paddingTop:50,paddingRight:200,}}>
        <Card fluid>
        
          <Card.Content ><Card.Content style={{fontWeight:"bold",fontSize:20,paddingTop:15,paddingBottom:20}} header={"İş Deneyimi"} />
          <Form onSubmit={formik.handleSubmit}>
              <Grid style={{ paddingLeft:170 }}>
                <Grid.Column style={{paddingLeft:20}} width={6}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Firma Adı</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Firma Adı"
                        type="text"
                        name="workPlaceName"
                        value={formik.values.workPlaceName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.workPlaceName &&
                        formik.touched.workPlaceName && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.workPlaceName}
                          </div>
                        )}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: 35,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <label>
                      <b>Departman</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15 }}>
                    <Form.Input
                      fluid
                      placeholder="Departman"
                      type="text"
                      name="position"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.position && formik.touched.position && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.position}
                      </div>
                    )}
                  </div>
                </Grid.Column>
                <Grid.Column style={{paddingLeft:20}} width={6}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Başlangıç Tarihi</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Başlangıç Tarihi"
                        type="date"
                        name="startYear"
                        value={formik.values.startYear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.startYear && formik.touched.startYear && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.startYear}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      paddingTop: 30,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <label>
                      <b>İş Durumu</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15,paddingBottom:30 }}>
                    <Form.Input
                      fluid
                      placeholder="İş durumu"
                      type="date"
                      name="leavingWorkYear"
                      value={formik.values.leavingWorkYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.leavingWorkYear &&
                      formik.touched.leavingWorkYear && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.leavingWorkYear}
                        </div>
                      )}
                  </div>
                  
                </Grid.Column>

              </Grid>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

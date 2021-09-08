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
export default function JobPostingSchools() {
  let { id } = useParams();
  const { authItem } = useSelector((state) => state.auth);
  let [school, setSchools] = useState([]);
  let schoolService = new SchoolService();

  const schoolAddSchema = Yup.object().shape({
    departmentName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
    graduationYear: Yup.date().required("Bu alan zorunlu!"),
    schoolName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(4, "Minimum 4 karakter uzunluğunda olmalıdır."),
    startYear: Yup.date().required("Bu alan zorunlu!"),
  });

  let formik;

  useEffect(() => {
    let schoolService = new SchoolService();
    schoolService.getByCvId(id).then((result) => {
      setSchools(result.data.data);
    });
  }, [id]);

  formik = useFormik({
    initialValues: {
      departmentName: "",
      graduationYear: "",
      schoolName: "",
      startYear: "",
    },
    validationSchema: schoolAddSchema,
    onSubmit: (values) => {
      values.cvId = id;
      schoolService.addScholl(values).then((result) => {
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
      <div style={{ paddingLeft: 200, paddingTop: 50, paddingRight: 200 }}>
        <Card fluid>
          <Card.Content>
            <Card.Content
              style={{
                fontWeight: "bold",
                fontSize: 20,
                paddingTop: 15,
                paddingBottom: 20,
              }}
              header={"Eğitim"}
            />
            <Form onSubmit={formik.handleSubmit}>
              <Grid style={{ paddingLeft: 170 }}>
                <Grid.Column style={{ paddingLeft: 20 }} width={6}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Okul Adı</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Okul adı"
                        type="text"
                        name="schoolName"
                        value={formik.values.schoolName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.schoolName &&
                        formik.touched.schoolName && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.schoolName}
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
                      <b>Departman</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15 }}>
                    <Form.Input
                      fluid
                      placeholder="Departman"
                      type="text"
                      name="departmentName"
                      value={formik.values.departmentName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.departmentName && formik.touched.departmentName && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.departmentName}
                      </div>
                    )}
                  </div>
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: 20 }} width={6}>
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
                        type="text"
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
                      <b>Mezuniyet Durumu</b>
                    </label>
                  </div>
                  <div style={{ paddingTop: 15, paddingBottom: 30 }}>
                    <Form.Input
                      fluid
                      placeholder="Mezuniyet Durumu"
                      type="text"
                      name="graduationYear"
                      value={formik.values.graduationYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.graduationYear &&
                      formik.touched.graduationYear && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.graduationYear}
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

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

export default function UpdateSchools({ cvId, updateCvValues }) {
  let { id } = useParams();
  const { authItem } = useSelector((state) => state.auth);
  let [school, setSchools] = useState([]);
  let schoolService = new SchoolService();

  const schoolAddSchema = Yup.object().shape({
    departmentName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
    graduationYear: Yup.date(),
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
      values.cvId=id;
      schoolService
        .updateSchool(id,values.departmentName,values.graduationYear,values.schoolName,values.startYear)
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Başarılı!",
              text: "Bilgileriniz başarılı bir şekilde güncellenmiştir!",
              icon: "success",
              button: "Ok",
             })
          } else {
            swal({
              title: "İşlem Başarısız!",
              //text: result.data.message,
              icon: "error",
              button: "Ok",
            });
          }
        })
    },
  });
  /*
  const handleDeleteScholl = (schoolId) => {
    cvService
      .deleteSchool(schoolId)
      .then((result) => {
        toast.success(result.data.message);
        cvService.getBySchoolId(id).then((result) => {
          setCv(result.data.data);
        });
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };*/

  return (
    <div style={{ paddingTop: 50 }}>
      <Card fluid>
        <Card fluid color={"black"}>
          <Card.Content header="Okul Bilgilerini Düzenle" />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Grid stackable>
                <Grid.Column width={8}>
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>Okul Adı</b>
                    </label>
                  </div>
                    <Form.Input
                      fluid
                      placeholder="Okul Adı"
                      type="text"
                      name="schoolName"
                      value={formik.values.schoolName}
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
                      <b>Bölüm Adı</b>
                    </label>
                  </div>
                    <Form.Input
                      fluid
                      placeholder="Bölüm Adı"
                      type="text"
                      name="departmentName"
                      value={formik.values.departmentName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  <div style={{ paddingTop: 25 }}>
                    <label>
                      <b>Mezuniyet Tarihi</b>
                    </label>
                  </div>
                    <Form.Input
                      fluid
                      type="date"
                      name="graduationYear"
                      value={formik.values.graduationYear}
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

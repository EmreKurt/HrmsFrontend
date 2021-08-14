import React, { useEffect, useState } from "react";
import SchoolService from "../../services/schoolService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function UpdateSchools({ cvId, updateCvValues }) {
  let { id } = useParams();
  let [cv, setCv] = useState([]);
  let schoolService = new SchoolService();
  let cvService = new CvService();
  useEffect(() => {
    let cvService = new CvService();
    cvService.getBySchoolId(id).then((result) => {
      setCv(result.data.data);
    });
  }, [id]);

  let schoolAddSchema = Yup.object().shape({
    departmentName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(3, "Minimum 3 karakter uzunluğunda olmalıdır."),
    graduationYear: Yup.date(),
    schoolName: Yup.string()
      .required("Bu alan zorunlu!")
      .min(4, "Minimum 4 karakter uzunluğunda olmalıdır."),
    startYear: Yup.date().required("Bu alan zorunlu!"),
  });

  const formik = useFormik({
    initialValues: {
      departmentName: "",
      graduationYear: "",
      schoolName: "",
      startYear: "",
    },
    validationSchema: schoolAddSchema,
    onSubmit: (values) => {
      values.cvId = cvId;
      schoolService
        .addScholl(values)
        .then((result) => {
          toast.success(result.data.message);
          schoolService.getByCvId(cvId).then((result) => {
            setCv(result.data.data);
          });
          updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

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
  };
  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Okudugu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv?.map((cvs) => (
              <Table.Row key={cvs.school?.id}>
                <Table.Cell>{cvs.school?.schoolName}</Table.Cell>
                <Table.Cell>{cvs.school?.departmentName}</Table.Cell>
                <Table.Cell>{cvs.school?.startYear}</Table.Cell>
                <Table.Cell>{cvs.school?.graduationYear}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    icon="x"
                    circular
                    onClick={() => handleDeleteScholl(cv.school?.id)}
                  ></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid>
        <Card fluid color={"black"}>
          <Card.Content header="Okul Ekle" />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label>
                    <b>Okul Adı</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Okul Adı"
                    type="text"
                    name="schoolName"
                    value={formik.values.schoolName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label>
                    <b>Başlangıç Tarihi</b>
                  </label>
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
                  <label>
                    <b>Bölüm Adı</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Bölüm Adı"
                    type="text"
                    name="departmentName"
                    value={formik.values.departmentName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label>
                    <b>Mezuniyet Tarihi</b>
                  </label>
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
              <div style={{ marginTop: "1em" }}>
                <Button fluid color="green" type="submit">
                  Ekle
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      </Card>
    </div>
  );
}

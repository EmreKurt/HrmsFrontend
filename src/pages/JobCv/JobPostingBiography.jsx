import { Field, useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  FormField,
  Icon,
  Card,
  TextArea,
} from "semantic-ui-react";
import * as Yup from "yup";
import CvService from "../../services/cvService";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function JobPostingBiography(
  cvId,
  updateCvValues,
  currentCoverLatter
) {
  let cvService = new CvService();
  const updateSchema = Yup.object().shape({
    coverLatter: Yup.string().required("Zorunlu!"),
  });

  const formik = useFormik({
    initialValues: {
      coverLatter: currentCoverLatter,
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      cvService.updateBiography(cvId, values.coverLatter).then((result) => {
        //toast.success(result.data.message);
        if (result.data.success === true) {
          swal({
            title: "Başarılı!",
            text: "Güncelleme işleminiz tamamlandı!",
            icon: "success",
            button: "Ok",
          }).then(function () {
            window.location.reload();
          });
        } else {
          swal({
            title: "İşlem Başarısız!",
            text: result.data.message,
            icon: "error",
            button: "Ok",
          });
        }
        updateCvValues();
      });
    },
  });

  const { authItem } = useSelector((state) => state.auth);

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
              header={"Ön Söz"}
            />
            <Form onSubmit={formik.handleSubmit}>
              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <TextArea
                    placeholder="ön söz..."
                    style={{ minHeight: 100 }}
                    error={Boolean(formik.errors.jobDescription).toString()}
                    //value={formik.values.jobDescription}
                    name="jobDescription"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* {formik.errors.jobDescription &&
                    formik.touched.jobDescription && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.jobDescription}
                      </div>
                    )} */}
                </Form.Field>
              </div>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

import { Field, useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, FormField, Icon } from "semantic-ui-react";
import * as Yup from "yup";
import CvService from "../../services/cvService";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateBiography({
  cvId,
  updateCvValues,
  currentCoverLatter,
}) {
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
      <Form size="large" onSubmit={formik.handleSubmit}>
        <label>
          <b>Biyografi</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.TextArea
            placeholder="Biyografi..."
            type="text"
            value={formik.values.coverLatter}
            name="coverLatter"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ minHeight: 200 }}
          />
          {formik.errors.coverLatter && formik.touched.coverLatter && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.coverLatter}
            </div>
          )}
        </div>
        <Button color="green" fluid size="large" type="submit">
          Güncelle
        </Button>
      </Form>
    </div>
  );
}

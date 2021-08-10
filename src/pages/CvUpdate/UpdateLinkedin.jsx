import React from "react";
import CvService from "../../services/cvService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function UpdateLinkedin({ cvId, updateCvValues }) {
  let cvService = new CvService();
  const updateLinkedinSchema = Yup.object().shape({
    linkedinAdress: Yup.string().required("Zorunlu!"),
  });

  const formik = useFormik({
    initialValues: {
      linkedinAdress: "",
    },
    validationSchema: updateLinkedinSchema,
    onSubmit: (values) => {
      cvService
        .updateLinkedin(cvId, values.linkedinAdress)
        .then((result) => {
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
        })
        
    },
  });
  return (
    <div>
      <Form size="large" onSubmit={formik.handleSubmit}>
     
        <label>
          <b>Linkedin Link</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.TextArea
            placeHolder="Linkedin Link"
            type="text"
            value={formik.values.linkedinAdress}
            name="linkedinAdress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.linkedinAdress && formik.touched.linkedinAdress && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.linkedin}
            </div>
          )}
        </div>
        <Button color="green" fluid size="large" type="submit">
          Düzenle
        </Button>
      </Form>
    </div>
  );
}

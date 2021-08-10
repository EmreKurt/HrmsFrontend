import React from "react";
import CvService from "../../services/cvService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function UpdateGithub({ cvId, updateCvValues }) {
  let cvService = new CvService();
  const updateGithubSchema = Yup.object().shape({
    githubAdress: Yup.string().required("Zorunlu!"),
  });

  const formik = useFormik({
    initialValues: {
      githubAdress: "",
    },
    validationSchema: updateGithubSchema,
    onSubmit: (values) => {
      cvService
        .updateGithub(cvId, values.githubAdress)
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
          <b>GitHub Link</b>
        </label>
        <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
        <Form.TextArea
          fluid
          placeHolder="GithubLink"
          type="text"
          value={formik.values.githubAdress}
          name="githubAdress"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {
            formik.errors.githubAdress && formik.touched.githubAdress && (
                <div className={"ui pointing red basic label"}>
                    {formik.errors.githubAdress}
                </div>
            )
        }
        </div>
        <Button color="green" fluid size="large" type="submit">Düzenle</Button>
      </Form>
    </div>
  );
}

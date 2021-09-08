import React, { useEffect, useState } from "react";
import LanguageService from "../../services/languageService";
import { useParams } from "react-router-dom";
import { Card, Table, Button, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function JobPostingLanguage() {
  let { id } = useParams();
  let [languages, setLanguages] = useState([]);

  let languageService = new LanguageService();

  useEffect(() => {
    let languageService = new LanguageService();
    languageService.getByCvId(id).then((result) => {
      setLanguages(result.data.data);
    });
  }, [id]);

  let languageAddSchema = Yup.object().shape({
    languageName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "En az 2 karakter uzunlugunda olmalıdır"),
    languageLevel: Yup.number()
      .min(1, "1 Den az olamaz")
      .max(5, "5 ten fazla olamaz")
      .required("Bu alan zorunludur"),
  });

  const formik = useFormik({
    initialValues: {
      languageName: "",
      languageLevel: "",
    },
    validationSchema: languageAddSchema,
    onSubmit: (values) => {
      values.cvId = id;
      languageService
        .addLanguage(values)
        .then((result) => {
          toast.success(result.data.message);
          languageService.getByCvId(id).then((result) => {
            setLanguages(result.data.data);
          });
          //updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });
  return (
    <div>
      <div style={{ paddingLeft: 200, paddingTop: 50, paddingRight: 200,paddingBottom:50 }}>
        <Card fluid>
          <Card.Content>
            <Card.Content
              style={{
                fontWeight: "bold",
                fontSize: 20,
                paddingTop: 15,
                paddingBottom: 20,
              }}
              header={"Yabancı Dil"}
            />
            <Form onSubmit={formik.handleSubmit}>
              <Grid>
                <Grid.Column
                  style={{ paddingLeft: 200, paddingRight: 40 }}
                  width={8}
                >
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Dil Adı</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Şirket Adı"
                        type="text"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.companyName &&
                        formik.touched.companyName && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.companyName}
                          </div>
                        )}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column
                  style={{ paddingRight: 200, paddingLeft: 40 }}
                  width={8}
                >
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Dil Adı</b>
                      </label>
                    </div>
                    <div style={{ paddingTop: 15 }}>
                      <Form.Input
                        fluid
                        placeholder="Şirket Adı"
                        type="text"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.companyName &&
                        formik.touched.companyName && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.companyName}
                          </div>
                        )}
                    </div>
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

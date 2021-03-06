import React, { useEffect, useState } from "react";
import LanguageService from "../../services/languageService";
import { useParams } from "react-router-dom";
import { Card, Table, Button, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UpdateLanguage() {
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

  const levels = [1, 2, 3, 4, 5];
  const levelOption = levels.map((languageLevel) => ({
    key: languageLevel,
    text: languageLevel,
    value: languageLevel,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleDeleteLanguage = (languageId) => {
    languageService
      .deleteLanguage(languageId)
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
  };

  return (
    <div>
      <Card fluid color={"black"} style={{paddingTop:10}}>
        <Card.Content header="Bilinen Diller" />
        <Table textAlign="center" celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil</Table.HeaderCell>
              <Table.HeaderCell>Seviye</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.languageName}</Table.Cell>
                <Table.Cell>{language.languageLevel}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    icon="x"
                    circular
                    onClick={() => handleDeleteLanguage(language.id)}
                  ></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Grid>
        <Grid.Row/>
        <Grid.Row/>
      </Grid>

      <Card fluid color={"black"} style={{paddingTop:10}}>
        <Card.Content header="Dil Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={8}>
                <label>
                  <b>Dil Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Dil Adı"
                  type="text"
                  name="languageName"
                  value={formik.values.languageName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.errors.name && formik.touched.name && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.name}
                  </div>
                )} */}
              </Grid.Column>
              <Grid.Column width={8}>
                <label>
                  <b>Seviye</b>
                </label>
                <Dropdown
                  clearable
                  item
                  placeholder="Seviye"
                  search
                  selection
                  fluid
                  options={levelOption}
                  onChange={(event, data) => {
                    handleChangeSemantic(data.value, "languageLevel");
                  }}
                  value={formik.values.languageLevel}
                  onBlur={formik.handleBlur}
                  name="languageLevel"
                />
                {/* {formik.errors.level && formik.touched.level && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.level}
                  </div>
                )} */}
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
    </div>
  );
}

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Card, Table, Button, Form, Grid, Icon } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ProgramLanguageService from "../../services/programLanguageService";

export default function UpdateProgramLanguage() {
    let { id } = useParams();
    let [technologies, setTechnologies] = useState([]);

    let technologyService = new ProgramLanguageService();
    useEffect(() => {
      let technologyService = new ProgramLanguageService();
      technologyService.getByCvId(id).then((result) => {
        setTechnologies(result.data.data);
      });
    },[id]);
  
    let technologyAddSchema = Yup.object().shape({
        programLanguage: Yup.string()
        .required("Bu alan zorunludur")
    });
  
    const formik = useFormik({
      initialValues: {
        programLanguage: "",
      },
      validationSchema: technologyAddSchema,
      onSubmit: (values) => {
        values.cvId = id;
        technologyService
          .addProgramLanguage(values)
          .then((result) => {
            toast.success(result.data.message)
            technologyService.getByCvId(id).then((result) => {
              setTechnologies(result.data.data)
            })
           // updateCvValues();
          })
          .catch((result) => {
            toast.error(result.response.data.message)
          });
      },
    });
  
    // const handleDeleteTechnology = (technologyId) => {
    //     technologyService.deleteSchool(technologyId).then((result) => {
    //         toast.success(result.data.message)
    //         technologyService.getByCvId(cvId).then((result) => {
    //           setTechnologies(result.data.data)
    //         })
    //         updateCvValues();
    //     }).catch((result) => {
    //         toast.error(result.response.data.message)
    //     })
    // }
  
    return (
      <div>
        <Grid stackable>
          <Grid.Column >
            <Card fluid color={"black"}>
              <Card.Content header={"Teknoloji Ekle"} />
              <Card.Content>
                <Form onSubmit={formik.handleSubmit}>
                <div style={{ paddingTop: 15, paddingBottom: 8 }}>
                    <label>
                      <b>Teknoloji Dili</b>
                    </label>
                  </div>
                  <Form.Input
                    style={{ paddingLeft: 250 }}
                    width="12"
                    placeholder="Teknoloji Adı"
                    type="text"
                    name="programLanguage"
                    value={formik.values.programLanguage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  
                  <div style={{ paddingTop: 40, paddingLeft: 600 }}>
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
                  type="submit"
                >
                  <Button.Content visible>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        fontFamily: "monospace",
                      }}
                    >
                      Ekle
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
          </Grid.Column>
        </Grid>
      </div>
      );
}

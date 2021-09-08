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

export default function JobPostingProgramLanguage() {
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

    return (
        <div>
            <div style={{paddingLeft:200,paddingTop:50,paddingRight:200,}}>
        <Card fluid>
        
          <Card.Content ><Card.Content style={{fontWeight:"bold",fontSize:20,paddingTop:15,paddingBottom:20}} header={"Yetenek"} />
          <Form onSubmit={formik.handleSubmit}>
              <Grid style={{ paddingLeft:170 }}>
                <Grid.Column style={{paddingLeft:210}} width={9}>
                  <div>
                    <div
                      style={{
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <label>
                        <b>Teknoloji Adı</b>
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
    )
}

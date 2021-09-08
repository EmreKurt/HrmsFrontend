import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import {
  Button,
  Dropdown,
  Input,
  TextArea,
  Card,
  Form,
  Grid,
  Icon,
} from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import WorkTypeService from "../../services/workTypeService";
import CityService from "../../services/cityService";
import JobPositionService from "../../services/jobPositionService";
import EmployerService from "../../services/employerService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import WorkTimeService from "../../services/workTimeService";
import swal from "sweetalert";
import UpdateImage from "../CvUpdate/UpdateImage";

export default function AddJobAdvertisement() {

  
  const { authItem } = useSelector((state) => state.auth);

  let jobAdService = new AdvertisementService();
  const JobAdvertAddSchema = Yup.object().shape({
    applicationDeadline: Yup.date()
      .nullable()
      .required("Bu alanın doldurulması zorunludur"),
    jobDescription: Yup.string().required("Bu alanın doldurulması zorunludur"),
    positionId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workTimeId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workPlaceId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    openPosition: Yup.string()
      .required("Posizyon sayısı zorunludur")
      .min(1, "Posizyon sayısı 1 den küçük olamaz"),
    cityId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    minSalary: Yup.number()
      .min(0, "0 Dan az olamaz")
      .required("Bu alan zorunludur"),
    maxSalary: Yup.number()
      .min(0, "0 Dan az olamaz")
      .required("Bu alan zorunludur"),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      positionId: "",
      workTimeId: "",
      workPlaceId: "",
      openPosition: "",
      cityId: "",
      minSalary: "",
      maxSalary: "",
      applicationDeadline: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      values.employerId = authItem[0].user.id;
      jobAdService.add(values).then((result) => {
        // toast.success(result.data.message)
        if (result.data.success === true) {
          swal({
            title: "Başarılı!",
            text: "Sistem yöneticisi tarafından ilanınızın onaylanmasını bekleyiniz!",
            icon: "success",
            button: "Ok",
          }); //.then(function () {
          //   window.location.reload();
          // });
        } else {
          swal({
            title: "İşlem Başarısız!",
            text: result.data.message,
            icon: "error",
            button: "Ok",
          });
        }
      });

      history.push("/advertisements");
    },
  });

  const [workTimes, setWorkTimes] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workTimeService = new WorkTimeService();
    let workPlaceService = new WorkTypeService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workTimeService
      .getWorkTime()
      .then((result) => setWorkTimes(result.data.data));
    workPlaceService
      .getWorkType()
      .then((result) => setWorkPlaces(result.data.data));
    cityService.getCity().then((result) => setCities(result.data.data));
    jobPositionService
      .getJobPosition()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.workTime,
    value: workTime.id,
  }));
  const workPlaceOption = workPlaces.map((workPlace, index) => ({
    key: index,
    text: workPlace.workType,
    value: workPlace.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.name,
    value: jobPosition.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      {authItem[0].user.userType !== 2 && (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <p>
            Giriş yapmayı yada bir iş veren hesabı oluşturmayı deneyebilirsiniz
          </p>
        </div>
      )}
      {authItem[0].loggedIn && authItem[0].user.userType === 2 && (
        <Card fluid>
          <Card.Header
            style={{
              fontSize: "2em",
              marginBottom: "1em",
              marginTop: "1em",
              fontWeight: "bold",
            }}
          >
            İş ilanı Ekle
          </Card.Header>
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <div style={{ marginTop: "1em" }}>
                <Form.Field style={{ marginBottom: "1rem" }}>
                  <label
                    style={
                      ({ fontWeight: "bold" },
                      { fontSize: "1em" },
                      { fontFamily: "cursive" })
                    }
                  >
                    İş Pozisyonu
                  </label>
                  <Dropdown
                    clearable
                    item
                    placeholder="İş pozisyonu"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "positionId")
                    }
                    onBlur={formik.onBlur}
                    id="positionId"
                    value={formik.values.positionId}
                    options={jobPositionOption}
                  />
                  {formik.errors.positionId && formik.touched.positionId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.positionId}
                    </div>
                  )}
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <label
                    style={
                      ({ fontWeight: "bold" },
                      { fontSize: "1em" },
                      { fontFamily: "cursive" })
                    }
                  >
                    Şehir
                  </label>
                  <Dropdown
                    clearable
                    item
                    placeholder="Şehir"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "cityId")
                    }
                    onBlur={formik.onBlur}
                    id="cityId"
                    value={formik.values.cityId}
                    options={cityOption}
                  />
                  {formik.errors.cityId && formik.touched.cityId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.cityId}
                    </div>
                  )}
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <label
                    style={
                      ({ fontWeight: "bold" },
                      { fontSize: "1em" },
                      { fontFamily: "cursive" })
                    }
                  >
                    Çalışma yeri
                  </label>
                  <Dropdown
                    clearable
                    item
                    placeholder="Çalışma yeri"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "workPlaceId")
                    }
                    onBlur={formik.onBlur}
                    id="workTypeId"
                    value={formik.values.workPlaceId}
                    options={workPlaceOption}
                  />
                  {formik.errors.workPlaceId && formik.touched.workPlaceId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.workPlaceId}
                    </div>
                  )}
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <Grid stackable>
                    <Grid.Column width={16}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Çalışma Süresi
                      </label>
                      <div></div>
                      <Dropdown
                        fluid
                        clearable
                        item
                        placeholder="Çalışma Süresi"
                        search
                        selection
                        onChange={(event, data) =>
                          handleChangeSemantic(data.value, "workTimeId")
                        }
                        onBlur={formik.onBlur}
                        id="workTimeId"
                        value={formik.values.workTimeId}
                        options={workTimeOption}
                      />
                      {formik.errors.workTimeId &&
                        formik.touched.workTimeId && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.workTimeId}
                          </div>
                        )}
                    </Grid.Column>{" "}
                    {/* <Grid.Column width={8}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Firma Resmi
                      </label>
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Firma resimi"
                        value={formik.values.maxSalary}
                        name="maxSalary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        icon="add"
                      ></Input>
                      {formik.errors.maxSalary && formik.touched.maxSalary && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.maxSalary}
                        </div>
                      )}
                    </Grid.Column> */}
                  </Grid>
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <Grid stackable>
                    <Grid.Column width={8}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Maaş aralığı minimum
                      </label>
                      <Input
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Maaş aralığı minimum"
                        value={formik.values.minSalary}
                        name="minSalary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Input>
                      {formik.errors.minSalary && formik.touched.minSalary && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.minSalary}
                        </div>
                      )}
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Maaş aralığı maksimum
                      </label>
                      <Input
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Maaş aralığı maksimum"
                        value={formik.values.maxSalary}
                        name="maxSalary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Input>
                      {formik.errors.maxSalary && formik.touched.maxSalary && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.maxSalary}
                        </div>
                      )}
                    </Grid.Column>
                  </Grid>
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <Grid stackable>
                    <Grid.Column width={8}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Açık pozisyon sayısı
                      </label>
                      <Input
                        style={{ width: "100%" }}
                        id="openPosition"
                        name="openPosition"
                        error={Boolean(formik.errors.openPosition)}
                        onChange={formik.handleChange}
                        value={formik.values.openPosition}
                        onBlur={formik.handleBlur}
                        type="number"
                        placeholder="Açık Posisyon sayısı"
                      />
                      {formik.errors.openPosition &&
                        formik.touched.openPosition && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.openPosition}
                          </div>
                        )}
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <label
                        style={
                          ({ fontWeight: "bold" },
                          { fontSize: "1em" },
                          { fontFamily: "cursive" })
                        }
                      >
                        Son başvuru tarihi
                      </label>
                      <Input
                        style={{ width: "100%" }}
                        type="date"
                        error={Boolean(formik.errors.applicationDeadline)}
                        onChange={(event, data) =>
                          handleChangeSemantic(
                            data.value,
                            "applicationDeadline"
                          )
                        }
                        value={formik.values.applicationDeadline}
                        onBlur={formik.handleBlur}
                        name="applicationDeadline"
                        placeholder="Son başvuru tarihi"
                      />
                      {formik.errors.applicationDeadline &&
                        formik.touched.applicationDeadline && (
                          <div className={"ui pointing red basic label"}>
                            {formik.errors.applicationDeadline}
                          </div>
                        )}
                    </Grid.Column>
                  </Grid>
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Form.Field>
                  <label
                    style={
                      ({ fontWeight: "bold" },
                      { fontSize: "1em" },
                      { fontFamily: "cursive" })
                    }
                  >
                    Açıklama
                  </label>
                  <TextArea
                    placeholder="Açıklama"
                    style={{ minHeight: 100 }}
                    error={Boolean(formik.errors.jobDescription).toString()}
                    value={formik.values.jobDescription}
                    name="jobDescription"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.jobDescription &&
                    formik.touched.jobDescription && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.jobDescription}
                      </div>
                    )}
                </Form.Field>
              </div>

              <div style={{ marginTop: "2em" }}>
                <Button
                  fluid
                  color="facebook"
                  content="İlanı Ekle"
                  type="submit"
                  size="large"
                />
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}

import { clear } from "dom-helpers";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Grid,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import CityService from "../../services/cityService";
import JobPositionService from "../../services/jobPositionService";
import WorkTimeService from "../../services/workTimeService";
import WorkTypeService from "../../services/workTypeService";

export default function JobAdFilter({ clickEvent }) {
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCity().then((result) => setCities(result.data.data));

    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPosition()
      .then((result) => setJobPositions(result.data.data));

    let workTypeService = new WorkTypeService();
    workTypeService
      .getWorkType()
      .then((result) => setWorkPlaces(result.data.data));

    let workTimeService = new WorkTimeService();
    workTimeService
      .getWorkTime()
      .then((result) => setWorkTimes(result.data.data));
  }, []);

  const reset = () => {
      //setCurrentPage(1)
      setCityIndex(0)
      //jobPositionIndex.checked=false
      //setJobPositionIndex(0)
      //workTimeIndex(0)
      //workPlaceIndex(0)
      //console.log(data.data.data)
  }

  const [cityIndex, setCityIndex] = useState([]);
  const handleChangeCity = (e, { value }) => {
    setCityIndex(value);
  };

  const [jobPositionIndex] = useState([]);
  const handleChangeJobPosition = (e, { value, checked }) => {
   
    if (checked) {
      jobPositionIndex.push(value);
    } else {
      let index = jobPositionIndex.indexOf(value);
      if (index > -1) {
        jobPositionIndex.splice(index, 1);
      }
    }
  };

  const [workPlaceIndex] = useState([]);
  const handleChangeWorkPlace = (e, { value, checked }) => {
    if (checked) {
      workPlaceIndex.push(value);
    } else {
      let index = workPlaceIndex.indexOf(value);
      if (index > -1) {
        workPlaceIndex.splice(index, 1);
      }
    }
  };

  const [workTimeIndex] = useState([]);
  const handleChangeWorkTime = (e, { value, checked }) => {
    if (checked) {
      workTimeIndex.push(value);
    } else {
      let index = workTimeIndex.indexOf(value);
      if (index > -1) {
        workTimeIndex.splice(index, 1);
      }
    }
  };

  return (
    <div>
      <Card itemsPerRow={2}>
        <Segment>
          <div style={{paddingTop:20}}>
          <Segment color="black" raised>
            <Label attached="top" size="large">
              Şehir
            </Label>
            <Dropdown
            fluid
              placeholder="Şehir seçiniz"
              selection
              search
              multiple
              clearable
              options={cities.map((city, index) => {
                return { text: city.name, key: city.index, value: city.id };
              })}
              onChange={handleChangeCity}
              value={cityIndex}
            />
          </Segment>
          </div>
          <div style={{paddingTop:30}}>
          <Segment color="black" raised>
            <Label attached="top" size="large">
              İş Pozisyonu
            </Label>

            {jobPositions.map((position) => (
              <div className="leo">
                <Checkbox
                  key={position.id}
                  label={position.name}
                  onChange={handleChangeJobPosition}
                  value={position.id}
                />
              </div>
            ))}
          </Segment>
          </div>
          <div style={{paddingTop:30}}>
          <Segment color="black" raised>
            <Label attached="top" size="large">
              Çalışma Yeri
            </Label>
            {workPlaces.map((workType) => (
              <div className="leo">
                <Checkbox
                  key={workType.id}
                  label={workType.workType}
                  onChange={handleChangeWorkPlace}
                  value={workType.id}
                />
              </div>
            ))}
          </Segment>
          </div>
          <div style={{paddingTop:30}}>
          <Segment color="black" raised>
            <Label attached="top" size="large">
              Çalışma Süresi
            </Label>
            {workTimes.map((workTime) => (
              <Checkbox
                key={workTime.id}
                label={workTime.workTime}
                onChange={handleChangeWorkTime}
                value={workTime.id}
              />
            ))}
          </Segment>
          </div>
          <div style={{paddingTop:30,}}>
          <Button
          style={{backgroundColor:"#bf02d1",color:"white",boxShadow:"2px 2px 8px #000"}}
            type="button"
            fluid
           // color="#c008d1"
            onClick={() =>
              clickEvent({
                cityId: cityIndex,
                positionId: jobPositionIndex,
                workTypeId: workPlaceIndex,
                workTimeId: workTimeIndex,
              })
            }
          >
            Filtrele
          </Button>
          <div style={{paddingTop:15}}>
          <Button style={{color:"white",backgroundColor:"#b2b2b2",boxShadow:"2px 2px 8px #000"}} fluid type="button" 
          onClick={() => reset()}>
            Reset
          </Button>
          </div>
          </div>
        </Segment>
      </Card>
    </div>
  );
}

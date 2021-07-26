import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import CvService from "../../services/cvService";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

export default function CvList() {
  const [cvs, setCv] = useState([]);
  const colors = ["yellow"];

  useEffect(() => {
    let cvService = new CvService();
    cvService.getCv().then((result) => setCv(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group itemsPerRow={2}>
        {cvs?.map((cv) => (
          <Card style={{ borderRadius: "25px" }} onClick="25px" >
            <Card.Content textAlign="left">
            <div className="ac">
              <Card.Header textAlign="center" key={cv.id}>
                {cv.jobseeker.firstName}
              </Card.Header>
            </div>
            <div className="as">
            <h5>
              Okul Adı :<span> {cv.school.schoolName}</span>
            </h5>
            </div>
            <h5>
              Yabancı Dil :<span> {cv.language.languageName}</span>
            </h5>

            <h5>
              İş Yeri Adı :<span> {cv.jobExperience.workPlaceName}</span>
            </h5>

            <h5>
              Ön Söz :<span> {cv.coverLatter}</span>
            </h5>
           
            </Card.Content>
            <Button
              size="small"
              color="twitter"
              as={Link}
              to={`/cv/${cv.jobseeker.id}`}
            >
              Detay
            </Button>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

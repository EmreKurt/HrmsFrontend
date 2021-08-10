import React, { useEffect, useState } from "react";
import EmployerService from "../../services/employerService";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Employer() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployer()
      .then((result) => setEmployers(result.data.data));
  }, []);
  return (
    <div>
      <Card.Group>
        {employers.map((employer) => (
          <Card fluid key={employer.id} color={"black"}>
            <Card.Content>
              <Card.Header>{employer.companyName}</Card.Header>
              <Card.Meta>{employer.webSite}</Card.Meta>
              <Card.Description>
                <p>
                  <b>Eposta: </b>
                  {employer.email}
                </p>
                <p>
                  <b>Telefon: </b>
                  {employer.phoneNumber}
                </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" as={Link} to={`/employers/${employer.id}`}>
                  Detaylar
                </Button>
                
                <Button basic color="blue">
                  <a href={employer.webSite} target={"_blank"} rel="noopener noreferrer">Web Sitesi</a>                  
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

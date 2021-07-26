import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import JobSeekerService from "../services/jobSeekerService";

export default function JobSeekerList() {
  const [jobSeekers, setJobSeeker] = useState([]);
  const colors = ["red"];

  useEffect(() => {
    let jobSeekers = new JobSeekerService();
    jobSeekers.getJobSeeker().then((result) => setJobSeeker(result.data.data));
  });

  return (
    <div>
      {colors.map((color) => (
        <Table celled color={color} style={{ borderRadius: "25px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">İsim</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Soyİsim</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Kimlik No</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Doğum Tarihi
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">CV</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {jobSeekers.map((jobSeeker) => (
              <Table.Row key={jobSeeker.id}>
                <Table.Cell textAlign="center">
                  {jobSeeker.firstName}
                </Table.Cell>
                <Table.Cell textAlign="center">{jobSeeker.lastName}</Table.Cell>
                <Table.Cell textAlign="center">{jobSeeker.email}</Table.Cell>
                <Table.Cell textAlign="center">
                  {jobSeeker.nationalityId}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {jobSeeker.birthDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button as={Link} to={`/cv/${jobSeeker.id}`}
                    color="olive"
                    content="CV"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ))}
    </div>
  );
}

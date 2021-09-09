import CvDetail from "../pages/CV/CvDetail";
import React from "react";
import CvList from "../pages/CV/CvList";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Grid } from "semantic-ui-react";
import Home from "../pages/Home";
import JobAdvertisementList from "../pages/Job/JobAdvertisementList";
import JobAdvertisementDetail from "../pages/Job/JobAdvertisementDetail";
import JobPostingApplication from "../pages/Job/JobPostingApplication";
import JobPostingSchools from "../pages/JobCv/JobPostingSchools";
import JobPostingExperience from "../pages/JobCv/JobPostingExperience";
import JobPostingLanguage from "../pages/JobCv/JobPostingLanguage";
import JobPostingProgramLanguage from "../pages/JobCv/JobPostingProgramLanguage";
import JobPostingBiography from "../pages/JobCv/JobPostingBiography";
import JobPostingContactİnformation from "../pages/JobCv/JobPostingContactİnformation";
import JobSeekerList from "../pages/JobSeekerList";
import LoginList from "../pages/LoginList";
import HomePageWithTranslation from "../pages/HomePage";

export default function Board() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
          <Route exact path="/" component={HomePageWithTranslation}/> 
            <Route exact path="/cv" component={CvList} />
            <Route exact path="/cv/:id" component={CvDetail} />
            <Route exact path="/cvs" component={CvList} />
             <Route exact path="/cvs/:id" component={JobPostingApplication} /> 
            <Route exact path="/advertisements" component={JobAdvertisementList}/>
            <Route exact path="/advertisements/:id" component={JobAdvertisementDetail}/>
            {/* <Route exact path="/jobSeeker" component={JobSeekerList}/> */}
            <Route exact path="/jobPostingApplications" component={JobPostingApplication}/>
            <Route exact path="/jobPostingSchools" component={JobPostingSchools}/>
            <Route exact path="/jobPostingExperiences" component={JobPostingExperience}/>
            <Route exact path="/jobPostingLanguage" component={JobPostingLanguage}/>
            <Route exact path="/jobPostingProgramLanguage" component={JobPostingProgramLanguage}/>
            <Route exact path="/jobPostingBiography" component={JobPostingBiography}/>
            <Route exact path="/jobPostingContactİnformation" component={JobPostingContactİnformation}/>
            <Route exact path="/login" component={LoginList}/>
            <Route exact path="/home" component={Home}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

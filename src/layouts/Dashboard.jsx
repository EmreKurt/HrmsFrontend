import React from "react";
import Categories from "./Categories";
import { Grid } from "semantic-ui-react";
import JobAdvertisementList from "../pages/Job/JobAdvertisementList";
import CvList from "../pages/CV/CvList";
import { Route } from "react-router-dom";
import JobAdvertisementDetail from "../pages/Job/JobAdvertisementDetail";
import LoginList from "../pages/LoginList";
import RecortList from "../pages/RecortList";
import HomePage from "../pages/HomePage";
import JobSeekerList from "../pages/JobSeekerList";
import AddJobAdvertisement from "../pages/Job/AddJobAdvertisement";
import ConfirmJobAdvertisement from "../pages/Job/ConfirmJobAdvertisement";
import CvDetail from "../pages/CV/CvDetail";
import { ToastContainer } from "react-toastify";
import RegisterEmployer from "../pages/RegisterEmployer";
import UpdateBiography from "../pages/CvUpdate/UpdateBiography";
import JobAdFavorites from "../pages/Job/JobAdFavorites";
import Employer from "../pages/Employer/Employer";
import EmployerDetail from "../pages/Employer/EmployerDetail";
import EmployerUpdate from "../pages/Employer/EmployerUpdate";
import EmployerUpdateConfirm from "../pages/Employer/EmployerUpdateConfirm";

export default function Dashboard() {



  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/advertisements" component={JobAdvertisementList}/>
            <Route exact path="/advertisements/:id" component={JobAdvertisementDetail}/>
            <Route exact path="/login" component={LoginList}/>
            <Route exact path="/recort" component={RecortList}/>
            <Route exact path="/jobSeeker" component={JobSeekerList}/>     
            <Route exact path="/addJobAdvertisement" component={AddJobAdvertisement}/>
            <Route exact path ="/confirmAdvert" component={ConfirmJobAdvertisement}/>  
            <Route exact path ="/registerEmployer" component={RegisterEmployer}/>
            <Route exact path ="/updateBiography" component={UpdateBiography}/>
            <Route exact path ="/jobAdFavorites" component={JobAdFavorites}/>
            <Route exact path ="/employers" component={Employer}/>
            <Route exact path ="/employers/:id" component={EmployerDetail}/>
            <Route exact path ="/employer" component={Employer}/>
            <Route  exact path="/employer/:id" component={EmployerUpdate}/>
            <Route  exact path="/employerUpdateConfirm" component={EmployerUpdateConfirm}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

import React from "react";
import Categories from "./Categories";
import { Container, Grid } from "semantic-ui-react";
import JobAdvertisementList from "../pages/Job/JobAdvertisementList";
import CvList from "../pages/CV/CvList";
import { Route } from "react-router-dom";
import JobAdvertisementDetail from "../pages/Job/JobAdvertisementDetail";

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
import UpdateSchools from "../pages/CvUpdate/UpdateSchools";
import UpdateExperiance from "../pages/CvUpdate/UpdateExperiance";
import UpdateProgramLanguage from "../pages/CvUpdate/UpdateProgramLanguage";
import UpdateLanguage from "../pages/CvUpdate/UpdateLanguage";
import UpdateContactİnformation from "../pages/CvUpdate/UpdateContactİnformation";
import Home from "../pages/Home";
import JobPostingApplication from "../pages/Job/JobPostingApplication";

export default function Dashboard() {



  return (
    <div>
      
      <ToastContainer position="bottom-right"/>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
             
            
             <Container>
            <Route exact path="/recort" component={RecortList}/>   
            <Route exact path="/addJobAdvertisement" component={AddJobAdvertisement}/>
            <Route exact path ="/confirmAdvert" component={ConfirmJobAdvertisement}/>  
            <Route exact path ="/registerEmployer" component={RegisterEmployer}/>
            <Route exact path ="/updateBiography" component={UpdateBiography}/>
            {/* <Route exact path ="/updateSchools" component={UpdateSchools}/> */}
            <Route exact path ="/jobAdFavorites" component={JobAdFavorites}/>
            <Route exact path ="/employers" component={Employer}/>
            <Route exact path ="/employers/:id" component={EmployerDetail}/>
            <Route exact path ="/employer" component={Employer}/>
            <Route  exact path="/employer/:id" component={EmployerUpdate}/>
            <Route  exact path="/employerUpdateConfirm" component={EmployerUpdateConfirm}/>
            {/* <Route exact path="/cvs" component={CvList} />
             <Route exact path="/cvs/:id" component={JobPostingApplication} />  */}
            <Route exact path="/cvsSchools/:id" component={UpdateSchools} />
            <Route exact path="/cvsExperiences/:id" component={UpdateExperiance} />
            <Route exact path="/cvsProgramLanguages/:id" component={UpdateProgramLanguage} />
            <Route exact path="/cvsLanguages/:id" component={UpdateLanguage} />
            <Route exact path="/cvsContentİnformation/:id" component={UpdateContactİnformation} />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    </div>
  );
}

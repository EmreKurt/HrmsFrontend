import CvDetail from "../pages/CV/CvDetail";
import React from "react";
import CvList from "../pages/CV/CvList";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Grid } from "semantic-ui-react";

export default function Board() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Route exact path="/cv" component={CvList} />
            <Route exact path="/cv/:id" component={CvDetail} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

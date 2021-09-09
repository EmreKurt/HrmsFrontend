import "./App.css";
import Dashboard from "./layouts/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid } from "semantic-ui-react";
import Menu from "./layouts/Menu";
import Navi from "./layouts/Navi";
import Footer from "./layouts/Footer";
import Distance from "./layouts/Distance";
import Board from "./layouts/Board";

function App() {
  return (
    <div className="App">
      {/* <Navi /> */}
      <Board />
      <Dashboard />
    </div>
  );
}

export default App;

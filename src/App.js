import "./App.css";
import Dashboard from "./layouts/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Menu from "./layouts/Menu";
import Navi from "./layouts/Navi";
import Footer from "./layouts/Footer";
import Distance from "./layouts/Distance";


function App() {
  return (
    <div className="App">
      <Navi />
      <Menu />
      <Container className="main">
        <Dashboard />
      </Container>
      <Distance/>
      <Footer />
    </div>
  );
}

export default App;
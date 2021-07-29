import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Input, Menu, Segment } from "semantic-ui-react";

export default class MenuExamplePointing extends Component {
  
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing >
          <Container >
            <Link to={`/advertisements`}>
              <Menu.Item name="İş İlanları" onClick={this.handleItemClick} />
            </Link>

            <Link to={`/jobSeeker`}>
              <Menu.Item name="İş Arayanlar" onClick={this.handleItemClick} />
            </Link>

           
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
            </Menu.Menu>

            
          </Container>
        </Menu>
      </div>
    );
  }
}

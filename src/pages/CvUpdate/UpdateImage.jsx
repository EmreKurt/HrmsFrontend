import React, { Component } from "react";
import { toast } from "react-toastify";
import { Card, Button, Icon } from "semantic-ui-react";
import ImageService from "../../services/ImageService";

export default class UpdateImage extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append(
      "multipartFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    let imageService = new ImageService();
    imageService
      .upload(this.props.cvId, fd)
      .then((res) => {
        toast.success(res.data.message);
        this.props.updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  render() {
    return (
      <div>

          {/* <Card.Content header="Resim Yükle" /> */}
          <Card.Content style={{}}>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectedHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <Icon name="add"  onClick={() => this.fileInput.click()}></Icon>
            <Button color={"green"} onClick={this.fileUploadHandler} disabled={this.state.selectedFile==null} inverted >Yükle</Button>
          </Card.Content>

      </div>
    );
  }
}
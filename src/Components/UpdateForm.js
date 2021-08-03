import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export class UpdateForm extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={() => this.props.UpdateForm(this.props.index)}>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              defaultValue={this.props.selectedColor.title}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>img URL</Form.Label>
            <Form.Control
              name="imgUrl"
              type="text"
              defaultValue={this.props.selectedColor.imageUrl}
            />
          </Form.Group>
          {/*  */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {/*  */}
          <Button onClick={this.props.onHide} variant="primary">
            Hide
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateForm;

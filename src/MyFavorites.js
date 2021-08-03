import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyFavorites.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import UpdateForm from "./Components/UpdateForm";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favColors: [],
      showForm: false,
      index: 0,
      selectedColor: [],
    };
  }

  componentDidMount = async () => {
    const email = this.props.auth0.user.email;
    let response = await axios.get(
      `${process.env.REACT_APP_SERVER}/getfavs?email=${email}`
    );
    if (response !== "Empty") {
      this.setState({
        favColors: response.data,
      });
    } else {
      console.log("YOUR FAV LIST IS EMPTY");
    }
  };

  deleteFavColor = (index) => {
    const email = this.props.auth0.user.email;
    axios
      .delete(
        `${process.env.REACT_APP_SERVER}/deletecolor/${index}?email=${email}`
      )
      .then((response) => {
        this.setState({
          favColors: response.data,
        });
      })
      .catch((error) => {
        console.log("ERROR DELETING DATA LINE 41");
      });
  };

  showUpdateForm = (index) => {
    this.setState({
      showForm: true,
      index: index,
      selectedColor: this.state.favColors[index],
    });
  };

  hideUpdateForm = () => {
    this.setState({
      showForm: false,
    });
  };

  updateColor = (event) => {
    event.preventDefault();
    const newColor = {
      title: event.target.title.value,
      imageUrl: event.target.imageUrl.value,
      index: this.state.index,
      email: this.props.auth0.user.email,
    };
    axios
      .put((`${process.env.REACT_APP_SERVER}/updatecolor`, newColor))
      .then((response) => {
        this.setState({
          favColors: response.data,
        });
      })
      .catch((error) => {
        console.log("ERROR UPDATING DATA LINE 69", error);
      });
  };

  render() {
    console.log(this.state.favColors.length);
    const isAuthenticated = this.props.auth0.isAuthenticated;
    if (this.state.favColors.length != 0 || this.state.favColors.length != 5) {
      return (
        <>
          <h1>My Favorites</h1>
          <p>This is a collection of my favorites</p>
          {this.state.showForm && (
            <UpdateForm
              style={{ margin: "50px" }}
              onHide={this.hideUpdateForm}
              index={this.state.index}
              selectedColor={this.state.selectedColor}
              updateColor={this.updateColor}
            />
          )}
          {this.state.favColors.map((element, index) => {
            return (
              <div
                key={index}
                style={{ display: "inline-block", margin: "50px" }}
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={element.imageUrl} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    {isAuthenticated && (
                      <Button
                        onClick={() => this.deleteFavColor(index)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    )}
                    {isAuthenticated && (
                      <Button
                        onClick={() => this.showUpdateForm(index)}
                        variant="success"
                      >
                        Update
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </>
      );
    }else{
      return(
        <h4>YOUR FAV LIST IS EMPTY</h4>
      )
    }
  }
}

export default withAuth0(MyFavorites);

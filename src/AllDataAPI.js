import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class AllDataAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
    };
  }

  componentDidMount = () => {
    console.log("inside CDM");
    axios
      .get(`${process.env.REACT_APP_SERVER}/apidata`)
      .then((response) => {
        this.setState({
          apiData: response.data,
        });
      })
      .catch((error) => {
        console.log("ERROR GETTING DATA LINE 22", error);
      });
  };

  addToFav = (title) => {
    const email = this.props.auth0.user.email;
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/addtofav?email=${email}&title=${title}`
        // http://localhost:3004/addtofav?email=kztahat96@gmail.com&title=heart of gold
      )
      .then((response) => {
          console.log('added');
      }).catch(errro => {
          console.log('ERROR GETTING DATA LINE 38');
      })
  };

  render() {
    const isAuthenticated = this.props.auth0.isAuthenticated;
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>
        {this.state.apiData.map((element) => {
          return (
            <div style={{ display: "inline-block", margin: "50px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={element.imageUrl} />
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  {isAuthenticated && (
                    <Button
                      onClick={() => this.addToFav(element.title)}
                      variant="primary"
                    >
                      Add to Fav
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);

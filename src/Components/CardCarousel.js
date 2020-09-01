import React, { Component } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { fire } from "../fire";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBContainer
} from "mdbreact";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
let card = [];
let clickcard = [];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, visible: false };
  }

  componentDidMount() {
    var ref = fire
      .database()
      .ref("cards")
      .orderByValue();
    ref.on("value", getData, errData);
    function getData(data) {
      var carddata = data.val();
      //console.log(carddata);
      for (let c in carddata) {
        card.push({
          id: c,
          hotelimg: carddata[c].hotelimg,
          hotelname: carddata[c].hotelname,
          hotelsummary: carddata[c].hotelsummary,
          rating: carddata[c].rating,
          schedule: carddata[c].schedule,
          city: carddata[c].city,
          state: carddata[c].state,
          zip: carddata[c].zip
        });
      }
      console.log(card);
    }
    function errData(err) {
      console.log("error" + err);
    }
  }

  render() {
    const footer = (
      <div>
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => this.setState({ visible: false })}
        />
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => this.setState({ visible: false })}
          className="p-button-secondary"
        />
      </div>
    );
    return (
      <div className="carousel-demo">
        <div className="content-section implementation">
          <Button
            label="Proceed"
            className="p-button-raised p-button-rounded"
            onClick={() => this.setState({ flag: true })}
          />
          {this.state.flag ? (
            <div>
              <Carousel
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {card.map(c => {
                  return (
                    <div className="justify-content-center m-3">
                      <MDBContainer>
                        <MDBCard
                          style={{
                            height: "77vh",
                            width: "47vh"
                          }}
                        >
                          <MDBCardImage
                            src={
                              c.hotelimg ||
                              "https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
                            }
                            alt="MDBCard image cap"
                            top
                            hover
                            overlay="white-slight"
                          />
                          <MDBCardBody>
                            <MDBCardTitle tag="h5">
                              {c.hotelname || "Hotel Name title"}
                            </MDBCardTitle>
                            <MDBCardText>
                              {c.hotelsummary ||
                                "Something about hotel text to build on the hotel card and makeup the bulk of the card"}
                            </MDBCardText>
                            <h5>Rating{" " + c.rating}</h5>
                            <Rating value={c.rating} cancel={false} />
                            <Fieldset legend="SCHEDULE">
                              <p>
                                {c.schedule ||
                                  "OPENING TIME 07:00AM AND CLOSING TIME 08:00AM"}
                              </p>
                            </Fieldset>
                            <br />
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              label="View Details"
                              className="p-button-rounded p-button-info"
                              onClick={() => {
                                clickcard.push({
                                  id: c,
                                  hotelimg: c.hotelimg,
                                  hotelname: c.hotelname,
                                  hotelsummary: c.hotelsummary,
                                  rating: c.rating,
                                  schedule: c.schedule,
                                  city: c.city,
                                  state: c.state,
                                  zip: c.zip
                                });
                                this.setState({ visible: true });
                              }}
                            />
                          </MDBCardBody>
                        </MDBCard>
                      </MDBContainer>
                    </div>
                  );
                })}
              </Carousel>

              {/*Dialog*/}
              <div className="content-section implementation">
                <Dialog
                  header="Godfather I"
                  visible={this.state.visible}
                  style={{ width: "50vw" }}
                  footer={footer}
                  onHide={() => this.setState({ visible: false })}
                  maximizable
                >
                  The story begins as Don Vito Corleone, the head of a New York
                  Mafia family, oversees his daughter's wedding. His beloved son
                  Michael has just come home from the war, but does not intend
                  to become part of his father's business.
                  {clickcard.hotelimg}
                </Dialog>
              </div>
            </div>
          ) : (
            <div>{"nothing"}</div>
          )}
        </div>
      </div>
    );
  }
}

export default CardCarousel;

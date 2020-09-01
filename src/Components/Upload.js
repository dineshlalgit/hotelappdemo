import React, { Component } from "react";
import { Growl } from "primereact/growl";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Rating } from "primereact/rating";
import { Fieldset } from "primereact/fieldset";
import { storage, fire } from "../fire";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle
} from "mdbreact";
import SectionContainer from "../docomponents/sectionContainer";

export class FileUploadImage extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      url: "",
      progress: 0,
      hotelname: "",
      abouthotel: "",
      schedule: "",
      city: "",
      state: "",
      zip: "",
      rating: 0
    };
    this.onUpload = this.onUpload.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  changeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  onUpload(event) {
    console.log("upload");
    if (event.files[0]) {
      const image = event.files[0];
      this.setState(() => ({ image }));
      const upLoadTask = storage.ref(`images/${image.name}`).put(image);
      upLoadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log(error);
        },
        complete => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.setState(() => ({ url }));
              this.growl.show({
                severity: "info",
                summary: "Success",
                detail: "Image Uploaded Thank you"
              });
            });
        }
      );
    }
  }

  DeployCard = () => {
    var cardref = fire.database().ref("cards");
    const {
      url,
      hotelname,
      abouthotel,
      rating,
      schedule,
      city,
      state,
      zip
    } = this.state;
    cardref.push({
      hotelimg: url,
      hotelname: hotelname,
      hotelsummary: abouthotel,
      rating: rating,
      schedule: schedule,
      city: city,
      state: state,
      zip: zip
    });
    console.log(cardref);
  };

  render() {
    const { hotelname, abouthotel, schedule, city, state, zip } = this.state;

    return (
      <div className="justify-content-center m-3">
        <div className="content-section implementation">
          <MDBContainer>
            <SectionContainer header="REGISTRATION OF BREAD AND BREAKFAST FOR U HOTELS">
              <MDBContainer>
                <MDBCard
                  style={{
                    height: "77vh",
                    width: "47vh"
                  }}
                >
                  <MDBCardImage
                    src={
                      this.state.url ||
                      "https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
                    }
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                  />
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">
                      {hotelname || "Hotel Name title"}
                    </MDBCardTitle>
                    <MDBCardText>
                      {abouthotel ||
                        "Something about hotel text to build on the hotel card and makeup the bulk of the card"}
                    </MDBCardText>
                    <h5>Rating{" " + this.state.rating}</h5>
                    <Rating
                      value={this.state.rating}
                      cancel={false}
                      onChange={e => this.setState({ rating: e.value })}
                    />
                    <Fieldset legend="SCHEDULE">
                      <p>
                        {schedule ||
                          "OPENING TIME 07:00AM AND CLOSING TIME 08:00AM"}
                      </p>
                    </Fieldset>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
              <br />
              &nbsp;&nbsp;&nbsp;
              <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate
              >
                <MDBRow>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-text"
                    >
                      Hotel Name
                    </label>
                    <input
                      value={hotelname}
                      name="hotelname"
                      onChange={e => {
                        this.setState({ hotelname: e.target.value });
                      }}
                      type="text"
                      id="defaultFormRegisterNameEx"
                      className="form-control"
                      placeholder="Name of Hotel BNB Service"
                      required
                    />
                    <div className="valid-feedback">{hotelname}</div>
                  </MDBCol>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterEmailEx2"
                      className="grey-text"
                    >
                      About Hotel
                    </label>
                    <input
                      value={abouthotel}
                      name="abouthotel"
                      onChange={e =>
                        this.setState({ abouthotel: e.target.value })
                      }
                      type="text"
                      id="defaultFormRegisterEmailEx2"
                      className="form-control"
                      placeholder="Something about Hotel"
                      required
                    />
                    <div className="valid-feedback">{abouthotel}</div>
                  </MDBCol>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterConfirmEx3"
                      className="grey-text"
                    >
                      Schedule
                    </label>
                    <input
                      value={schedule}
                      onChange={e =>
                        this.setState({ schedule: e.target.value })
                      }
                      type="text"
                      id="defaultFormRegisterConfirmEx3"
                      className="form-control"
                      name="schedule"
                      placeholder="Opening Time / Closing Time"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterPasswordEx4"
                      className="grey-text"
                    >
                      City
                    </label>
                    <input
                      value={city}
                      onChange={e => this.setState({ city: e.target.value })}
                      type="text"
                      id="defaultFormRegisterPasswordEx4"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid city.
                    </div>
                    <div className="valid-feedback">{city}</div>
                  </MDBCol>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterPasswordEx4"
                      className="grey-text"
                    >
                      State
                    </label>
                    <input
                      value={state}
                      onChange={e => this.setState({ state: e.target.value })}
                      type="text"
                      id="defaultFormRegisterPasswordEx4"
                      className="form-control"
                      name="state"
                      placeholder="State"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                    <div className="valid-feedback">{state}</div>
                  </MDBCol>
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterPasswordEx4"
                      className="grey-text"
                    >
                      Zip
                    </label>
                    <input
                      value={zip}
                      onChange={e => this.setState({ zip: e.target.value })}
                      type="text"
                      id="defaultFormRegisterPasswordEx4"
                      className="form-control"
                      name="zip"
                      placeholder="Zip"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid zip.
                    </div>
                    <div className="valid-feedback">{zip}</div>
                  </MDBCol>
                </MDBRow>

                {/*image upload code*/}
                <h3>Images</h3>
                <FileUpload
                  name="demo[]"
                  url={this.state.url}
                  customUpload={true}
                  uploadHandler={this.onUpload}
                  multiple={true}
                  accept="image/*"
                  maxFileSize={100000000}
                />
                <Growl
                  ref={el => {
                    this.growl = el;
                  }}
                ></Growl>
                <br />
                <ProgressBar value={this.state.progress}></ProgressBar>
                <br />
                <MDBBtn color="unique" type="submit" onClick={this.DeployCard}>
                  Deploy Card
                </MDBBtn>
              </form>
            </SectionContainer>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default FileUploadImage;

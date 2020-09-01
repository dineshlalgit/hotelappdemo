import React, { Component } from "react";
import Nav from "./Components/nav";
import Upload from "./Components/Upload";
import CardCarousel from "./Components/CardCarousel";
import ModelEx from "./Components/ModalExamplesPage";
import ModelForm from "./Components/ModalFormPage";
import ModalPage from "./Components/ModalPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
      speeds: [],
      loading: true,
    };
  }

  render() {
    
    return (
      <div className="App">
        <Nav />
        <CardCarousel />
        <Upload />
        <ModelForm />
        <ModelEx />
        <ModalPage />

        {/* <CarouselPage />
        <Animation />
        <Media />
        <Spinner />
        <Card />
        <Footer />
        */}
      </div>
    );
  }
}
export default App;

import img1 from "../../components/Images/Pyramids.jpg";
import img2 from "../../components/Images/egypt.jpg";
import img3 from "../../components/Images/flag.jpg";
import { Grid, Button } from "@material-ui/core";

import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer
} from "mdbreact";

const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls
        showIndicators
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img className="d-block w-100" src={img1} alt="First slide" />
              <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Start your business now</h3>
              <Button variant="outlined" color="inherit">
                See offers
              </Button>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img className="d-block w-100" src={img2} alt="Second slide" />
              <MDBMask overlay="black-strong" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Strong mask</h3>
              <p>Second text</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img className="d-block w-100" src={img3} alt="Third slide" />
              <MDBMask overlay="black-slight" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Slight Mast</h3>
              <p>Third text</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default CarouselPage;
